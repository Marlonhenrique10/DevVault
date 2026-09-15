import { Controller, Body, Post, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async createUser(@Body() dto: SignUpDto) {
        return this.authService.createUser(dto);
    }

    @Get('/find-user-by-email')
    async findUserByEmail(@Body() body: { email: string }) {
        return this.authService.findUserByEmail(body.email);
    }

    @Get('/find-user-by-id')
    async findUserById(@Body() body: { id: string }) {
        return this.authService.findUserById(body.id);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() request: any) {
    return {
        message: 'Usuário autenticado.',
        user: request.user,
    };
    }

    @Post('sign-in')
    async signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }
}