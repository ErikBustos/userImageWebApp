const user= require('../models/user');

class UserController{
    async read(email, password){
        return await user.getUser(email,password);
    }

    async readAll(){
        return await user.getUsers();
    }

    findbyEmail(email){
        return user.findByEmail(email);
    }

    async numberofUsers(){
        return await user.getNumberofUsers();
    }

}

const userController = new UserController();

module.exports = userController;