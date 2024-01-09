import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.config";
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

class ExpressApp {
  private app: Application;
  private PORT: unknown;
  private httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private apolloServer: ApolloServer<BaseContext>;
  constructor() {
    config();
    this.app = express();
    this.PORT = process.env.PORT ?? 5000;
    this.httpServer = http.createServer(this.app);
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    this.middleware();
    
    
  }
  private async middleware() {
    await this.apolloServer.start();
    this.app.use(
      "/graphql",
      cors(),
      express.json(),
      expressMiddleware(this.apolloServer)
    );
  }
  public async listen() {
    try {
        connectDB();
      await this.httpServer.listen({ port: this.PORT });
      console.log(`server listening at ${this.PORT}`);
    } catch (error) {
      console.log("error : ", error);
    }
  }
}
const server = new ExpressApp();
server.listen();

