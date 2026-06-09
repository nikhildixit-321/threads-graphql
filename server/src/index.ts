import express, { Request, Response } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
const app = express();

// create graphql server 
async function init(){
    const gqServer = new ApolloServer({
  typeDefs: `
  type Query {
    hello: String
    say(name: String): String
  }
`,
resolvers: {
  Query: {
    hello: () => "Hello, GraphQL!",
    say:(_,{name}:{name: string}) => `Hello, ${name}!`
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