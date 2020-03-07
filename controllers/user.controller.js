const user= require('../models/user');

class UserController{
    async read(email, password){
        return await user.getUser(email,password);
    }

    async readAll(){
        return await user.getUsers();
    }

    findbyEmail(){
        return user.findByEmail();
    }

}

const userController = new UserController();

module.exports = userController;