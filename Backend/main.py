from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import sqlite3
import bcrypt
import psycopg2
from psycopg2.extras import RealDictCursor
import os

load_dotenv()  # Load environment variables from .env file

app = FastAPI()
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "hammer-2-processed.sqlite")

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn


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
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (user_data.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_pwd = hash_password(user_data.password)
    cursor.execute(
        "INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id",
        (user_data.email, hashed_pwd)
    )
    new_user_id = cursor.fetchone()["id"]

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "User created successfully", "id": new_user_id}
    


@app.post("/api/login")
def login_user(credentials: UserAuthSchema):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (credentials.email,))
    user = cursor.fetchone()
    cursor.close()
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
    cursor = conn.cursor()
    
    # 1. The PostgreSQL Command
    sql_command = """
        WITH latest_prices AS (
            SELECT DISTINCT ON (product.id)
                product.id, 
                product.vendor, 
                product.product_name AS name, 
                product.detail_url AS img, 
                raw.current_price AS price,
                raw.price_per_unit,
                raw.nowtime AS last_updated
            FROM product
            JOIN raw ON product.id = raw.product_id
            WHERE product.product_name ILIKE %s
            ORDER BY product.id, raw.nowtime DESC
        )
        SELECT * FROM latest_prices
        ORDER BY 
            CASE 
                WHEN price IS NULL 
                  OR price = '' 
                  OR price = 'N/A' 
                  OR price = '0' 
                  OR price !~ '^[0-9]+(\.[0-9]+)?$' 
                THEN 1
                ELSE 0
            END ASC,
            CASE 
                WHEN price ~ '^[0-9]+(\.[0-9]+)?$' THEN CAST(price AS REAL)
                ELSE NULL
            END ASC
        LIMIT 30;
    """
    
    # 2. The Wildcards
    search_term = f"%{query}%"
    
    # 3. Execute the search using cursor.execute (conn.execute doesn't exist in psycopg2)
    cursor.execute(sql_command, (search_term,))
    results = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    # 4. RealDictCursor already formats rows as dicts, or [dict(row) for row in results] works too
    return [dict(row) for row in results]
