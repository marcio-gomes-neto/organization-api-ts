import orgUsersServices from '../services/orgUsersServices';

class orgUsers {
    async index(req, res){
        try {
            res.json('ola')
            
        } catch (error) {
            console.log(error);
            res.json(null);
        }
    }

    async createNewUserAsync(req,res){
        try {

            const newUser = await orgUsersServices.createUser(req.body);
            return (newUser.err) ? res.status(400).json(newUser) : res.status(201).json(newUser);
            
        } catch (error) {
            console.log(error)
            res.json(null)
        }
    }

    async findOrgUsersAsync (req, res){
        try {
            let users;
            
            if(req.query.t === 'user') users = await orgUsersServices.searchUserById(req.query.id)
            if(req.query.t === 'org') users = await orgUsersServices.findUsersByOrganizationID(req.query)

            return (users.err) ? res.status(400).json(users) : res.status(200).json(users);  
        } catch (error) {
            console.log(error)
            res.json(null)
        }
        
    }

    async deleteOneUserByIdAsync(req,res){
        try {
            const deleteUser = await orgUsersServices.deleteOneUser(req.query)
            return (deleteUser.err) ? res.status(400).json(deleteUser) : res.status(200).json(deleteUser)
        } catch (error) {
            
        }
    }
}

export default new orgUsers();