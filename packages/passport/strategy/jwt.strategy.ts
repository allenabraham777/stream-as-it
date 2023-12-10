import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "@stream-as-it/db";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: number; account_id: number }) {
    const user = await this.prismaService.user.findFirst({
      where: { id: payload.id, account_id: payload.account_id },
    });
    if (!user) throw new ForbiddenException("Unauthorized");
    const { id, account_id, email } = user;
    return { id, account_id, email };
  }
}
