import { IncomingMessage, ServerResponse } from "http";
import { DBtype, IUser } from "./server";
import { v4 as uuidv4 } from 'uuid';
import { wrongRoute } from "./wrongRoute";

export const setItem = (url:string, request:IncomingMessage, response: ServerResponse, arr: DBtype) => {
  if (url === '/api/items') {
    try {
      let body: string = '';
      request.on('data', (chunk) => {
        body += chunk.toString()
      })
  
      request.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body)
  
        const getItem: IUser = {
        id: uuidv4(),
        username,
        age,
        hobbies
      }
  
        response.writeHead(201, { 'Content-Type': 'application/json'});
        arr.push(getItem)
        return response.end(JSON.stringify(getItem))
      })
  
  
    }
    catch(err) {
      console.log(err)
    }
  }
  else wrongRoute(response)
}