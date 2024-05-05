import comicsModel from "../schemas/comics.schema"
import { comicsType } from "../types/comics.types"
import axios from "axios"

class comicService{

        async create(comics: comicsType) {
        const createdComics = await comicsModel.create(comics)
        return createdComics
        }

        async findAll(){
        const foundComics = await comicsModel.find()
        return foundComics
        }
        
        async findById(id:any){
        const foundComics = await comicsModel.findById(id)
        return foundComics
        }
        
        async update(id:any, comics:comicsType){
        const updatedComic = await comicsModel.findByIdAndUpdate(id, {
            titulo: comics.titulo,
            descricao: comics.descricao,
            dataPublicacao: comics.dataPublicacao,
            capa: comics.capa
        }, {new: true})

        return updatedComic
        }

        async delete(id:string){
            try {
              await comicsModel.findByIdAndDelete(id)
              return "Comic removida com sucesso"
            } catch (error) {
              throw new Error(`Ocorreu um erro ao remover a Comic:${error}`)  
            }
        }

        async fetchAndStoreComics() {
          try {
            const response = await axios.get(
              `https://gateway.marvel.com/v1/public/series/19625/comics?title=Planet%20Hulk&ts=1&apikey=fefc0bc8c1a9f8b8dfa42d4a941b09b0&hash=7e313b232aea5bbada5d0b9d98dbef5c`
            );
      
            const comics = response.data.data.results;
      
            for (const comic of comics) {
              const newComic: comicsType = {
                titulo: comic.title,
                descricao: comic.description || "",
                dataPublicacao: comic.dates.type,
                capa: comic.thumbnail.path + "." + comic.thumbnail.extension,
              };
      
              await this.create(newComic);
            }
      
            console.log("Comics guardadas com sucesso no MongoDB.");
          } catch (error) {
            console.error(`Erro ao buscar comics: ${error}`);
          }
        }
}

export default new comicService()