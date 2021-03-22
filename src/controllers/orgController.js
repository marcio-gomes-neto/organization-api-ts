import services from '../services/orgServices';

class orgController {
    async FindAllAsync(req, res) {
      try{
          const orgs = await services.getAllOrgs();
          return res.status(200).json(orgs);
        
        }catch(e){
          console.log(e)
          return res.status(400);
      }
    }

    async AddAsync(req, res) {
        try{

            const newOrg = await services.newUser(req.body)
            return (newOrg.err) ? res.status(400).json(newOrg) : res.status(201).json(newOrg);
        
          }catch(e){
            console.log(e)
            return res.status(400);
        }
      }

    async SearchAsync(req, res) {
    try{

        const searchRequest = await services.searchOrg(req.query);
        return res.status(200).json(searchRequest);

     }catch(e){
        console.log(e)
        return res.status(400).json(null)
     }
  }

  async UpdateAsync(req, res) {
      try{

        const update = await services.updateOrg(req.query, req.body);
        return (update.err) ? res.status(400).json(update) : res.status(200).json(update);

      }catch(e){
        console.log(e)
        return res.status(400).json(null)
      }
      
  }

  async DeleteAsync(req, res){
      try{
        
        const deleteOrg = await services.deleteOrg(req.query);
        return (deleteOrg.err) ? res.status(400).json(deleteOrg) : res.status(200).json(deleteOrg);
        
      }catch(e){
        console.log(e)
        return res.status(400).json(null)
      }
  }
  

}
  
  export default new orgController();