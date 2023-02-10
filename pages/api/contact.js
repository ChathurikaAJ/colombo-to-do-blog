
import {GraphQLClient, gql} from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_BLOG_ENDPOINT;

const hyGraphToken = process.env.HYGRAPH_TOKEN;

export default async function comments(req,res) {

  const {name, email, text} = req.body;
  
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${hyGraphToken}`
    },
  })

  const query = gql `
    mutation CreateContact($name: String!, $email:String!, $text: String!){
      createContact(data:{name: $name, email:$email, text:$text, 
    }){id}
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result)
}