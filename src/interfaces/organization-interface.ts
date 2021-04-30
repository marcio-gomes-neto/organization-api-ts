import { ObjectId } from "mongoose";

export default interface IOrganization {
    _id: ObjectId,
    cnpj: String,
    rsocial: String,
    email: String,
    endereco?: String,
    cidade?: String,
    estado?: String,
    contato?:String,
    telefone?: String,
}