import FormData from "form-data";
import fs from 'fs';
import {GraphQLClient, gql} from 'graphql-request';
import initMiddleware from '../../lib/init-middelware';
import parseMultipartForm from '../../lib/multipartParser';

export const config = {
  api: {
    bodyParser: false
  }
}

const multipartParser = initMiddleware(parseMultipartForm)


const graphqlAPI = process.env.NEXT_PUBLIC_BLOG_ENDPOINT;

const hyGraphToken = process.env.HYGRAPH_TOKEN;

export default async function handler (req,res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${hyGraphToken}`
    },
  })

  await multipartParser(req,res)

  const {file_1} = req.files
  const form = new FormData()
  form.append("fileUpload", fs.createReadStream(file_1.filepath))
  const upload = await fetch(`${graphqlAPI}/upload`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${hyGraphToken}`
    }, 
    body: form, 
  }). then((response) => response.json())

  const {name, date, time, desc, email, link} = req.body;
  let imageid = upload.id
  const eventObj = {name, date, time, desc, email, link, imageid}

  const query = gql `
    mutation AddEvent($name: String!, $date:String!, $time: String!, $desc: String!, $email: String!, $link: String, $imageid: ID!){
      createAddEvent(data:{
        name: $name, 
        date:$date, 
        time:$time, 
        description: $desc,
        email: $email,
        link:$link,
        image: {connect: {id: $imageid}}      
        
    }){id}

    }
      
  `
  try {
    await graphQLClient.request(query, eventObj)
    return res.status(200).send({message: "Event submitted"})
  } catch (error) {
    console.log(error)
  }


}

