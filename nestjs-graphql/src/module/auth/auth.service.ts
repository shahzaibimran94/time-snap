import { Injectable } from '@nestjs/common';
import { firebaseAuth } from '../../services/firebase.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async verifyFirebaseToken(token: string): Promise<string> {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      const user = { uid: decodedToken.uid, email: decodedToken.email };

      // Generate server token (JWT)
      const serverToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return serverToken;
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }
}
