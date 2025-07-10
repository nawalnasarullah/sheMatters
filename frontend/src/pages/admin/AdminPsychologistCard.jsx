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
import { useDeletePsychologistMutation } from "../../redux/api/psychologistApi";
import { toast, ToastContainer } from "react-toastify";

function AdminPsychologistCard({ psychologist }) {
  const navigate = useNavigate();
  const [deletePsychologist] = useDeletePsychologistMutation();
  const handleDelete = async () => {
    try {
      const res = await deletePsychologist(psychologist._id).unwrap();
      toast.success("Psychologist deleted successfully!");
    } catch (error) {
      const errorMsg =
        error?.data?.message ||
        error?.message ||
        "Failed to delete psychologist.";
      toast.error(errorMsg);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            alt="Profile Picture"
            src={psychologist.avatar}
            sx={{ width: 100, height: 100 }}
          />

          <Box>
            <Typography variant="h5">
              {psychologist.firstName} {psychologist.lastName}
            </Typography>

            <Typography
              sx={{ my: 1, fontSize: "16px", fontWeight: "600", color: "gray" }}
              variant="body2"
            >
              Email: {psychologist.email}
            </Typography>

            <Typography
              sx={{ my: 1, fontSize: "16px", fontWeight: "600", color: "gray" }}
              variant="body2"
            >
              Phone: {psychologist.phoneNumber}
            </Typography>

            <Typography variant="body2">
              <Box
                component="span"
                sx={{ fontWeight: 600, fontSize: "16px", color: "gray" }}
              >
                Status:{" "}
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
                {psychologist.psychologistStatus}
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
            navigate(`/admin/dashboard/psychologists/${psychologist._id}`)
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

export default AdminPsychologistCard;
