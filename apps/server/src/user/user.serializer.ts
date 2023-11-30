import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserSerializer {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}
