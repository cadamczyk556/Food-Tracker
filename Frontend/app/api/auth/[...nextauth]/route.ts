// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth"; // Adjust the path to wherever your auth.ts is

export const { GET, POST } = handlers;