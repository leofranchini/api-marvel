import { Schema, model } from "mongoose";

const criadorSchema = new Schema({
    nome: String,
    funcao: String,
})

export default model("Criadores", criadorSchema)