import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  ThemeProvider,
} from "@mui/material";
import {
  useGetJournalByIdQuery,
  useUpdateJournalMutation,
} from "../redux/api/journalApi";
import theme from "../components/Theme";

function JournalDetails() {
  const { id } = useParams();

  const { data } = useGetJournalByIdQuery(id);
  console.log("sss", data);

  const [updateJournal] = useUpdateJournalMutation();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData(data.journal);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateJournal({ id, ...formData });
    alert("Journal updated successfully!");
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
          variant="h5"
          color="primary.main"
          fontWeight="bold"
          gutterBottom
        >
          Edit Journal
        </Typography>

        {formData && (
          <>
            <Grid container spacing={2}>
              {/* Left Side: Title */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                />
              </Grid>
              {/* Right Side: Day and Date */}
              <Grid item xs={12} md={6} justifyContent="flex-end">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      label="Date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
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
                      margin="normal"
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <TextField
              label="How am I feeling today?"
              name="feelings"
              value={formData.content.feelings}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: { ...prev.content, feelings: e.target.value },
                }))
              }
              fullWidth
              margin="normal"
              multiline
              rows={3}
              sx={inputStyle}
            />
            <TextField
              label="Tody I am grateful for"
              name="gratitude"
              value={formData.content.gratitude}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: { ...prev.content, gratitude: e.target.value },
                }))
              }
              fullWidth
              margin="normal"
              multiline
              rows={3}
              sx={inputStyle}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Daily Affirmations"
                  name="affirmations"
                  value={formData.content.affirmations}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        affirmations: e.target.value,
                      },
                    }))
                  }
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: { ...prev.content, smiles: e.target.value },
                    }))
                  }
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: { ...prev.content, reminders: e.target.value },
                }))
              }
              fullWidth
              multiline
              rows={3}
              className="mt-2"
              sx={inputStyle}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default JournalDetails;
