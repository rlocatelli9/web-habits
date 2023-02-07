import { IUser } from "../interfaces";
import { api } from "../lib/axios";

class Endpoints {
  
  async Signin({email, password}:IUser) {
    return await api.post('/users/signin', {email, password})
  }

  async Signup({name=undefined, email, password}: IUser){
    return await api.post('/users/signup', {name, email, password})
  } 
}

export default new Endpoints()