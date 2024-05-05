import {Router} from "express"
import comicsController from "./planet-hulk/controllers/comics.controller"
import criadoresController from "./planet-hulk/controllers/criadores.controller"
import personagensController from "./planet-hulk/controllers/personagens.controller"

const routes = Router()

//comics
routes.post('/comics', comicsController.create)
routes.get('/comics', comicsController.findAll)
routes.get('/comics/:id', comicsController.findById)
routes.put('/comics/:id', comicsController.update)
routes.delete('/comics/:id', comicsController.delete)
routes.get('/marvelComics', comicsController.fetchComics)

//criadores
routes.post('/criadores', criadoresController.create)
routes.get('/criadores', criadoresController.findAll)
routes.get('/criadores/:id', criadoresController.findById)
routes.put('/criadores/:id', criadoresController.update)
routes.delete('/criadores/:id', criadoresController.delete)
routes.get('/marvelCriadores', criadoresController.fetchCreator)

//personagens
routes.post('/personagens', personagensController.create)
routes.get('/personagens', personagensController.findAll)
routes.get('/personagens/:id', personagensController.findById)
routes.put('/personagens/:id', personagensController.update)
routes.delete('/personagens/:id', personagensController.delete)
routes.get('/marvelPersonagem', personagensController.fetchCharacters)


export{routes}