import { describe, expect, it } from "@jest/globals";
import request from "supertest"
import app from "../src/app"

describe('Teste crud comic', () => {
  let comicId: string;

  it('Create comic', async () => {
    const res = await request(app)
      .post('/comics')
      .send({
        titulo: 'Teste comic ',
        descricao: 'Descricao',
        dataPublicacao: '2022-05-25',
        capa: 'http://exemplo.com/capa.jpg'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    comicId = res.body._id;
  });

  it('Find all comics', async () => {
    const res = await request(app).get('/comics');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Find by id comic', async () => {
    const res = await request(app).get(`/comics/${comicId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', comicId);
  });

  it('Update comcis', async () => {
    const res = await request(app)
      .put(`/comics/${comicId}`)
      .send({
        titulo: 'Comic teste',
        descricao: 'Uma história ainda mais emocionante',
        dataPublicacao: '2022-05-25',
        capa: 'http://exemplo.com/capa_modificada.jpg'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Comic modificada');
    expect(res.body).toHaveProperty('descricao', 'Teste descricao');
  });

  it('Delete comics', async () => {
    const res = await request(app).delete(`/comics/${comicId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', comicId);
  });
});