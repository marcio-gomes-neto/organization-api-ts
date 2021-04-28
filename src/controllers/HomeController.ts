
import {Request, Response, Router} from "express";

export default class HomeController {
  
  private router = Router();
  routerPath:string = "/";
  
  async index(req:Request, res:Response) {
    res.json({msg: 'organizationAPI'});
  }

  route(){
    this.router.get('/', this.index);
    
    return this.router;
  }
}

