import { forwardRef, Module } from "@nestjs/common";
import { ClienteModule } from "../cliente/cliente.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { Bcrpyt } from "./bcrypt/bcrypt";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
@Module({
    imports: [
        forwardRef(()=> ClienteModule),
        PassportModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{expiresIn:'2h'},
        }),
    ],
    providers: [Bcrpyt,AuthService,LocalStrategy,JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrpyt],
})
export class AuthModule {

};