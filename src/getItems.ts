import { ServerResponse } from "http"
import { DBtype, IUser } from "./server"
import { wrongRoute } from "./wrongRoute"

export const getItems = (url: string, response: ServerResponse, arr: DBtype): void => {
  if (url === '/api/items') {
    try {
      response.writeHead(200, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify(arr))
    }
    catch (error) {
      console.log(error)
    }
  }
  else if (url?.startsWith('/api/items/')) {
    const id = url.split('/')[3]
    const item = arr.find((i) => i.id === id)
    if (!item) {
      response.writeHead(404, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify({ message: 'Item not found'}))
    }
    else {
      response.writeHead(200, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify(item))
    }
  }
  else wrongRoute(response)
}
