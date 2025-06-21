import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { useGetAllAppointmentsQuery, useDeleteAppointmentByIdMutation, useMarkAppointmentCompletedMutation } from '../../redux/api/appointmentApi';
import dayjs from 'dayjs';

const AdminAllAppointments = () => {
  const { data, isLoading, refetch } = useGetAllAppointmentsQuery();
  const [deleteAppointmentById] = useDeleteAppointmentByIdMutation();
  const [markAppointmentCompleted] = useMarkAppointmentCompletedMutation();

  if (isLoading) return <CircularProgress variant="soft" className="mx-auto mt-10" />;

  const appointments = data?.appointments || [];

  const handleCancel = async (id) => {
    try {
      await deleteAppointmentById(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Cancel failed:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await markAppointmentCompleted(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Complete failed:', error);
    }
  };

  const getStatusChip = (appointment) => {
    if (appointment.isCompleted) {
      return <Chip label="Completed" color="secondary" />;
    }
    return <Chip label="Scheduled" color="primary" />;
  };

  return (
    <Box>
      <Typography sx={{ mt: 2 }} color='primary' variant="h5" gutterBottom>
        All Appointments
      </Typography>

      <Grid container spacing={3}>
        {appointments.map((appt) => {
          const userName = `${appt.userData?.firstName || ''} ${appt.userData?.lastName || 'Unknown User'}`;
          const psychName = `${appt.psychologistData?.firstName || ''} ${appt.psychologistData?.lastName || ''}`.trim();
          const date = dayjs(appt.slotDate).format('MMM D, YYYY');
          const time = appt.slotTime;

          return (
            <Grid item xs={12} md={6} key={appt._id}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: '1.2rem' }} variant="h5">{userName} ↔ {psychName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {date}, Time: {time}
                  </Typography>
                  <Box mt={1}>{getStatusChip(appt)}</Box>
                </CardContent>
                <CardActions>
                  {!appt.isCompleted && (
                    <>
                      <Button onClick={() => handleComplete(appt._id)} color="primary" variant="contained">
                        Mark Completed
                      </Button>
                      <Button onClick={() => handleCancel(appt._id)} color="secondary" variant="contained">
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AdminAllAppointments;
