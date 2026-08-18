from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import bcrypt
import sqlite3
import os



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "hammer-2-processed.sqlite")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    # This magic line makes sure we get dictionaries back instead of weird tuples
    conn.row_factory = sqlite3.Row 
    return conn

AUTH_DB_PATH = os.path.join(BASE_DIR, "database", "users.sqlite")

def get_auth_db():
    conn = sqlite3.connect(AUTH_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_auth_db():
    conn = get_auth_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_auth_db()

class UserAuthSchema(BaseModel):
    email: EmailStr
    password: str

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)

    return hashed_password.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')

    return bcrypt.checkpw(password_bytes, hashed_bytes)

@app.post("/api/register")
def register_user(user_data: UserAuthSchema):
    conn = get_auth_db()

    cursor = conn.execute("SELECT * FROM users WHERE email = ?", (user_data.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_pwd = hash_password(user_data.password)
    conn.execute(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)", 
        (user_data.email, hashed_pwd)
    )
    conn.commit()
    new_user_id = cursor.lastrowid
    conn.close()

    return {"message": "User created successfully", "id": new_user_id}
    


@app.post("/api/login")
def login_user(credentials: UserAuthSchema):
    conn = get_auth_db()

    cursor= conn.execute("SELECT * FROM users WHERE email = ?", (credentials.email,))
    user = cursor.fetchone()
    conn.close()

    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {
        "id": str(user["id"]),
        "email": user["email"],
        "name": user["email"].split("@")[0]
    }



@app.get("/api/search")
def search_food(query: str):
    conn = get_db()
    
    # 1. The SQL Command
    # SELECT * means "get all columns"
    # WHERE name LIKE ? is how we search for text
    sql_command = """
       SELECT 
            product.id, 
            product.vendor, 
            product.product_name AS name, 
            product.detail_url AS img, 
            raw.current_price AS price,
            raw.price_per_unit,
            MAX(raw.nowtime) as last_updated
        FROM product
        JOIN raw ON product.id = raw.product_id
        WHERE product.product_name LIKE ?
        GROUP BY product.id 

        ORDER BY 
        
        CASE 
            WHEN raw.current_price IS NULL OR raw.current_price = '' OR raw.current_price = 'N/A' OR raw.current_price = 0 THEN 1
            ELSE 0
        END ASC,
        
        
        CAST(raw.current_price AS REAL) ASC
        
        LIMIT 30
    """
    
    # 2. The Wildcards
    # The % symbols mean "anything can come before or after"
    # So if query is "milk", it searches for "%milk%" and will find "2% Milk 1L"
    search_term = f"%{query}%"
    
    # 3. Execute the search
    # We pass the search_term in a tuple (search_term,) for security against hackers
    cursor = conn.execute(sql_command, (search_term,))
    results = cursor.fetchall()
    
    conn.close()
    
    # 4. Convert the results into a clean list of dictionaries for React
    return [dict(row) for row in results]
