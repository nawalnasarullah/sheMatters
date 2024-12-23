import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  date: { 
    type: String,
    required: true
 },
  day: { 
    type: String,
    required: true 
},
  title: {
    type: String,
    required: true 
},
  category: { 
    type: String, 
    required: true 
},
  content: {
    feelings: { type: String, required: false },
    gratitude: { type: String, required: false },
    affirmations: { type: String, required: false },
    smiles: { type: String, required: false },
    reminders: { type: String, required: false },
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

export const Journal = mongoose.model("journal", journalSchema);
