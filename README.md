# Simple-CRUD-API

:star: Get started:

1. Clone this repository `git clone ...link...`

2. Switch branch to develop `git checkout develop`

3. Use `npm install`

4. Use command:

  `npm run start:dev` dev mode 

  `npm run start:prod` production mode

  `npm run start:multi` multi cluster mode

Use Postman to send request to the server.

:fire: API

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create new user

`PUT api/users/${userId}` - to update user

`DELETE api/users/${userId}`- to delete user