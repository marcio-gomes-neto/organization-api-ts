import OrgUsers from '../models/OrgUsers';
import orgServices from '../services/orgServices'

class orgUsersServices{
    

    async createUser(body){
        try {
            let User;
            if(!body.nome || !body.organizationId || !body.email) return {err: 'A User needs Name, Organization ID and Email!'}
            
            User = await OrgUsers.findOne({where:{email: body.email}})
            if(User) return {err: 'This email is already in use!'}

            const userOrganization = await orgServices.searchOrgById(body.organizationId);
            if(!userOrganization) return {err: 'No organization found with such ID'}
            
            User = await OrgUsers.create(body);
            return {msg:`User from Organization ${userOrganization.rsocial} created!`, nome: User.nome}
        
        } catch (error) {
            console.log(error);
            return {err: "BAD_CREATE_REQUEST"};
        }
    }

    async searchUserById(id){
        try {
            const searchRequest = await OrgUsers.findByPk(id);
            return searchRequest ? searchRequest : {err: "User not found!"};
        } catch (error) {
            console.log(error)
            return {err: "BAD_SEARCH_REQUEST"}
        }
    }

    async findUsersByOrganizationID(query){
        try {
            const userOrganization = await orgServices.searchOrgById(query.id);
            if(!userOrganization) return {err: 'No organization found with such ID'}

            const users = await this.findAllOrgUsers(query.id);
            
            if(users.length === 0) return {msg:`Organization ${userOrganization.rsocial} have no Users!`}
            return {msg: `Organization ${userOrganization.rsocial} have ${users.length} users!`, users: users}
        } catch (error) {
            console.log(error)
            return {err: "BAD_FIND_REQUEST"}
        }

    }

    async findAllOrgUsers(orgId){
        try {
            const users = await OrgUsers.findAll({where: {organization_id: orgId}})
            return users;
        } catch (error) {
            console.log(error)
            return {err: "BAD_FIND_REQUEST"}
        }
        
    }

    async deleteOneUser(query){
        try {
            const user = await this.searchUserById(query.id)
            if(user.err) return user;

            user.destroy()
            return {msg: 'User Deleted!', deletedId: query.id}

        } catch (error) {
            console.log(error)
            return{err: "BAD_DELETE_REQUEST"}
        }

    }
}

export default new orgUsersServices();