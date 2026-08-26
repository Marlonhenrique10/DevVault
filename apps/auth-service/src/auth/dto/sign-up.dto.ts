import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class SignUpDto {
    @IsEmail({}, {
        message: 'O e-mail fornecido não é válido.',
    })
    email: string;

    @IsString()
    @MinLength(8, {
        message: 'A senha deve ter no mínimo 8 caracteres.',
    })
    password: string;
}