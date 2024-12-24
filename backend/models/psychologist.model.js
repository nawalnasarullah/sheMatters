import mongoose from "mongoose";
const { Schema } = mongoose;

const psychologistSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide the first name"],
    minLength: [3, "First name must have at least 3 characters in length"],
    maxLength: [50, "First name must have at most 50 characters in length"],
  },

  lastName: {
    type: String,
    required: [true, "Please provide the last name"],
    minLength: [3, "Last name must have at least 3 characters in length"],
    maxLength: [50, "Last name must have at most 50 characters in length"],
  },

  username: {
    type: String,
    required: [true, "Please provide the username"],
    minLength: [5, "Username must have at least 5 characters in length"],
    maxLength: [50, "Username must have at most 50 characters in length"],
    unique: true,
  },

  email: {
    required: [true, "Please provide the email"],
    type: String,
    min: [100, "Please set price more than 100"],
    max: [10000, "Price cannot exceed more than 10000"],
    unique: true,
  },
  
  password: {
    type: String,
    required: [true, "Please provide the password"],
  },

  phoneNumber: {
    type: String,
    default : null
  },

  roles: {
    type: String,
    default:'psychologist',
    enum:['user', 'customer', 'psychologist', 'administrator']
  },

  cnic: {
    type: String,
    required: [true, "Please provide the CNIC"],
    unique: true,
  },
  cnic_url : {
    type: String,
    default : null
  },
  certification_url : {
    type: String,
    default : null
  },
  labels : {
    type : [String],
    default : null
  },
  avatar : {
    type: String,
    default : null
  },
  assignedPatients : {
    type : [mongoose.Types.ObjectId],
    default : []
  },
  availability : {
    startHour : {
      type : String,
      default : '9'
    },
    endHour : {
      type : String,
      default : '15'
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export const Psychologist = mongoose.model("psychologist", psychologistSchema);
