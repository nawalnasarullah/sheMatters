
import AdminUserCard from './AdminUserCard';
import { useGetAllUsersQuery } from '../../redux/api/userApi';
import { Grid, Typography } from '@mui/material';

function UserOption() {
  const { data = [], isLoading } = useGetAllUsersQuery();
  const users = data.users || [];

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={2} p={2}>
      {users.map((u) => (
        <Grid item xs={12} sm={6} md={6} key={u._id}>
          <AdminUserCard user={u} />
        </Grid>
      ))}
    </Grid>
  );
}

export default UserOption;
