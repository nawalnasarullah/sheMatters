// PatientJournals.jsx
import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import theme from "../../components/Theme";

const PatientJournals = () => {
  const { state } = useLocation();
  const patient = state?.patient;
  const [selectedJournal, setSelectedJournal] = useState(null);

  if (!patient) return <Typography>No patient selected.</Typography>;
  console.log(patient.journals);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h5" color="primary.main" sx={{fontWeight: 600}} gutterBottom>
          Journals of {patient.firstName} {patient.lastName}
        </Typography>

        {patient.journals.length === 0 ? (
          <Typography>No journals available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {patient.journals.map((journal, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent={"space-between"} alignItems="center">
                        <Typography variant="h5" color="primary.main" sx={{ fontSize: "1rem" }}>
                      {new Date(journal.date).toLocaleDateString()}
                    </Typography>

                    <Typography variant="h5" color="primary.main" sx={{ fontSize: "1rem" }}>
                      {journal.day}
                    </Typography>
                    </Box>

                    <Typography color="primary.main" mt={1} sx={{ fontSize: "1rem" }}>
                      <strong>Title:</strong> {journal.title}
                    </Typography>

                    <Box mt={2} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        onClick={() => setSelectedJournal(journal)}
                      >
                        View Journal
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Journal Dialog */}
        <Dialog
          open={!!selectedJournal}
          onClose={() => setSelectedJournal(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontSize: "1.2rem", color: "primary.main", fontWeight: 600 }}>Journal Details</DialogTitle>
          <DialogContent dividers>
            {selectedJournal &&
              Object.entries(selectedJournal.content || {}).map(([key, value]) => (
                <Typography key={key} variant="h5" sx={{ fontSize: "0.95rem" }} mb={1}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </Typography>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedJournal(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default PatientJournals;
