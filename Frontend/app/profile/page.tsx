
import { auth } from "@/auth";
import LoginHandler from "../components/LoginHandler";
import UserProfile from "../components/UserProfile";


export default async function ProfilePage() {

    const session = await auth();

    if (session) {

        return (
            <UserProfile/>
        );
    }

    return (
        <LoginHandler />
    );
}





