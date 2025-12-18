import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { ClienteSemSenha } from "../interfaces/cliente-sem-senha.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({

      usernameField: 'email',
      passwordField: 'senha', 
    });
  }

  async validate(usuario: string, senha: string): Promise<ClienteSemSenha> {
    const cliente = await this.authService.validateUser(usuario, senha);

    if (!cliente) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    return cliente; 
}
}