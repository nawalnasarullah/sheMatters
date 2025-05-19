// ClinicianPatients.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Box,
  ThemeProvider,
  Button,
} from "@mui/material";
import { useGetPatientsWithJournalsQuery } from "../../redux/api/psychologistApi";
import theme from "../../components/Theme";
import { useParams, useNavigate } from "react-router-dom";

function ClinicianPatients() {
  const { psychologistId } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } =
    useGetPatientsWithJournalsQuery(psychologistId);

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading patients.</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box >
        <Typography variant="h5" color="primary.main" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Assigned Patients
        </Typography>

        <Grid container spacing={3}>
          {data?.patients?.map((patient) => (
            <Grid item xs={12} md={6} lg={4} key={patient._id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ width: 50, height: 50 }} src={patient.avatar} />
                    <Box>
                      <Typography variant="h5" color="primary.main" sx={{ fontSize: "1.2rem"}} >
                        {patient.firstName} {patient.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {patient.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        @{patient.username}
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{ }}

                      onClick={() => navigate(`/clinician/dashboard/patient/${patient._id}/journals`, {
                        state: { patient }, 
                      })}
                    >
                      View Journals
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ClinicianPatients;
