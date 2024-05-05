import {Request, Response} from "express"
import comicsService from "../services/comics.service";

class comicController{

        async create (req: Request, res: Response){
        const createdcomic = await comicsService.create(req.body)
        res.status(201)
        return res.json(createdcomic)
    }

        async findAll(req: Request, res:Response){
        const foundComics = await comicsService.findAll()
        res.status(200)
        return res.json(foundComics)
    }
    
        async findById(req: Request, res:Response){
        const foundComics = await comicsService.findById(req.params.id)
        res.status(200)
        return res.json(foundComics)
    }

        async update(req: Request, res:Response){
        const foundComics = await comicsService.update(req.params.id, req.body)
        res.status(200)
        return res.json(foundComics)
    }

        async delete(req: Request, res:Response){
        const deleted = await comicsService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }

        async fetchComics(req: Request, res: Response){
            try {
                await comicsService.fetchAndStoreComics
                res.json("Comics buscadas com sucesso")
            } catch (error) {
                console.error(error)
            }
        }

}

export default new comicController()