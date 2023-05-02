import { ServerResponse } from "http"

export const wrongRoute = (response: ServerResponse) => {
  response.writeHead(404, { 'Content-Type': 'application/json'})
  response.end(JSON.stringify({ message: 'Route not found' }))
}