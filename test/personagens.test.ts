import request from "supertest";
import app from "../src/app"

describe('Teste crud personagens', () => {
  let personagemId: string;

  it('Create personagens', async () => {
    const res = await request(app)
      .post('/personagens')
      .send({
        nome: 'Homem-Aranha',
        descricao: 'Um super-herói aracnídeo',
        imagemurl: 'http://exemplo.com/homem-aranha.jpg'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    personagemId = res.body._id;
  });

  it('Find all personagens', async () => {
    const res = await request(app).get('/personagens');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Find by id personagens', async () => {
    const res = await request(app).get(`/personagens/${personagemId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', personagemId);
  });

  it('Update personagens', async () => {
    const res = await request(app)
      .put(`/personagens/${personagemId}`)
      .send({
        nome: 'Homem-Aranha Modificado',
        descricao: 'Um super-herói aracnídeo com uma nova descrição',
        imagemurl: 'http://exemplo.com/homem-aranha_modificado.jpg'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Homem-Aranha Modificado');
    expect(res.body).toHaveProperty('descricao', 'Um super-herói aracnídeo com uma nova descrição');
  });

  it('Delete personagens', async () => {
    const res = await request(app).delete(`/personagens/${personagemId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', personagemId);
  });
});