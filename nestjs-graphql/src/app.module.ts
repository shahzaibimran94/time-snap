import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthResolver } from './module/auth/auth.resolver';
import { AppService } from './app.service';
import { AuthService } from './module/auth/auth.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  providers: [AppService, AuthService, AuthResolver],
})
export class AppModule {}
