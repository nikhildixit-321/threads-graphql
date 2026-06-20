
import { ApolloServer } from '@apollo/server';
import {User} from './user/index.js'

async function createApolloGraphqlServer(){
   const gqServer = new ApolloServer({
  typeDefs: `
     ${User.typeDefs}
  type Query {
  ${User.queries}

  }
  type Mutation {${User.mutation}}
`,
resolvers: {
 Query:{...User.resolvers.queries
  
 },
 Mutation:{...User.resolvers.mutation},
}
});
// start the gql server 
await gqServer.start() 
 return gqServer;
}
export default createApolloGraphqlServer;