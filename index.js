import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    greating(name : String!) : String!
    add(a :Float! , b:Float!) : Float!
    hello: String!
    id :ID!
    active :Boolean
    salary : Float!
    posts : [Post!]!
    me : User!
    post : Post!
  }
  type User{
    id : ID!
    name : String!
    password : String!
    active : Boolean!
  }
  type Post{
    id : ID!
    title : String!
    body : String!
    published : Boolean!
    user : User!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello World`,
    id: () => `abc 111`,
    active:()=> null , 
    salary:()=> 51.15, 
    greating:(parent , args , ctx , info)=>{
      console.log(info , 22222)
       return `wlecome ${args.name}`
    },
    me:()=>{
      return {
        id : 1 , 
        name : 'ahmed',
        password : '123456789', 
        active : false
      }
    }, 
    post:()=>{
      return {
         id : 2 , 
         title : "the first post title", 
         body : "this is post body", 
         published : true , 
         user : {
          id : 1 , 
          name : 'ahmed',
          password : '123456789', 
          active : false
         }
      }
    }, 
    add(parent , args , ctx , info){
      return args.a + args.b 
    }, 
    posts:()=>{
      return [
        {
          id : 2 , 
          title : "the first post title", 
          body : "this is post body", 
          published : true , 
          user : {
           id : 1 , 
           name : 'ahmed',
           password : '123456789', 
           active : false
          }
        }, 
        {
          id : 2 , 
          title : "the sconed post title", 
          body : "this is post body", 
          published : true , 
          user : {
           id : 1 , 
           name : 'ahmed',
           password : '123456789', 
           active : false
          }
        }
      ]
    }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
