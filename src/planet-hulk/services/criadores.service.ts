import { networkInterfaces } from "os"
import criadoresModel from "../schemas/criadores.schema"
import { criadoressType } from "../types/criadores.types"
import axios from "axios"

class criadoresService{

        async create(criadores: criadoressType) {
        const createdCriadores = await criadoresModel.create(criadores)
        return createdCriadores
        }

        async findAll(){
        const foundCriadores = await criadoresModel.find()
        return foundCriadores
        }

        async findById(id:any){
        const foundCriadores = await criadoresModel.findById(id)
        return foundCriadores
        }

        async update(id:any, criadores:criadoressType){
            const updatedCriadores = await criadoresModel.findByIdAndUpdate(id, {
                nome: criadores.nome,
                funcao: criadores.funcao
            }, {new: true})

            return updatedCriadores
        }
        
        async delete(id:string){
            try {
            await criadoresModel.findByIdAndDelete(id)
            return "Criador removida com sucesso"
            } catch (error) {
            throw new Error(`Ocorreu um erro ao remover este Criador:${error}`)  
            }
        }

        async fetchAndStoreCreators() {
            try {
              const response = await axios.get(
                `https://gateway.marvel.com/v1/public/series/19625/creators?apikey=fefc0bc8c1a9f8b8dfa42d4a941b09b0&hash=7e313b232aea5bbada5d0b9d98dbef5c&ts=1`
              );
        
              const creators = response.data.data.results;
        
              for (const creator of creators) {
                const newCreator: criadoressType = {
                  nome: creator.fullName,
                  funcao: creator.role
                };
        
                await this.create(newCreator);
              }
        
              console.log("Criadores achados e guardados com sucesso.");
            } catch (error) {
              console.error(`Erro ao buscar personagens: ${error}`);
            }
          }

}

export default new criadoresService()