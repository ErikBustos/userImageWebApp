const photo= require('../models/photo');

class PhotoController{
    async photosOfUser(id){
        return await photo.getPhotosofUser(id)
    }

    async readAll(){
        return await photo.getPhotos();
    }

    async uploadPhoto(photoJson){
        return await photo.postPhoto(photoJson);
    }

    async numberofPhotos(){
        return await photo.getNumberofPhotos();
    }

}

const photoController = new PhotoController();

module.exports = photoController;