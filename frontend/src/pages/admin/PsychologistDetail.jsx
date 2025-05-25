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
import { useUpdatePsychologistStatusMutation } from '../../redux/api/adminApi';
import { useGetPsychologistByIdQuery } from '../../redux/api/psychologistApi';
import { toast, ToastContainer } from 'react-toastify';

function PsychologistDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetPsychologistByIdQuery(id);
  const psychologist = data?.psychologist;
  const [updateStatus] = useUpdatePsychologistStatusMutation();

  const handleStatusChange = async (status) => {
    try {
      await updateStatus({ id, psychologistStatus: status }).unwrap();
      if (status === 'approved') {
        toast.success('Psychologist has been approved successfully!');
      }
      if (status === 'not approved') {
        toast.success('Psychologist has been rejected successfully!');
      }
    } catch (err) {
      toast.error('Something went wrong while updating status.');
    }
  };

  if (isLoading) return <CircularProgress sx={{ m: 5 }} />;
  if (error || !psychologist)
    return <Typography color="error">Error loading data</Typography>;

  return (
    <Box>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} mb={2}>
            <Avatar
              src={psychologist.avatar}
              alt="Profile"
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h5" color="primary">
                {psychologist.firstName} {psychologist.lastName}
              </Typography>
              <Typography sx={{ color: 'gray' }}>
                Status:{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                  }}
                >
                  {psychologist.psychologistStatus}
                </Box>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>Email:</strong> {psychologist.email}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: '15px' }}>
            <strong>Phone:</strong> {psychologist.phoneNumber}
          </Typography>

          {psychologist.labels?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '16px' }}>
                Specialties:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {psychologist.labels.map((label, index) => (
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

          {psychologist.experience && (
            <Box sx={{ my: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>
                About:
              </Typography>
              <Typography sx={{ fontSize: '15px' }} color="text.secondary">
                {psychologist.experience}
              </Typography>
            </Box>
          )}

          <Box sx={{ my: 2 }}>
            <Typography sx={{ fontSize: '15px' }}>
              <strong>CNIC:</strong>{' '}
              <a
                className="text-primary"
                href={psychologist.cnic_url}
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
                href={psychologist.certification_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleStatusChange('approved')}
                sx={{ mr: 2 }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleStatusChange('not approved')}
              >
                Not Approve
              </Button>
            </Box>

            <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
              ← Back
            </Button>
          </Box>
        </CardContent>
      </Card>
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
                      theme="light"/>
    </Box>
  );
}

export default PsychologistDetail;
