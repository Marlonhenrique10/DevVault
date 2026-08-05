import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    async signIn(email: string, password: string) {
        return {
            message: "User signed in successfully",
        }
    }
}