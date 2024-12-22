import React, { useState } from "react";
import { TextField, Button, Checkbox, Typography } from "@mui/material";
import { useCreateJournalMutation } from "../redux/api/journalApi";

function Journal() {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    title: "",
    category: "Personal",
    content: {
      feelings: "",
      gratitude: "",
      affirmations: "",
      smiles: "",
      reminders: [],
    },
  });

  const [createJournal] = useCreateJournalMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    await createJournal(formData);
    setFormData({
      date: "",
      day: "",
      title: "",
      category: "Personal",
      content: {
        feelings: "",
        gratitude: "",
        affirmations: "",
        smiles: "",
        reminders: [],
      },
    });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <Typography variant="h6">Create Journal Entry</Typography>
      <TextField
        label="Date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        className="mt-2"
      />
      <TextField
        label="Day"
        name="day"
        value={formData.day}
        onChange={handleChange}
        fullWidth
        className="mt-2"
      />
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        className="mt-2"
      />
      <TextField
        label="How am I feeling today?"
        name="feelings"
        value={formData.content.feelings}
        onChange={handleContentChange}
        fullWidth
        multiline
        rows={3}
        className="mt-2"
      />
      {/* Add more fields for gratitude, affirmations, smiles */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="mt-4"
      >
        Save Journal
      </Button>
    </div>
  );
};

export default Journal;
