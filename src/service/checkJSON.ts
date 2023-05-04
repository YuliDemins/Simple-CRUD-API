import { IncomingMessage } from "http";

export const checkJSON = <IUser>(request: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      try {
        const data = JSON.parse(chunks.toString());
        resolve(data);
      } catch (err) {
        reject();
      }
    });
  });
}