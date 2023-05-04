import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { DBtype, IUser } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';
import { checkJSON } from './checkJSON';
import { ErrorMessage } from '../types/ErrorMessage';

export const setUser = async (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  arr: DBtype
): Promise<void> => {
  if (url === '/api/users') {
    try {
      let data:IUser = await checkJSON(request)
        if (
          !data.hasOwnProperty('username') ||
          !data.hasOwnProperty('age') ||
          !data.hasOwnProperty('hobbies') ||
          !Array.isArray(data.hobbies)
        ) {
          response.writeHead(StatusCodes.BadRequest, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify({ message: ErrorMessage.BadRequest }));
        } else {
          const { username, age, hobbies } = data;
          const getUser: IUser = {
            id: uuidv4(),
            username,
            age,
            hobbies,
          };

          response.writeHead(StatusCodes.Created, {
            'Content-Type': 'application/json',
          });
          arr.push(getUser);
          response.end(JSON.stringify(getUser));
        }
    } catch (err) {

      response.writeHead(StatusCodes.InternalServerError, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message:ErrorMessage.ServerError }));
    }
}};
