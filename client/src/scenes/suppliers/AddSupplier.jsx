import {
  Box,
  Button,
  Grid2,
  TextField,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Modal } from "antd";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { addSupplier } from "../../api/supplier";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid phone number format")
    .required("Phone number is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
});

const AddSupplier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  const queryClient = useQueryClient();
  axios.defaults.headers.common["Authorization"] = token;

  const createMutation = useMutation({
    mutationFn: addSupplier,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(data.message);
      navigate("/dashboard/suppliers");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate(values);
    },
  });
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="New Product" subtitle="Add New Product" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/products")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            product list
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
              {createMutation.error.response.data.error}
            </Alert>
          </Collapse>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2} sx={{ mb: "1rem" }}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Supplier Name"
                name="name"
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="Email Address"
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
                label="Phone Number"
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
                label="Country"
                name="country"
                margin="normal"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                variant="filled"
                label="City"
                name="city"
                margin="normal"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="filled"
                label="Address"
                name="address"
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
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
            Submit
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default AddSupplier;
