import {Request, Response} from "express"
import personagensService from "../services/personagens.service";

class personagemController{

    async create (req: Request, res: Response){
    const createdPersonagem = await personagensService.create(req.body)
    res.status(201)
    return res.json(createdPersonagem)
    }

    async findAll(req: Request, res:Response){
    const foundPersonagem = await personagensService.findAll()
    res.status(200)
    return res.json(foundPersonagem)
    }

    async findById(req: Request, res:Response){
    const foundPersonagem = await personagensService.findById(req.params.id)
    res.status(200)
    return res.json(foundPersonagem)
    }

    async update(req: Request, res:Response){
    const foundPersonagem = await personagensService.update(req.params.id, req.body)
    res.status(200)
    return res.json(foundPersonagem)
    }

    async delete(req: Request, res:Response){
    const deleted = await personagensService.delete(req.params.id)
    res.status(200)
    return res.json(deleted)
    }

    async fetchCharacters(req: Request, res: Response) {
    try {
        await personagensService.fetchAndStoreCharacters();
        res.json({ message: "Personagens buscados com sucesso."});
        } catch (error) {
        console.error(error);
        }
    }
}

export default new personagemController()