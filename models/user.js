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
            if (u.email === email && u.password === password)
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

/*     async findByEmail(email, cb){
        let myUsers= await super.getJson('users');
        process.nextTick(function(){
            for(u in myUsers){
                if(u.email === email)
                    return cb(null, u);
            }
            return cb(null,null)
        })
    } */
    
}

let user = new User();

module.exports = user;