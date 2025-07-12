
import AdminUserCard from './AdminUserCard';
import { useGetAllUsersQuery } from '../../redux/api/userApi';
import { Grid, Typography, CircularProgress } from '@mui/material';

function UserOption() {
  const { data = [], isLoading } = useGetAllUsersQuery();
  const users = data.users || [];

  if (isLoading) return <div className="flex justify-center items-center h-screen">
        <CircularProgress
          style={{ color: "var(--web-primary)" }}
          size={48}
          thickness={4}
        />
      </div>

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
