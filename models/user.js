const DB = require('../db/DB');

class User extends DB {
    constructor() {
        super();
        this._model = {
            email: '',
            password: '',
            name: ''
        }
    }

    async getUser(email, password) {
        let user = null;
        let myUsers = await super.getJson('users');

        await myUsers.find(u => {
            if (u.email == email && u.password == password)
                user = u;
        })
        if (user) {
            this._model = user;
            return this._model;
        } else
            return null;

    }

    async getUsers() {
        return await super.getJson('users');
    }

     async findByEmail(email){
        let user = null;
        let myUsers= await super.getJson('users');
        myUsers.find( u => {
            if(u.email == email)
                user =u;
        })
        if (user) {
            this._model = user;
            return this._model;
        } else return user;
    }

    async getNumberofUsers(){
        let myUsers= await super.getJson('users');
        return myUsers.length;
    }

}

let user = new User();

module.exports = user;