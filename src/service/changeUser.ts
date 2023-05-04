import { IncomingMessage, ServerResponse } from 'http';
import { DBtype, IUser } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';
import { ErrorMessage } from '../types/ErrorMessage';
import { checkJSON } from './checkJSON';

export const changeUser = async (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  arr: DBtype
): Promise<void> => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    if (!id) {
      response.writeHead(StatusCodes.BadRequest, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: ErrorMessage.BadRequest }));
    } else {
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

              const correctUser: IUser = {
                id,
                username,
                age,
                hobbies,
              };

              arr[parseInt(id) - 1] = { ...correctUser };
              response.writeHead(StatusCodes.OK, {
                'Content-Type': 'application/json',
              });
              response.end(JSON.stringify(correctUser));
            }
      } catch (err) {
        console.log(err);
        response.writeHead(StatusCodes.InternalServerError, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ message: ErrorMessage.ServerError }));
      }
    }
  }
};
