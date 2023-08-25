import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { UserRole } from '../types/users';

const authorize = (
  req: FastifyRequest,
  res: FastifyReply,
  done: HookHandlerDoneFunction,
  roles: UserRole[]
) => {
  if (roles) {
    if (!req.role) {
      done();
    } else if (roles.includes(req.role)) {
      done();
    } else {
      res.code(401).send({ error: 'Unauthorized' });
    }
  } else {
    done();
  }
};

export default authorize;
