import { Psychologist } from "../models/psychologist.model.js";

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
    // console.log(id);
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
    const id = req.psychologist.id;
    console.log(id);
    try{
      const psychologist = await Psychologist.findById(id);
      res.json({
        psychologist,
        success: true
      });
    }catch(error){
      next(new Error(error));
    }
  }

  async updatePsychologist(req, res, next) {
    const body = req.body;
    const {id} = req.query;
    try{
      const psychologist = await Psychologist.findByIdAndUpdate(id, body);
      res.json({
        message: "Updated the psychologist",
      });
    }catch(error){
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
