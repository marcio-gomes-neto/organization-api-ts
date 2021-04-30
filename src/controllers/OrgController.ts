import {Router} from "express";
import OrgServices from '../services/orgServices';
import {registerOrganizationValidator, validate} from "../middleware/validator"
export default class OrgController {

    private router = Router();
    private services = new OrgServices();
    routerPath:string = "/organization";

    route(){
      this.router.get('/', this.services.getAllOrgs);
      
      this.router.get('/search/cnpj/:cnpj', this.services.searchOrganizationByCnpj);
      this.router.get('/search/id/:id', this.services.searchOrganizationById);
      this.router.get('/search/name/:name', this.services.searchOrganizationByName);

      this.router.put('/update/:id',this.services.updateOrg);

      this.router.post('/', registerOrganizationValidator(), validate, this.services.newUser);

      this.router.delete('/delete/:id',this.services.deleteOrg)

      return this.router;
    }
}