import { useGetAllPsychologistsQuery } from '../../redux/api/psychologistApi';
import AdminPsychologistCard from './AdminPsychologistCard';
import { Grid, Typography } from '@mui/material';

function PsychologistOption() {
  const { data = [], isLoading } = useGetAllPsychologistsQuery();
  const psychologists = data.psychologists || [];

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={2} p={2}>
      {psychologists.map((p) => (
        <Grid item xs={12} sm={6} md={6} key={p._id}>
          <AdminPsychologistCard psychologist={p} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PsychologistOption;
