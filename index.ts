import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

const app = express();

const server = new ApolloServer<any>({
  typeDefs:``,
  resolvers:()=>{},
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
server.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));