class HomeController {
  async index(req, res) {
    res.json('organizationAPI');
  }
}

export default new HomeController();
