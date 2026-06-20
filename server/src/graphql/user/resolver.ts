import { error } from 'node:console';
import { CreateUserPayload, getUserTokenPayload } from '../../services/user.js'
import UserService from '../../services/user.js'

const queries = {
    getUserToken:async(_:any,payload:{email:string,password:string})=>{
        const token = await UserService.getuserToken({
            email:payload.email,
            password:payload.password,

        })
        return token;
    },
    getCurrentLoggedUser:async()=>{
        throw new Error("i dont know")
    }
}

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }   
}   

export const resolvers = {queries,mutation}