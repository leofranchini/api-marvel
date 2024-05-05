import { Schema, model } from "mongoose";

const personagemSchema = new Schema({
    nome: String,
    descricao: String,
    imagemurl: String,
});

export default model("Personagens", personagemSchema);