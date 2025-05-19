import React, { useEffect } from "react";
import { useGetJournalsQuery } from "../redux/api/journalApi";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import theme from "../components/Theme";

function AllJournals() {
  const { data } = useGetJournalsQuery();

  console.log("Journals data:", data);

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h5"
        color="primary.main"
        fontWeight="bold"
        gutterBottom
        sx={{fontSize: "1.4rem"}}
      >
        All Journals
      </Typography>
      <div>
        {data?.journals?.map((journal) => (
          <Card
            variant="outlined"
            sx={{
              borderRadius: "20px",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
              "&:hover": {backgroundColor: "secondary.main", borderColor: "secondary.main"},
              transition: "background-color 0.3s ease",
            }}
            key={journal._id}
            style={{
              marginBottom: "16px",
              padding: "16px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = `/dashboard/journal/${journal._id}`;
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              {/* Left: Day and Date */}
              <Grid item>
                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{ textTransform: "Uppercase", fontSize: "1rem" }}
                >
                  Date: {journal.date}
                </Typography>
                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{ textTransform: "Uppercase", fontSize: "1rem" }}
                >
                  Day: {journal.day}
                </Typography>
              </Grid>

              {/* Right: Title */}
              <Grid item>
                <Typography variant="h5"
                  color="primary.main"
                  sx={{ textTransform: "Uppercase", fontSize: "1rem" }}>
                  Title: {journal.title}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  );
}

export default AllJournals;
