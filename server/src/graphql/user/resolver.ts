const queries = {}


const mutation = {
    createUser:async (_:any,{},{}) => {
        return 'randomuuid'
    }   
}   

export const resolvers = {queries,mutation}