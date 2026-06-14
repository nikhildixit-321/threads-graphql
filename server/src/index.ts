import express, { Request, Response } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import prisma from "./lib/db.js";
const app = express();

// create graphql server 
async function init(){
    const gqServer = new ApolloServer({
  typeDefs: `
  type Query {
    hello: String
    say(name: String): String
  }
  type Mutation {
   createUser(email:String!,firstName:String!,lastName:String!,password:String! ): Boolean}
`,
resolvers: {
  Query: {
    hello: () => "Hello, GraphQL!",
    say:(_,{name}:{name: string}) => `Hello, ${name}!`
  },
  Mutation:{
    createUser: async (_,{email,firstName,lastName,password }:
      {email:string,firstName:string,  lastName:string,password:string}) =>{
      await prisma.user.create({
        data:{
          email:email,
          firstName:firstName,
          lastName:lastName,
          passward:password,
          salt :'randdom_salt' 
        }
      });
      return true;
    }
  } 
}
});
// start the gql server 
await gqServer.start()
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express with TypeScript");
});
app.use(express.json());
app.use('/graphql', expressMiddleware(gqServer));

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
}

init()