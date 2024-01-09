
import UserResolver from './user.resolver';
const userResolver = new UserResolver();
const resolvers = {
    Query: {
        users:userResolver.getUsers,
        user:userResolver.getUser
    },
  };

  export default resolvers