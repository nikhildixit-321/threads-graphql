import prisma from "../lib/db.js";
import { createHmac , randomBytes} from "node:crypto";
import JWT from 'jsonwebtoken'
export interface getUserTokenPayload {
    email:string,
    password:string,
}

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
const JwtScreate = '$uperM@rt51@1$@'
class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const  salt = randomBytes(32).toString('hex'); 
    const  hash = createHmac('sha256', salt).update(password).digest('hex');    
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        salt: salt,
      },
    });
  }

  public static async getuserToken(payload: getUserTokenPayload){
    const {email,password} = payload; 
    const user = await prisma.user.findUnique({where:{
      email
    }});
    if(!user) throw new Error('user not found');
    const {password:hash, salt} = user;
    const hashed = createHmac('sha256', salt).update(password).digest('hex');
    if(hashed !== hash) throw new Error('invalid password');
    //  gen token
   const token = JWT.sign({id:user.id,email:user.email},JwtScreate)  
  }
}

export default UserService;