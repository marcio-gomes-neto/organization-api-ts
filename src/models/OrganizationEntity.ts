import { Schema } from "mongoose";
const UserSchema = new Schema({
  cnpj: String,
  rsocial: String,
  email: String,
  endereco: String,
  cidade: String,
  estado: String,
  contato:String,
  telefone: String,
});
export default UserSchema;