import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/profile", // Tells Auth.js not to use its default error pages
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Send the login request to Python
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        // 2. IF PYTHON REJECTS IT (User doesn't exist, wrong password, etc.)
        if (!res.ok) {
          // Returning null cleanly tells Auth.js "Login failed" without crashing Next.js
          return null; 
        }

        // 3. IF PYTHON APPROVES IT
        const user = await res.json();
        return user;
      },
    }),
  ],
});