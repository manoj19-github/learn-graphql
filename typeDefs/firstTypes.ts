
const typeDefs=`#graphql
    type User{
        name:String!
        username:String!
        age:Int!
        nationality:String!
        friends:[User]

    }
    type Query{
        users:[User!]!
        user(id:ID!):User!
    }
`


export default typeDefs;