import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import {
  Alert,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import useLogin from "../../hooks/useLogin";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, error, loginUser } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      padding="40px"
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        // border={`0.7px solid ${colors.grey[100]}`}
        borderRadius="6px"
      >
        <Box width="50%">
          <img src="/assets/loginIcon.png" alt="" width="100%" />
        </Box>
        <Card variant="outlined" sx={{ width: "40%" }}>
          {error && (
            <Alert variant="outlined" sx={{ mx: 2, my: 2 }} severity="error">
              {error}
            </Alert>
          )}
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                mb="20px"
                sx={{
                  width: "100%",
                  color: colors.grey[100],
                  textAlign: "center",
                }}
              >
                Sign In
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                id="email"
                name="email"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                name="password"
                variant="outlined"
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
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                loading={loading}
              >
                Sign In
              </LoadingButton>
            </CardContent>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
