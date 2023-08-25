import jwt, { JwtPayload } from 'jsonwebtoken';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { UserRole } from '../types/users';

interface CustomJWT extends JwtPayload {
  userId: string;
  role: UserRole;
}

interface CustomRequestBody extends FastifyRequest {
  body: {
    _id?: string;
  };
}

const auth = (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Votre requête n'est pas authentifiée");
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN ?? '') as CustomJWT;
    const userId = decodedToken.userId;
    const role = decodedToken.role as UserRole;
    if ((req as CustomRequestBody).body?._id && (req as CustomRequestBody).body._id !== userId) {
      throw new Error('Invalid user ID');
    } else {
      req.role = role;
      req.userId = userId;
      done();
    }
  } catch (error: unknown) {
    return res.code(401).send({ error });
  }
};

export default auth;
