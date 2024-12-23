import React, { useState } from "react"
import { useSelector } from "react-redux"
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
} from "@mui/material"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { useFormik } from "formik"
import * as Yup from "yup"
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded"
import theme from "../components/Theme"
import { useUpdateUserMutation } from "../redux/api/authApi"
import { useDispatch } from "react-redux"
import { updateUserProfile } from "../redux/features/authSlice"
import { toast , ToastContainer } from "react-toastify"
function AccountInformation() {
  const dispatch = useDispatch()
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const { user } = useSelector((state) => state.auth)
  const [isDisabled, setIsDisabled] = useState(true)

  const toggleEdit = () => {
    setIsDisabled((state) => !state)
  }

  const parseDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${day}/${month}/${year}`;
  }

  let handleImageUpload = (image)=>{
    console.log(image.target.files[0])

    if(image.target.files[0].size > 5097152 ) //for 5MB 
    {
      console.log("Image size too large")
      formik.setFieldError("avatar" , "image size should not exceed 4MB")
      toast.error("Image size should not exceed 4MB")
      return
    }

    let reader = new FileReader()
    reader.readAsDataURL(image.target.files[0])

    reader.onload = () => {
      if(reader.readyState === 2)
      setFieldValue("avatar", reader.result)
    }
    
  }


  const {
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    errors,
    touched,
    values,
    setFieldValue
  } = useFormik({
    initialValues: {
      firstName: user?.user?.firstName || "",
      lastName: user?.user?.lastName || "",
      username: user?.user?.username || "",
      email: user?.user?.email || "",
      phoneNumber: user?.user?.phoneNumber || "",
      dateOfBirth: user?.user?.dateOfBirth ? parseDate(user.user.dateOfBirth) : "" ,
      city: user?.user?.city || "" ,
      about: user?.user?.about || "" ,
      avatar : user?.user?.avatar || "eee"
    },
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
      dateOfBirth: Yup.date(),
      city: Yup.string(),
      about: Yup.string(),
    }),
    onSubmit: async (values, errors) => {
      try {
        const res = await updateUser({ ...values, _id: user.user._id }).unwrap()
        dispatch(updateUserProfile({ user: res.user }))
        setIsDisabled(true)
        console.log("updated user info : ", res)
      } catch (err) {
        console.log("error : ", err)
      }
    },
  })

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
                  sx={{ width: 100, height: 100, marginStart: "auto" ,border: "2px solid #004654", }}
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
              {
                isDisabled ? <></> : <input type="file" onChange={handleImageUpload} placeholder="Avatar" style={{fontSize : '10px'}} />
              }
            </div>

            {/* Input Fields Section */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
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
                    sx={{
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
                    }}
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
                    sx={{
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
                    }}
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
                    sx={{
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
                    }}
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
                    sx={{
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
                    }}
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
                    sx={{
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
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="Date Of Birth"
                    variant="outlined"
                    fullWidth
                    name="dateOfBirth"
                    value={values.dateOfBirth}
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
                    sx={{
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
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={isDisabled}
                    label="City"
                    variant="outlined"
                    fullWidth
                    name="city"
                    value={values.city}
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
                    sx={{
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
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    disabled={isDisabled}
                    label="About"
                    variant="outlined"
                    fullWidth
                    multiline
                    name="about"
                    value={values.about}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                        onClick={toggleEdit}
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          <EditRoundedIcon
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "primary.dark",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white", // Keeps background white when focused
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: 0,
                        backgroundColor: "white", // Ensures the input always has a white background
                        "&:focus": {
                          backgroundColor: "white", // Keeps white background when typing
                        },
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px white inset", // Forces white background for autofill
                          backgroundColor: "white !important", // Ensures autofill stays white
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "15px",
                        color: "primary.main",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </form>
        </div>
        <ToastContainer/>
      </Box>
    </ThemeProvider>
  )
}

export default AccountInformation
