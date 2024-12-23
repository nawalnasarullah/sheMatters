import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  ThemeProvider,
  Grid,
} from "@mui/material";
import { useCreateJournalMutation } from "../redux/api/journalApi";
import theme from "../components/Theme";
import { useSelector } from "react-redux";

function Journal() {

  const {user} = useSelector(state => state.auth);
  console.log("Journal", user);
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
    user: user.user._id
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
    await createJournal({...formData, user: user.user._id});
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
      user: user.user._id
    });
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "&:hover fieldset": {
        borderColor: "primary.dark",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px",
      backgroundColor: "white",
      "&:focus": {
        backgroundColor: "white",
      },
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0px 1000px white inset",
        backgroundColor: "white !important",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "15px",
      color: "primary.main",
    },
    paddingBottom: "10px",
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white rounded-lg p-6 shadow">
        <Typography
          variant="h6"
          color="primary.main"
          fontWeight="bold"
          gutterBottom
        >
          Journal
        </Typography>
        {/* Layout for Title, Date, and Day */}
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Title Field */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              className="mt-2"
              sx={inputStyle}
            />
          </Grid>

          {/* Date and Day Fields */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Grid item xs={4}>
                <TextField
                  label="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                  className="mt-2"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  fullWidth
                  className="mt-2"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Feelings Field */}
        <TextField
          label="How am I feeling today?"
          name="feelings"
          value={formData.content.feelings}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={3}
          className="mt-2"
          sx={inputStyle}
        />

        <TextField
          label="Today I am grateful for"
          name="gratitude"
          value={formData.content.gratitude}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={3}
          className="mt-2"
          sx={inputStyle}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Daily Affirmations"
              name="affirmations"
              value={formData.content.affirmations}
              onChange={handleContentChange}
              fullWidth
              multiline
              rows={3}
              className="mt-2"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Things that make me smile"
              name="smiles"
              value={formData.content.smiles}
              onChange={handleContentChange}
              fullWidth
              multiline
              rows={3}
              className="mt-2"
              sx={inputStyle}
            />
          </Grid>
        </Grid>

        <TextField
          label="Notes/Reminders"
          name="reminders"
          value={formData.content.reminders}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={3}
          className="mt-2"
          sx={inputStyle}
        />

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="mt-4"
        >
          Save Journal
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default Journal;
