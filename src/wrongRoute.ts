import { ServerResponse } from "http"
import { StatusCodes } from "./types/StatusCodes"

export const wrongRoute = (response: ServerResponse) => {
  response.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json'})
  response.end(JSON.stringify({ message: 'Route not found' }))
}