import { Schema } from "mongoose";
const UserSchema = new Schema({
  cnpj: {
    type: String,
    required: true
  },

  rsocial: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  
  endereco: {
    type: String, 
    default: ''
  },

  cidade: {
    type: String, 
    default: ''
  },
  
  estado: {
    type: String, 
    default: ''
  },

  contato:{
    type: String, 
    default: ''
  },

  telefone: {
    type: String, 
    default: ''
  },
});
export default UserSchema;