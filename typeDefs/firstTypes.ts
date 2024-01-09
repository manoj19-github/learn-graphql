
const typeDefs=`#graphql
    type User{
        name:String!
        username:String!
        age:Int!
        nationality:String!

    }
    type Query{
        users:[User!]!
    }
`