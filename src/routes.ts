import { IncomingMessage, ServerResponse } from "http";
import { Methods } from "./types/Methods";
import { getUsers } from "./service/getUsers";
import { setUser } from "./service/setUser";
import { changeUser } from "./service/changeUser";
import { deleteUser } from "./service/deleteUser";
import { wrongRoute } from "./service/wrongRoute";
import { DBtype } from "./types/IUser";

export const Routes = (request: IncomingMessage, response: ServerResponse, arr: DBtype) => {
  const { method, url } = request;

  console.log('Server request');
  
  switch (method) {
    case Methods.GET:
      if (url) getUsers(url, response, arr);
      break;
    case Methods.POST:
      if (url) setUser(url, request, response, arr);
      break;
    case Methods.PUT:
      if (url) changeUser(url, request, response, arr);
      break;
    case Methods.DELETE:
      if (url) deleteUser(url, response, arr);
      break;
    default:
      wrongRoute(response);
  }
}
