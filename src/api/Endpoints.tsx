import { IUser } from "../interfaces";
import { api } from "../lib/axios";

class Endpoints {
  
  async Signin({email, password}:IUser) {
    try {
      await api.post('/users/signin', {email, password})
    } catch (error: any) {
      return error
    }
  }

  async Signup({name=undefined, email, password}: IUser){
    return await api.post('/users', {name, email, password})
  } 
}

export default new Endpoints()