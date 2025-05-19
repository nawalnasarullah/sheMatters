import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  ThemeProvider,
  Container,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import theme from "../../components/Theme";
import { useUpdatePsychologistMutation } from "../../redux/api/psychologistAuthApi";
import { useDispatch } from "react-redux";
import { setPsychologistInfo } from "../../redux/features/psychologistAuthSlice";
import { toast, ToastContainer } from "react-toastify";

const options = [
  "depression",
  "anxiety",
  "family issues",
  "self harm",
  "addiction",
  "sleep issues",
  "trauma",
  "menstrual health",
];

function AccountInformation() {
  const dispatch = useDispatch();
  const [updatePyschologist, { isLoading, isSuccess, isError, error }] =
    useUpdatePsychologistMutation();
  const { isAuthenticated, psychologist } = useSelector(
    (state) => state.psychologistAuth
  );

  console.log("psychologist : ", psychologist);

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(
    psychologist?.labels || []
  );

  useEffect(() => {
  if (psychologist?.labels) {
    setSelectedOptions(psychologist.labels);
  }
}, [psychologist]);

  const toggleEdit = () => {
    setIsDisabled((state) => !state);
  };

  const parseDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}/${month}/${year}`;
  };

  let handleImageUpload = (image) => {
    console.log(image);
    console.log(image.target.files[0]);
    const fieldName = image.target.name;

    if (image.target.files[0].size > 5097152) {
      //for 5MB
      console.log("Image size too large");
      formik.setFieldError(fieldName, "image size should not exceed 4MB");
      toast.error("Image size should not exceed 4MB");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);

    reader.onload = () => {
      if (reader.readyState === 2) setFieldValue(fieldName, reader.result);
    };
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedOptions((prev) => [...prev, name]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== name));
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: psychologist?.firstName || "",
      lastName: psychologist?.lastName || "",
      username: psychologist?.username || "",
      email: psychologist?.email || "",
      phoneNumber: psychologist?.phoneNumber || "",
      avatar: psychologist?.avatar || "",
      cnic_url: psychologist?.cnic_url || "",
      certification_url: psychologist?.certification_url || "",
      certification_url: psychologist?.certification_url || "",
      availability: psychologist?.availability || "",
      experience: psychologist?.experience || "",
      fee: psychologist?.fee || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("First Name is required")
        .trim(),
      lastName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("Last Name is required")
        .trim(),
      username: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid Username")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("Username is required")
        .trim(),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
        .trim(),
    }),
    onSubmit: async (values, errors) => {
      try {
        console.log("submission errors : ", errors);
        console.log(values);
        console.log("speciaiozliaiton : ", selectedOptions);
        const res = await updatePyschologist({
          ...values,
          labels: selectedOptions,
          _id: psychologist._id,
        }).unwrap();
        console.log("update response : ", res);
        dispatch(setPsychologistInfo({ psychologist: res.psychologist }));
        setIsDisabled(true);
        toast.success("Account information updated successfully!", {
          progressClassName: "toast-progress-success",
        });
      } catch (err) {
        console.log("error : ", err);
        toast.error("Failed to update account information. Please try again.");
      }
    },
  });

  if (!psychologist || !isAuthenticated) {
    console.log("not logged in");
    return <></>;
  }

  const inputstyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "&:hover fieldset": {
        borderColor: "primary.dark",
      },
      "&.Mui-focused": {
        backgroundColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px",
      backgroundColor: "white",
      "&:focus": {
        backgroundColor: "white",
      },
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0px 1000px white inset",
        backgroundColor: "white !important",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "15px",
      color: "primary.main",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography
          variant="h6"
          color="primary.main"
          fontWeight="bold"
          gutterBottom
        >
          Account Information
        </Typography>
        <div className="rounded-lg shadow-md p-6 bg-white">
          <form onSubmit={handleSubmit} className="px-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4 mb-6 ">
              <div className="flex items-center gap-4">
                <Avatar
                  src={values.avatar}
                  alt="Profile Picture"
                  sx={{
                    width: 100,
                    height: 100,
                    marginStart: "auto",
                    border: "2px solid #004654",
                  }}
                />
                <IconButton
                  onClick={toggleEdit}
                  sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                >
                  <EditRoundedIcon
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                        transition: "0.3s",
                      },
                    }}
                  />
                </IconButton>
              </div>
              {isDisabled ? (
                <></>
              ) : (
                <input
                  type="file"
                  name="avatar"
                  onChange={handleImageUpload}
                  placeholder="Avatar"
                  style={{ fontSize: "10px" }}
                />
              )}
            </div>

            {/* Input Fields Section */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
                            onClick={toggleEdit}
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="Fee per Session"
                    variant="outlined"
                    fullWidth
                    name="fee"
                    value={values.fee}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rupees</InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
                            onClick={toggleEdit}
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
                            onClick={toggleEdit}
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
                            onClick={toggleEdit}
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <VerifiedUserRoundedIcon
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <VerifiedUserRoundedIcon
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {!values.cnic_url ? (
                    <TextField
                      type="file"
                      disabled={isDisabled}
                      label="CNIC Picture"
                      variant="outlined"
                      fullWidth
                      name="cnic_url"
                      onChange={handleImageUpload}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            sx={{
                              "&:hover": { backgroundColor: "primary.light" },
                            }}
                          >
                            <EditRoundedIcon
                              onClick={toggleEdit}
                              sx={{
                                fontSize: "20px",
                                "&:hover": {
                                  color: "primary.main",
                                  transition: "0.3s",
                                },
                              }}
                            />
                          </IconButton>
                        ),
                      }}
                      sx={inputstyle}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <Typography variant="subtitle1" color="textSecondary">
                        Current CNIC Picture
                      </Typography>
                      <Box
                        component="img"
                        src={values.cnic_url} // Display the image preview
                        alt="CNIC Preview"
                        sx={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{ marginTop: 2 }}
                      >
                        Reupload CNIC Picture
                        <input
                          type="file"
                          hidden
                          name="cnic_url"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {!values.certification_url ? (
                    <TextField
                      type="file"
                      disabled={isDisabled}
                      label="Certification/Degree Picture"
                      variant="outlined"
                      fullWidth
                      name="certification_url"
                      onChange={handleImageUpload}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            sx={{
                              "&:hover": { backgroundColor: "primary.light" },
                            }}
                          >
                            <EditRoundedIcon
                              onClick={toggleEdit}
                              sx={{
                                fontSize: "20px",
                                "&:hover": {
                                  color: "primary.main",
                                  transition: "0.3s",
                                },
                              }}
                            />
                          </IconButton>
                        ),
                      }}
                      sx={inputstyle}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <Typography variant="subtitle1" color="textSecondary">
                        Current Certification/Degree Picture
                      </Typography>
                      <Box
                        component="img"
                        src={values.certification_url} // Display the image preview
                        alt="Certification/Degre Preview"
                        sx={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{ marginTop: 2 }}
                      >
                        Reupload Certification/Degree Picture
                        <input
                          type="file"
                          hidden
                          name="certification_url"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Select at least one Specialization:
                  </Typography>
                  <FormGroup
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 3fr 3fr",
                      gap: "12px",
                    }}
                  >
                    {options.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            name={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                              fontSize: "13px",
                              textTransform: "uppercase",
                            }}
                          >
                            {option}
                          </Typography>
                        }
                        sx={{
                          "& .MuiCheckbox-root": { color: "primary.main" },
                        }}
                      />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={12}>
                <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                    gutterBottom
                  >
                    About Your Experience:
                  </Typography>
                  <TextField
                    disabled={isDisabled}
                    label="About Your Experience"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    name="experience"
                    value={values.experience}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
                            onClick={toggleEdit}
                            sx={{
                              fontSize: "20px",
                              "&:hover": {
                                color: "primary.main",
                                transition: "0.3s",
                              },
                            }}
                          />
                        </IconButton>
                      ),
                    }}
                    sx={inputstyle}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </form>
        </div>
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
      </Box>
    </ThemeProvider>
  );
}

export default AccountInformation;
