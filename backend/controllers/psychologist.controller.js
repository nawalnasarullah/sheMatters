import { Psychologist } from "../models/psychologist.model.js";
import { v2 as cloudinary } from 'cloudinary';

export default class psychologistController {
  
  async createNewPsychologist(req, res, next) {

    const psychologist = req.body;
    try{
    await Psychologist.create(psychologist);

    // console.log(req.body);
      res.json({
        message: "New psychologists created successfully"
      });
    }catch(error){
      next(error);
    }
  }

  async getAllPsychologists(req, res, next) {
    try{
      const psychologists = await Psychologist.find();
      res.json({
        success: true,
        message: "List of all Psychologists",
        psychologists
      });
    }catch(error){
      next(error);
    }
  }

  async getPsychologist(req, res, next) {
    const {id} = req.query;
    try{
      const psychologist = await Psychologist.findById(id);
      res.json({
        message:"single psychologist called",
        psychologist
      });
    }catch(error){
      next(error);
    }
  }

  async getMe(req, res, next) {
    const id = req.user.id;
    console.log("getting psychologist :" , id);
    try{
      const psychologist = await Psychologist.findById(id);
      console.log("getting psychologist :" , psychologist);
      res.json({
        psychologist,
        success: true
      });
    }catch(error){
      console.log("error :" ,error)
      next(new Error(error));
    }
  }

  async updatePsychologist(req, res, next) {
    try{
      const data = req.body;
      const {id} = req.query;
      
      if(!id)
        return res.status(403).json({
          message : "missing id in query"
        })

      if( data.avatar){
        const imageURL = await cloudinary.uploader.upload(data.avatar , {folder : 'psychologist-avatars'})
        data.avatar = imageURL.secure_url
      }

      if(data.cnic_url){
        const imageURL = await cloudinary.uploader.upload(data.cnic_url , {folder : 'psychologist-cnics'})
        data.cnic_url = imageURL.secure_url
      }

      if(data.certification_url){
        const imageURL = await cloudinary.uploader.upload(data.certification_url , {folder : 'psychologist-certifications'})
        data.certification_url = imageURL.secure_url
      }

      const psychologist = await Psychologist.findByIdAndUpdate(id, data , {new : true});
      res.json({
        message: "Updated the psychologist",
        psychologist : psychologist
      });

    }catch(error){
      console.log("error updating psychologist : " , error)
      next(error);
    }
  }

  async deletePsychologist(req, res, next) {
    const {id} = req.query;
    try{
      const psychologist = await Psychologist.findByIdAndDelete(id);
      res.json({
        message: "Deleted the psychologist",
      });
    }catch(error){
      next(error);
    }
  }
}
