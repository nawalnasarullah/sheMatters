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
import { toast, ToastContainer } from "react-toastify"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { questions } from "../components/Data"

const Pill = ({ text, active, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(text)}
      type="button"
      className={
        active
          ? `bg-[#FCEAEA] rounded-full px-4 py-2 flex items-center`
          : `bg-[gray] rounded-full px-4 py-2 flex items-center`
      }
    >
      <Typography variant="body1" fontWeight="bold" className="capitalize">
        {text.replace(/_/g, " ")}
      </Typography>
    </button>
  )
}

function AccountInformation() {
  const { user } = useSelector((state) => state.auth)
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()
  const all_labels = questions.map((q) => q.label)
  const [userNonLabels, setUserNonLabels] = useState(
    user?.user?.labels
      ? all_labels.filter((label) => !user.user.labels.includes(label))
      : []
  )

  const dispatch = useDispatch()
  const [isDisabled, setIsDisabled] = useState(true)

  const input_sx_prop = {
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
  }

  const toggleEdit = () => {
    setIsDisabled((state) => !state)
  }

  const parseDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    // Return the formatted date
    return `${day}/${month}/${year}`
  }

  let handleImageUpload = (image) => {
    console.log(image.target.files[0])

    if (image.target.files[0].size > 5097152) {
      //for 5MB
      console.log("Image size too large")
      formik.setFieldError("avatar", "image size should not exceed 5MB")
      toast.error("Image size should not exceed 5MB")
      return
    }

    let reader = new FileReader()
    reader.readAsDataURL(image.target.files[0])

    reader.onload = () => {
      if (reader.readyState === 2) setFieldValue("avatar", reader.result)
    }
  }

  const {
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: user?.user?.firstName || "",
      lastName: user?.user?.lastName || "",
      username: user?.user?.username || "",
      email: user?.user?.email || "",
      phoneNumber: user?.user?.phoneNumber || "",
      dateOfBirth: user?.user?.dateOfBirth
        ? parseDate(user.user.dateOfBirth)
        : null,
      city: user?.user?.city || "",
      about: user?.user?.about || "",
      avatar: user?.user?.avatar || "",
      labels: user?.user?.labels || [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Email format is incorrect"),

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

      phoneNumber: Yup.string().matches(
        /^(\+)?[0-9]{10,15}$/,
        "Phone Number format is incorrect"
      ), // 'Matches phone number with 10-15 digits and + is allowed'

      dateOfBirth: Yup.date()
        .required("Date is required")
        .max(new Date(), "Date cannot be in the future"),

      city: Yup.string(),
      about: Yup.string(),
    }),

    onSubmit: async (values, errors) => {
      try {
        const res = await updateUser({
          ...values,
          _id: user.user._id,
        }).unwrap()

        dispatch(updateUserProfile({ user: res.user }))
        setIsDisabled(true)
      } catch (err) {
        toast.error("Error updating information")
        console.log("Error updating User Information : ", err)
      }
    },
  })

  const handleAddLabelToUser = (new_label) => {
    if(isDisabled) return
    
    setFieldValue("labels", [...values.labels, new_label])
    setUserNonLabels((labels) =>
      userNonLabels.filter((label) => label != new_label)
    )
  }

  const handleRemoveLabelFromUser = (new_label) => {
    if(isDisabled) return

    setFieldValue(
      "labels",
      values.labels.filter((label) => label != new_label)
    )
    setUserNonLabels((labels) => [...labels, new_label])
  }

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
                  onChange={handleImageUpload}
                  placeholder="Avatar"
                  style={{ fontSize: "10px" }}
                />
              )}
            </div>

            {/* Input Fields Section */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    error={errors.username}
                    helperText={errors.username ? errors.username : " "}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.firstName}
                    helperText={errors.firstName ? errors.firstName : " "}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.lastName}
                    helperText={errors.lastName ? errors.lastName : " "}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.phoneNumber}
                    helperText={errors.phoneNumber ? errors.phoneNumber : " "}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.email}
                    helperText={errors.email ? errors.email : " "}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // value={ values.dateOfBirth && new Date()}
                      value={
                        values.dateOfBirth ? dayjs(values.dateOfBirth) : dayjs()
                      }
                      error={errors.dateOfBirth}
                      helperText={errors.dateOfBirth ? errors.dateOfBirth : " "}
                      label="Select a date"
                      name="dateOfBirth"
                      onChange={(val) => setFieldValue("dateOfBirth", val.$d)}
                      variant="outlined"
                      fullWidth
                      disabled={isDisabled}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: errors.dateOfBirth,
                          helperText: errors.dateOfBirth
                            ? errors.dateOfBirth
                            : " ",
                          sx: input_sx_prop,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.city}
                    helperText={errors.city ? errors.city : " "}
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
                    sx={input_sx_prop}
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
                    sx={input_sx_prop}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: 2,
                      minHeight: 100,
                    }}
                  >
                    <Box className="flex flex-wrap gap-4 mb-4">
                      {values.labels.map((label) => (
                        <Pill
                          key={label}
                          active={true}
                          text={label}
                          handleClick={handleRemoveLabelFromUser}
                        />
                      ))}
                    </Box>
                    <Box className="flex flex-wrap gap-4">
                      {userNonLabels.map((label) => (
                        <Pill
                          key={label}
                          active={false}
                          text={label}
                          handleClick={handleAddLabelToUser}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {isDisabled ? (
              <Button
                onClick={() => setIsDisabled(false)}
                type="submit"
                disabled={isLoading}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={() => setIsDisabled(true)}
                disabled={isLoading}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            )}
          </form>
        </div>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  )
}

export default AccountInformation
