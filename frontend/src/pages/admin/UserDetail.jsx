import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Avatar,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../redux/api/userApi';
import { toast, ToastContainer } from 'react-toastify';

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const user = data?.user;

  


  if (isLoading) return <div className="flex justify-center items-center h-screen">
        <CircularProgress
          style={{ color: "var(--web-primary)" }}
          size={48}
          thickness={4}
        />
      </div>
  if (error || !user)
    return <Typography color="error">Error loading data</Typography>;

  return (
    <Box>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} mb={2}>
            <Avatar
              src={user.avatar}
              alt="Profile"
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h5" color="primary">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography sx={{ color: 'gray' }}>
                Username:{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                  }}
                >
                  {user.username}
                </Box>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>Phone:</strong> {user.phoneNumber}
          </Typography>

           <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>City:</strong> {user.city}
          </Typography>

           <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>Date of Birth:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}
          </Typography>

          {user.labels?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '16px' }}>
                Issues:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {user.labels.map((label, index) => (
                  <Chip
                    sx={{ p: 0.5, fontSize: '15px', fontWeight: '600' }}
                    key={index}
                    label={label}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}


          {user.about && (
            <Box sx={{ my: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>
                About:
              </Typography>
              <Typography sx={{ fontSize: '15px' }} color="text.secondary">
                {user.about}
              </Typography>
            </Box>
          )}

          {/* <Box sx={{ my: 2 }}>
            <Typography sx={{ fontSize: '15px' }}>
              <strong>CNIC:</strong>{' '}
              <a
                className="text-primary"
                href={user.cnic_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CNIC
              </a>
            </Typography>
            <Typography sx={{ fontSize: '15px' }}>
              <strong>Certification:</strong>{' '}
              <a
                className="text-primary"
                href={user.certification_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            </Typography>
          </Box> */}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
            
                sx={{ mr: 2 }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
      
              >
                Not Approve
              </Button>
            </Box> */}

            <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
              ← Back
            </Button>
          </Box>
        </CardContent>
      </Card>
       {/* <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"/> */}
    </Box>
  );
}

export default UserDetail;
