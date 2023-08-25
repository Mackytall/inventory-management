import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';

export interface Models {}

export interface Db {
  models: Models;
}

const ConnectDB: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  try {
    mongoose.connection.on('connected', () => {
      fastify.log.info({ actor: 'MongoDB' }, 'connected');
    });
    mongoose.connection.on('disconnected', () => {
      fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
    });
    await mongoose.connect(fastify.config.MONGO_URI);
    const models: Models = {  };
    fastify.decorate('db', { models });
  } catch (error) {
    console.error(error);
  }
};

export default fp(ConnectDB);
