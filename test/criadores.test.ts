import { describe, expect, it } from "@jest/globals";
import request from 'supertest';
import app from "../src/app"

describe('Teste crud criadores', () => {
  let creatorId: string;

  it('Deve criar um criador', async () => {
    const res = await request(app)
      .post('/creators')
      .send({
        nome: 'nome',
        funcao: 'funcao'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    creatorId = res.body._id;
  });

  it('Find all criadores', async () => {
    const res = await request(app).get('/creators');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Find by id criadores', async () => {
    const res = await request(app).get(`/creators/${creatorId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', creatorId);
  });

  it('Update criadores', async () => {
    const res = await request(app)
      .put(`/creators/${creatorId}`)
      .send({
        nome: 'Jane Doe',
        funcao: 'Escritora'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Jane Doe');
    expect(res.body).toHaveProperty('funcao', 'Escritora');
  });

  it('Delete criador', async () => {
    const res = await request(app).delete(`/creators/${creatorId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', creatorId);
  });
});
