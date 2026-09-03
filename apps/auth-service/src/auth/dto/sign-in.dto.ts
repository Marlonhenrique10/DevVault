import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsEmail({}, {
        message: 'O e-mail fornecido não é válido.',
    })
    email: string;

    @IsString({
        message: 'A senha deve ser um texto.',
    })
    password: string;
}