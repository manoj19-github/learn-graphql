import { AuthenticationError, UserInputError } from "apollo-server";
import { DATABASE } from "../schemas";

export default class UserResolver {
  async getUsers() {
    // throw new AuthenticationError("You must be logged in");
    try{
        const userList = await DATABASE.USER.find().populate({
            path: "friends",
            populate: { path: "friends" },
          });
          return userList;
    }catch(error){
        throw new Error("something went wrong")
    }
  }
  async getUser(parent:any,args:{id:any}){
    try{
        const userId = args.id;
        if(!userId) throw new UserInputError("User id missing");
        return  await DATABASE.USER.findById(userId).populate({
            path: "friends",
            populate: { path: "friends" },
          });

    }catch(error){
        console.log(error);
        throw new Error("something went wrong")
    }
  }
}
