import request from 'supertest';
import { app, startServer } from './serverApp';

describe('testing the server for correct behavior', () => {
  it('should get up and running', () => {
    const mockListen = jest.fn();
    app.listen = mockListen;
    startServer();
    expect(mockListen).toBeCalledTimes(1);
  });
  it('should return the correct price from the server', async () => {
    const response = await request(app.callback())
      .post('/')
      .send('["002","002","002","002","002","002","002","001", "001", "001", "001"]')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 'price': 740 });
    expect(response.headers['content-type']).toContain('application/json');
  });

  it('should return 400 on invalid product id', async () => {
    const response = await request(app.callback())
      .post('/')
      .send('["008"]')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
  });

  it('should return 400 on invalid request body', async () => {
    const response = await request(app.callback())
      .post('/')
      .send('{}')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
  });

  it('should return 400 on invalid accept header', async () => {
    const response = await request(app.callback()).post('/').send('["001"]').set('Accept', 'ff/json');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Bad headers set');
  });

  it('should return 400 on invalid content-type header', async () => {
    const response = await request(app.callback()).post('/').send('["001"]').set('Content-Type', 's/json');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Bad headers set');
  });

  it('should return 405 on GET method', async () => {
    const response = await request(app.callback()).get('/').set('Accept', 'application/json').set('Content-Type', 'application/json');
    expect(response.status).toBe(405);
  });

  it('should return 405 on DELETE method', async () => {
    const response = await request(app.callback()).delete('/').set('Accept', 'application/json').set('Content-Type', 'application/json');
    expect(response.status).toBe(405);
  });

  it('should return 405 on PUT method', async () => {
    const response = await request(app.callback()).put('/').set('Accept', 'application/json').set('Content-Type', 'application/json');
    expect(response.status).toBe(405);
  });

  it('should return 405 on PATCH method', async () => {
    const response = await request(app.callback()).patch('/').set('Accept', 'application/json').set('Content-Type', 'application/json');
    expect(response.status).toBe(405);
  });
});
