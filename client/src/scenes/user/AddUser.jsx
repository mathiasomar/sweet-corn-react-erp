import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid2,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as yup from "yup";
// import useAddUser from "../../hooks/useAddUser";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../api/users";
import { toast } from "react-hot-toast";

const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid phone number format")
    .required("Phone number is required"),
  password: yup.string().required("Password is required"),
  passwordConf: yup.string().required("Confirm Password is required"),
  role: yup.string(),
});

const AddUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  //   const [passError, setPassError] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message);
      navigate("/dashboard/user");
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      passwordConf: "",
      role: "admin",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.passwordConf) {
        return toast.error("Password do not match!");
      }
      createMutation.mutate(values);
    },
  });

  //   if (createMutation.isSuccess) return toast.success("User added successfully");

  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="New User" subtitle="Add New User Member" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/user")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            user list
          </Button>
        </Box>
      </Box>

      <Box m="20px 0 0 0" height="75vh">
        {createMutation.error ? (
          <Collapse in={open}>
            <Alert
              severity="error"
              className="mb-3"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseOutlinedIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {createMutation.error.response.data.message}
            </Alert>
          </Collapse>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2} sx={{ mb: "1rem" }}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                name="username"
                margin="normal"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                name="email"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Phone"
                name="phone"
                margin="normal"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="New Password"
                name="password"
                type="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Confirm Password"
                name="passwordConf"
                type="password"
                margin="normal"
                value={formik.values.passwordConf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordConf &&
                  Boolean(formik.errors.passwordConf)
                }
                helperText={
                  formik.touched.passwordConf && formik.errors.passwordConf
                }
              />
            </Grid2>
            <Grid2 size={4}>
              {/* <FormControl variant="filled" fullWidth margin="normal">
                <InputLabel id="demo-simple-select-filled-label">
                  Role
                </InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
                //   error={formik.touched.role && Boolean(formik.errors.role)}
                //   helperText={formik.touched.role && formik.errors.role}
                >
                  <MenuItem component="option" value="admin" selected>
                    Admin
                  </MenuItem>
                  <MenuItem component="option" value="user">
                    User
                  </MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Role"
                name="role"
                margin="normal"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>

          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            loading={createMutation.isLoading}
            sx={{ backgroundColor: colors.greenAccent[700] }}
          >
            Sign In
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default AddUser;
