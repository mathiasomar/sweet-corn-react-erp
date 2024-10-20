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
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  //   useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Modal } from "antd";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { fetchSupplier, updateSupplier } from "../../api/supplier";

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

const EditProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const supplierQuery = useQuery({
    queryKey: ["suppliers", id],
    queryFn: () => fetchSupplier(id),
  });

  const createMutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      id: id,
      name: supplierQuery.isLoading ? "" : supplierQuery.data.name,
      email: supplierQuery.isLoading ? "" : supplierQuery.data.email,
      phone: supplierQuery.isLoading ? "" : supplierQuery.data.phone,
      country: supplierQuery.isLoading ? "" : supplierQuery.data.country,
      city: supplierQuery.isLoading ? "" : supplierQuery.data.city,
      address: supplierQuery.isLoading ? "" : supplierQuery.data.address,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate({ id, ...values });
    },
  });

  if (supplierQuery.isError)
    return <p>{supplierQuery.error.response.data.error}</p>;
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Edit Product" subtitle="Update Product Details" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/suppliers")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            suppliers list
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

export default EditProduct;
