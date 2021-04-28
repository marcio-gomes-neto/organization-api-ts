import Organization from '../models/OrganizationModel';
import {Request, Response} from "express";

export default class OrgServices {
    
   async getAllOrgs(req:Request, res:Response) {
      try{
         
         const getOrgs = await Organization.find();
         return res.status(200).json(getOrgs);

      }catch(e){
         
         return res.status(500).json(e);
      }
   }

   async newUser(req:Request, res:Response) {
      
      const {cnpj, rsocial, email} = req.body;
      if(!cnpj || !rsocial || !email){ return res.status(400).json({err:'Organization needs a CPNJ, Razão Social and Email!'}) }
      
      try{

         const cnpjTest = await Organization.findOne({cnpj});
         if(cnpjTest) return res.status(400).json({err: 'CNPJ already in use!'});
         
         const newOrg = new Organization({cnpj, rsocial, email});
         await newOrg.save();

         return res.status(201).json({msg: 'Organization Created!', cnpj})
      }catch(e){

         console.log(e)
         return res.status(400).json({err: 'BAD_CREATE_REQUEST'})
      }
   }

   async searchOrganizationByCnpj(req:Request, res:Response){

      const {cnpj} = req.params
      try{

         const searchRequest = await Organization.findOne({cnpj}); 
         return searchRequest ? res.status(200).json(searchRequest) : res.status(404).json({msg:"No Organization Found"});
      }catch(e){
         
         console.log(e)
         return res.status(500).json({err: "BAD_SEARCH_BY_CNPJ_REQUEST"})
      }
   }

   async searchOrganizationById(req:Request, res:Response){

      const {id} = req.params
      try{

         const searchRequest = await Organization.findById({_id: id}); 
         return searchRequest ? res.status(200).json(searchRequest) : res.status(404).json({msg:"No Organization Found"});
      }catch(e){
         
         console.log(e)
         return res.status(500).json({err: "BAD_SEARCH_BY_ID_REQUEST"})
      }
   }

   async searchOrganizationByName(req:Request, res:Response){

      const {name} = req.params
      try{

         const searchRequest = await Organization.findOne({rsocial: name}); 
         return searchRequest ? res.status(200).json(searchRequest) : res.status(404).json({msg:"No Organization Found"});
      }catch(e){
         
         console.log(e)
         return res.status(500).json({err: "BAD_SEARCH_BY_NAME_REQUEST"})
      }
   }

  async updateOrg(req:Request, res:Response) {

      const {id} = req.params;
      const body = req.body

      if(body.cnpj) return res.status(400).json({err: "Cannot change Organization CNPJ"})

      try{

        const updatedOrganization = await Organization.findByIdAndUpdate({_id: id}, {...body}, {new: true});
        return updatedOrganization ? res.status(200).json(updatedOrganization) : res.status(404).json({err: "Organization Not Found"});
      }catch(e){

        console.log(e)
        return res.status(500).json({err: "BAD_UPDATE_REQUEST"})
      }
      
  }

  async deleteOrg(req:Request, res:Response){
      
      const {id} = req.params;
      try{
         
         const deletedOrg = await Organization.findByIdAndDelete({_id:id});
         return deletedOrg ? res.status(200).json(deletedOrg) : res.status(404).json({err: "Organization Not Found"});
      }catch(e){
         
         console.log(e)
         return res.status(500).json({err: "BAD_DELETE_REQUEST"})
      }
  }
  

}