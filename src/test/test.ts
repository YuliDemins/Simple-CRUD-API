
import { server } from "../server";
import request from "supertest";
import { StatusCodes } from "../types/StatusCodes";
import { IUser } from "../types/IUser";

let User: IUser;

describe('tests for API', () => {
  test('should return 200 and empty array', async () => {
    await request(server).get('/api/users').expect(StatusCodes.OK, [])
  })
  test('should return 400 for invalid id', async () => {
    await request(server).get('/api/users/1').expect(StatusCodes.BadRequest)
  })
  test('should return 404 for not existing user', async () => {
    await request(server).get('/api/users/370122b5-dac9-4ed4-a641-beff7c3c7d6a').expect(StatusCodes.NotFound)
  })
  test('should not create user with incorrect data', async() => {
    await request(server)
    .post('/api/users')
    .send({username: 'Sam'})
    .expect(StatusCodes.BadRequest)

    await request(server).get('/api/users').expect(StatusCodes.OK, [])
  })
  test('should not create user with incorrect data', async() => {
    await request(server)
    .post('/api/users')
    .send({
      username: '',
      age: 24,
      hobbies: ['test']
    })
    .expect(StatusCodes.BadRequest)

    await request(server).get('/api/users').expect(StatusCodes.OK, [])
  })
  test('should create user', async() => {
    const response = await request(server)
    .post('/api/users')
    .send({
      username: 'Sam',
      age: 24,
      hobbies: ['test']
    })
    .expect(StatusCodes.Created);

    User = response.body;

    expect(User).toEqual({
      id: expect.any(String),
      username: 'Sam',
      age: 24,
      hobbies: ['test']
    })

    await request(server).get('/api/users').expect(StatusCodes.OK, [User])
  })
  test('should not update user with incorrect data', async() => {
    await request(server)
    .put(`/api/users/${User.id}`)
    .send({
      username: '',
      age: 24,
      hobbies: ['test']
    })
    .expect(StatusCodes.BadRequest)

    await request(server).get(`/api/users/${User.id}`).expect(StatusCodes.OK)
  })
  test('should not update user that id not valid', async() => {
    await request(server)
    .put(`/api/users/1`)
    .send({ username: 'Sam',
    age: 24,
    hobbies: ['test']
    })
    .expect(StatusCodes.BadRequest)
  })
  test('should update user', async() => {
    const response = await request(server)
    .put(`/api/users/${User.id}`)
    .send({
      username: 'Test',
      age: 20,
      hobbies: []
    })
    .expect(StatusCodes.OK);
  
    User = response.body;
  
    expect(User).toEqual({
      id: expect.any(String),
      username: 'Test',
      age: 20,
      hobbies: []
    })
  
    await request(server).get('/api/users').expect(StatusCodes.OK)
  })
  test('should delete user', async() => {
    await request(server)
    .delete(`/api/users/${User.id}`)
    .expect(StatusCodes.NoContent);
  
    await request(server).get('/api/users').expect(StatusCodes.OK)
  })
})
