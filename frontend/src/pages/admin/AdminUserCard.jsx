import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../../redux/api/userApi";
import { toast, ToastContainer } from "react-toastify";

function AdminUserCard({ user }) {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteUser(user._id).unwrap();
      toast.success("User deleted successfully!");
      navigate(0);
    } catch (error) {
      const errorMsg =
        error?.data?.message ||
        error?.message ||
        "Failed to delete user.";
      toast.error(errorMsg);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            alt="Profile Picture"
            src={user.avatar}
            sx={{ width: 100, height: 100 }}
          />

          <Box>
            <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography>

            <Typography
              sx={{ my: 1, fontSize: "16px", fontWeight: "600", color: "gray" }}
              variant="body2"
            >
              Email: {user.email}
            </Typography>

            <Typography
              sx={{ my: 1, fontSize: "16px", fontWeight: "600", color: "gray" }}
              variant="body2"
            >
              Phone: {user.phoneNumber}
            </Typography>

            <Typography variant="body2">
              <Box
                component="span"
                sx={{ fontWeight: 600, fontSize: "16px", color: "gray" }}
              >
                Username:{" "}
              </Box>
              <Box
                component="span"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  color: "primary.main",
                }}
              >
                {user.username}
              </Box>
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            navigate(`/admin/dashboard/users/${user._id}`)
          }
        >
          View
        </Button>
        <Button color="secondary" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Card>
  );
}

export default AdminUserCard;
