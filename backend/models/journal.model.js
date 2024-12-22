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
    reminders: [
      {
        note: { type: String, required: true },
        done: { type: Boolean, default: false },
      },
    ],
  },
});

export const Journal = mongoose.model("journal", journalSchema);
