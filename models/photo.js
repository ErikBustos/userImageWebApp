const DB = require('../db/DB');

class Photo extends DB{
    constructor(){
        super();
        this._model= {
            url: '',
            description: '',
            uploadDate: '',
            fileName: ''
        }
    }

    async postPhoto(photoJson){
        return await super.postJson('photos',photoJson);
    }

    async getPhotosofUser(id){
        let userPhotos= [];
        let myPhotos = await super.getJson('photos');
        for(let p of myPhotos){
            if(p.userId === id)
                userPhotos.push(p);
        }

        return userPhotos;
    }

    async getPhotos(){
        return await super.getJson('photos')
    }

}


let photo = new Photo();

module.exports = photo;

