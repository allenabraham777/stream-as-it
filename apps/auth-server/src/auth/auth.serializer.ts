import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserSerializer {
  @Expose()
  readonly id: number;

  @Expose()
  readonly account_id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class LoginResponseSerializer {
  @Expose()
  readonly token: string;

  constructor(partial: Partial<LoginResponseSerializer>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UserVerificationResponseSerializer {
  @Expose()
  readonly status: boolean;

  constructor(partial: Partial<UserVerificationResponseSerializer>) {
    Object.assign(this, partial);
  }
}
