import {Request, Response} from "express"
import criadoresService from "../services/criadores.service";

class CriadorController{

        async create (req: Request, res: Response){
        const createdCriadores = await criadoresService.create(req.body)
        res.status(201)
        return res.json(createdCriadores)
    }

        async findAll(req: Request, res:Response){
        const foundCriadores = await criadoresService.findAll()
        res.status(200)
        return res.json(foundCriadores)
    }

        async findById(req: Request, res:Response){
        const foundCriadores = await criadoresService.findById(req.params.id)
        res.status(200)
        return res.json(foundCriadores)
    }

        async update(req: Request, res:Response){
        const foundCriadores = await criadoresService.update(req.params.id, req.body)
        res.status(200)
        return res.json(foundCriadores)
    }

        async delete(req: Request, res:Response){
        const deleted = await criadoresService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }

        async fetchCreator(req: Request, res: Response) {
        try {
          await criadoresService.fetchAndStoreCreators();
          res.json({ message: "Criadores buscados com sucesso."});
        } catch (error) {
          console.error(error);
        }
      }

    }

export default new CriadorController()