import Organization from '../models/Organization';

class orgServices {
    async getAllOrgs() {
     try{
        const getOrgs = await Organization.findAll();
        return getOrgs;
     }catch(e){
        console.log(e)
        return {err: "BAD_FIND_ALL_REQUEST"}
     }
    }

    async newUser(body) {
        try{
            if(!body.cnpj || !body.rsocial || !body.email){ return {err: 'Organization needs a CPNJ, Razão Social and Email!'} }
            
            const cnpjTest = await this.searchOrgByCnpj(body.cnpj);
            if(cnpjTest) return {err: 'CNPJ already in use!'};
            
            const newOrg = await Organization.create(body);
            return {msg: "Organization created!", cnpj: newOrg.cnpj};
        }catch(e){
            console.log(e)
            return {err:"BAD_CREATE_REQUEST"}
        }
      }

    async searchOrg (query){
        try{

            let searchRequest;
            if(query.id) searchRequest = await this.searchOrgById(query.id);   
        
            if(query.cnpj) searchRequest = await this.searchOrgByCnpj(query.cnpj)

            if(query.rsocial) searchRequest = await this.searchOrgByName(query.rsocial)
            
            return searchRequest ? searchRequest : {err: "Organization not found!"};
        }catch(e){
            console.log(e)
            return {err: "BAD_SEARCH_REQUEST"}
        }
    }

    async searchOrgById(id) {
    try{
        const organization = await Organization.findByPk(id);   
        return organization;
     }catch(e){
        console.log(e)
        return {err: "BAD_SEARCH_BY_ID_REQUEST"}
     }
  }

  async searchOrgByName(name) {
    try{
        const organization = await Organization.findOne({where: {rsocial: name}})      
        return organization;
     }catch(e){
        console.log(e)
        return {err: "BAD_SEARCH_BY_NAME_REQUEST"}
     }
  }

  async searchOrgByCnpj(cnpj) {
    try{
        const organization = await Organization.findOne({where: {cnpj: cnpj}})  
        return organization;
     }catch(e){
        console.log(e)
        return {err: "BAD_SEARCH_BY_CNPJ_REQUEST"}
     }
  }

  async updateOrg(query, body) {
      try{

        const organization = await this.searchOrg(query);

        if(organization.err) return organization;
        if(body.cnpj) return {err: 'Cannot change organization CNPJ'};

        await organization.update(body);
        
        return {msg: 'Organization updated with success!', ...body};

      }catch(e){
        console.log(e)
        return {err: "BAD_UPDATE_REQUEST"}
      }
      
  }

  async deleteOrg(query){
      try{
        const organization = await this.searchOrg(query);
        if(organization.err) return organization
        
        await organization.destroy();
        return {msg: 'Organization Deleted!', deletedId: query.id}
        
      }catch(e){
        console.log(e)
        return {err: "BAD_DELETE_REQUEST"}
      }
  }
  

}
  
  export default new orgServices();