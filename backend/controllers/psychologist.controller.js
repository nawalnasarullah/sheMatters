import { Psychologist } from "../models/psychologist.model.js"
import { v2 as cloudinary } from "cloudinary"
import { User } from "../models/user.model.js"
import { Journal } from "../models/journal.model.js"
import mongoose from "mongoose"

export default class psychologistController {
  async createNewPsychologist(req, res, next) {
    const psychologist = req.body
    try {
      await Psychologist.create(psychologist)

      // console.log(req.body);
      res.json({
        message: "New psychologists created successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllPsychologists(req, res, next) {
    try {
      const psychologists = await Psychologist.find()
      res.json({
        success: true,
        message: "List of all Psychologists",
        psychologists,
      })
    } catch (error) {
      next(error)
    }
  }

  async getRecommendedPsychologist(req, res, next) {
    console.log("getting recommendations");
    
    try {
      const { id: userId } = req.query
      if(!userId || !mongoose.Types.ObjectId.isValid(userId)) 
        return res.status(404).json({ message: "missing or invalid id"})

      const user = await User.findById(userId)
      const userLabels = user.labels

      if (!userLabels || userLabels.length === 0) {
        const recommendations = await Psychologist.find({})
        return res.status(200).json({
          success: true,
          psychologists: recommendations,
        })
      }

      const pipeline = [
        {
          $match: {
            role: "psychologist",
          },
        },
        {
          $addFields: {
            commonLabels: {
              $setIntersection: ["$labels", userLabels],
            },
          },
        },
        {
          $addFields: {
            matchCount: {
              $size: "$commonLabels",
            },
          },
        },
        {
          $sort: {
            matchCount: -1, // Sort by match count in descending order
          },
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            username: 1,
            email: 1,
            labels: 1,
            avatar: 1,
            commonLabels: 1,
            matchCount: 1,
            experience: 1,
            fee: 1,
          },
        },
      ]

      const recommendations = await Psychologist.aggregate(pipeline);
      return res.status(200).json({
        success: true,
        psychologists: recommendations,
      })


    } catch (err) {
      console.log("error getting recommendations : ", err)
      return res.status(500).json({
        message : "error getting recommendations",
        success: false
      })
    }
  }

  async getPsychologist(req, res, next) {
    const { id } = req.query
    try {
      const psychologist = await Psychologist.findById(id)
      res.json({
        message: "single psychologist called",
        psychologist,
      })
    } catch (error) {
      next(error)
    }
  }

  async getMe(req, res, next) {
    const id = req.user.id

    try {
      const psychologist = await Psychologist.findById(id)
 
      res.json({
        psychologist,
        success: true,
      })
    } catch (error) {
      console.log("error :", error)
      next(new Error(error))
    }
  }

  async updatePsychologist(req, res, next) {
    try {
      const data = req.body
      const { id } = req.query

      if (!id)
        return res.status(403).json({
          message: "missing id in query",
        })

      if (data.avatar) {
        const imageURL = await cloudinary.uploader.upload(data.avatar, {
          folder: "psychologist-avatars",
        })
        data.avatar = imageURL.secure_url
      }

      if (data.cnic_url) {
        const imageURL = await cloudinary.uploader.upload(data.cnic_url, {
          folder: "psychologist-cnics",
        })
        data.cnic_url = imageURL.secure_url
      }

      if (data.certification_url) {
        const imageURL = await cloudinary.uploader.upload(
          data.certification_url,
          { folder: "psychologist-certifications" }
        )
        data.certification_url = imageURL.secure_url
      }

      const psychologist = await Psychologist.findByIdAndUpdate(id, data, {
        new: true,
      })
      res.json({
        message: "Updated the psychologist",
        psychologist: psychologist,
      })
    } catch (error) {
      console.log("error updating psychologist : ", error)
      next(error)
    }
  }

  async getPsychologistById(req, res, next) {
    try {
      const { id } = req.params; 
  

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid psychologist ID" });
      }
  
      const psychologist = await Psychologist.findById(id);

      if (!psychologist) {
        return res.status(404).json({ success: false, message: "Psychologist not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Psychologist details fetched successfully",
        psychologist,
      });
    } catch (error) {
      console.error("Error fetching psychologist by ID:", error);
      next(error);
    }
  }
  async deletePsychologist(req, res, next) {
    const { id } = req.query
    try {
      const psychologist = await Psychologist.findByIdAndDelete(id)
      res.json({
        message: "Deleted the psychologist",
      })
    } catch (error) {
      next(error)
    }
  }

  async getPatientsWithJournals (req, res, next) {
   try {
    const { psychologistId } = req.params;

    const psychologist = await Psychologist.findById(psychologistId);
    if (!psychologist) {
      return res.status(404).json({ message: "Psychologist not found", success: false });
    }

    const patientIds = psychologist.assignedPatients;

    const patients = await Promise.all(
      patientIds.map(async (userId) => {
        const user = await User.findById(userId).select("-password");
        const journals = await Journal.find({ user: userId }).sort({ createdAt: -1 });

        return {
          ...user.toObject(),
          journals,
        };
      })
    );

    return res.json({
      patients,
      message: "Patients with journals fetched successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
}
