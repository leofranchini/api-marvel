import personagensModel from "../schemas/personagens.schema"
import { personagensTypes } from "../types/personagens.types"
import axios from "axios"

class personagensService{

        async create(personagens: personagensTypes) {
        const createdPersonagens = await personagensModel.create(personagens)
        return createdPersonagens
        }

        async findAll(){
        const foundPersonagens = await personagensModel.find()
        return foundPersonagens
        }

        async findById(id:any){
        const foundPersonagens = await personagensModel.findById(id)
        return foundPersonagens
        } 

        async update(id:any, personagens:personagensTypes){
        const updatePersonagens = await personagensModel.findByIdAndUpdate(id, {
              nome: personagens.nome,
              descricao: personagens.descricao,
              imagemurl: personagens.imagemurl
            }, {new: true})
        
        return updatePersonagens
        }

        async delete(id:string){
            try {
              await personagensModel.findByIdAndDelete(id)
              return "Personagem removido com sucesso"
            } catch (error) {
              throw new Error(`Ocorreu um erro ao remover o Personagem:${error}`)  
            }
        }
        
        async fetchAndStoreCharacters() {
          try {
            const response = await axios.get(
              `https://gateway.marvel.com/v1/public/comics/19625/characters?apikey=fefc0bc8c1a9f8b8dfa42d4a941b09b0&hash=7e313b232aea5bbada5d0b9d98dbef5c&ts=1`
            );
      
            const characters = response.data.data.results;
      
            for (const character of characters) {
              const newCharacter: personagensTypes = {
                nome: character.name,
                descricao: character.description || "",
                imagemurl:
                  character.thumbnail.path + "." + character.thumbnail.extension,
              };
      
              await this.create(newCharacter);
            }
      
            console.log("Personagens achados e guardados com sucesso.");
          } catch (error) {
            console.error(`Erro ao buscar personagens: ${error}`);
          }
        }

}

export default new personagensService()