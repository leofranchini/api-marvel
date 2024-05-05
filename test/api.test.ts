import request from "supertest";
import app from "../src/app";

describe('Testando a rota /api/personagens', () => {
  it('Deve retornar todos os personagens', async () => {
    const res = await request(app).get('/api/personagens');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2); 
    expect(res.body[0]).toHaveProperty('nome', 'Homem-Aranha'); 
    expect(res.body[1]).toHaveProperty('nome', 'Batman'); 
  });
});