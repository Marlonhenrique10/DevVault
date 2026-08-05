import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    async register(body: any) {
        console.log(body);
        return 'register';
    }

    async login(body: any) {
        console.log(body);
        return 'login';
    }
}