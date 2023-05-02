import { IncomingMessage, ServerResponse } from "http";
import { DBtype, IUser } from "./server";

export const changeItem = (url: string, request:IncomingMessage, response: ServerResponse, arr: DBtype) => {
  const id = url.split('/')[3]
  try {
    let body: string = '';
    request.on('data', (chunk) => {
      body += chunk.toString()
    })
    const item = arr.find((i) => i.id === id)
    if (!item) {
      response.writeHead(404, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify({ message: 'Item not found'}))
    }
    else {
      request.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body)

        const correctItem: IUser = {
          id,
          username,
          age,
          hobbies
      }

      arr[parseInt(id) - 1] = {...correctItem}
      response.writeHead(200, { 'Content-Type': 'application/json'});
      return response.end(JSON.stringify(correctItem))
      })
    }

  }
  catch(err) {
    console.log(err)
  }
}