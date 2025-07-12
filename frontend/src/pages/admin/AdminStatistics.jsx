import { Box, Typography, CircularProgress, Paper, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useGetAllAppointmentsQuery } from "../../redux/api/appointmentApi";

const COLORS = ["#005c65", "#f8cccc", "#acacac"];

function AdminStatistics() {
  const { data, isLoading } = useGetAllAppointmentsQuery();
  console.log("AdminDashboardMain data:", data);

  if (isLoading) return <div className="flex justify-center items-center h-screen">
        <CircularProgress
          style={{ color: "var(--web-primary)" }}
          size={48}
          thickness={4}
        />
      </div>

  const appointments = data?.appointments || [];


  const countMap = {};
  const revenueMap = {};

  appointments.forEach((appt) => {
    const fullName = `${appt.psychologistData?.firstName || "Unknown"} ${
      appt.psychologistData?.lastName || ""
    }`.trim();
    const fee = appt.psychologistData?.fee || 0;

    if (!countMap[fullName]) countMap[fullName] = 0;
    if (!revenueMap[fullName]) revenueMap[fullName] = 0;

    countMap[fullName]++;

    revenueMap[fullName] += fee; // if apt.payment === true
  });

  const appointmentChartData = Object.entries(countMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const revenueChartData = Object.entries(revenueMap).map(([name, value]) => ({
    name,
    value,
  }));

  const mostProfitable = Object.entries(revenueMap).reduce(
    (acc, [name, value]) => (value > acc.value ? { name, value } : acc),
    { name: "N/A", value: 0 }
  );

  return (
    <Box>
      <Typography color="primary" variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem", textAlign: "center" }}
              variant="h5"
              gutterBottom
            >
              Appointments Per Psychologist
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <PieChart width={290} height={290}>
                <Pie
                  data={appointmentChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {appointmentChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem", textAlign: "center" }}
              variant="h5"
              gutterBottom
            >
              Revenue Per Psychologist
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <PieChart width={290} height={290}>
                <Pie
                  data={revenueChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {revenueChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography sx={{ fontSize: "1rem" }} variant="h5">
              Most Profitable Psychologist: {mostProfitable.name} (Rs.{" "}
              {mostProfitable.value})
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminStatistics;
