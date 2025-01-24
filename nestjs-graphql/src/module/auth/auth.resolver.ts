import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello, World!';
  }

  @Mutation(() => String)
  async login(@Args('token') token: string): Promise<string> {
    return this.authService.verifyFirebaseToken(token);
  }

  @Query(() => String)
  async privateData(@Context() context): Promise<string> {
    const user = context.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
    return `Welcome, ${user.email}! This is your private data.`;
  }
}
