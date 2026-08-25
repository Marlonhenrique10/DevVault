import { Controller, Body, Post, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Post('create-user')
    // async createUser(@Body() authUser: dto.CreateAuthUserDto) {
    //     return this.authService.createUser(authUser);
    // }

    @Get('/find-user-by-email')
    async findUserByEmail(@Body() body: { email: string }) {
        return this.authService.findUserByEmail(body.email);
    }

    @Get('/find-user-by-id')
    async findUserById(@Body() body: { id: string }) {
        return this.authService.findUserById(body.id);
    }
}