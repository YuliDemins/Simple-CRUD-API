import { ServerResponse } from "http"
import { DBtype } from "./server"

export const deleteItem = (url: string, response: ServerResponse, arr: DBtype) => {
  const id = url.split('/')[3]
  try {
    const item = arr.find((i) => i.id === id)
    if (!item) {
      response.writeHead(404, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify({ message: 'Item not found'}))
    }
    else {
      const deleteItem = arr.splice((parseInt(id) - 1), 1)
      response.writeHead(204, { 'Content-Type': 'application/json'});
      return response.end(JSON.stringify(deleteItem))
    }

  }
  catch (err) {
    console.log(err)
  }
}
