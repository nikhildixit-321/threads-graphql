import express, { Request, Response } from "express";
import { expressMiddleware } from '@as-integrations/express5';
import prisma from "./lib/db.js";
import createApolloGraphqlServer from "./graphql/index.js"; 


// create graphql server 
async function init(){
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;  
    app.use(express.json());
    app.use('/graphql', expressMiddleware(await createApolloGraphqlServer(),{context: async ({req})=>{

    const token = req.header['token'] 
    }}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

init()