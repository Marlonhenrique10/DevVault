import { Controller, Body, Post, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    async signIn(@Body() body: { email: string, password: string }): Promise<{ message: string }> {
        return this.authService.signIn(body.email, body.password);
    }
}