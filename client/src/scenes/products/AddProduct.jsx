import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  MenuItem,
  TextField,
  Collapse,
  Alert,
  IconButton,
  Checkbox,
  InputLabel,
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { useFormik } from "formik";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Modal } from "antd";
// import CategoryModal from "../../components/CategoryModal";
import { fetchCategories } from "../../api/category";
import { addProduct } from "../../api/products";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { fetchBrands } from "../../api/brand";
import { fetchUnits } from "../../api/unit";

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  categoryId: yup.string(),
  unit: yup.string(),
  price: yup.number().required("Price is required"),
});

const AddProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  // const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  // const showModal = () => {
  //   setOpenModal(true);
  // };

  // const handleOk = () => {
  //   setOpenModal(false);
  // };

  // const handleCancel = () => {
  //   setOpenModal(false);
  // };

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message);
      navigate("/dashboard/products");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: "",
      brandId: "",
      unitId: "",
      unitValue: 0,
      price: 0,
      stock: 0,
      sku: Math.floor(100000 + Math.random() * 900000),
      orderTax: 0,
      discount: 0,
      notForSale: false,
      imei: false,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate(values);
    },
  });

  const [categoryQuery, brandQuery, unitQuery] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000,
      },
      {
        queryKey: ["brands"],
        queryFn: fetchBrands,
        staleTime: 1000,
      },
      {
        queryKey: ["units"],
        queryFn: fetchUnits,
        staleTime: 1000,
      },
    ],
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
                label="Product Name"
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
              <Box display="flex" alignItems="flex-end" flexDirection="column">
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Category"
                  name="categoryId"
                  margin="normal"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {!categoryQuery.isLoading ? (
                    categoryQuery.data.map((cat, index) => (
                      <MenuItem key={index} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))
                  ) : (
                    <CircularProgress />
                  )}
                </TextField>
                {/* <Button
                  sx={{
                    p: "5px",
                    height: "100%",
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                  }}
                  variant="contained"
                  onClick={showModal}
                >
                  <AddOutlinedIcon />
                </Button>
                <CategoryModal
                  openModal={openModal}
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                /> */}
              </Box>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Brand"
                name="brandId"
                margin="normal"
                value={formik.values.brandId}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Brand</em>
                </MenuItem>
                {!brandQuery.isLoading ? (
                  brandQuery.data.map((brand, index) => (
                    <MenuItem key={index} value={brand._id}>
                      {brand.name}
                    </MenuItem>
                  ))
                ) : (
                  <CircularProgress />
                )}
              </TextField>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Unit"
                name="unitId"
                margin="normal"
                value={formik.values.unitId}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Unit</em>
                </MenuItem>
                {!unitQuery.isLoading ? (
                  unitQuery.data.map((unit, index) => (
                    <MenuItem key={index} value={unit._id}>
                      {unit.name}
                    </MenuItem>
                  ))
                ) : (
                  <CircularProgress />
                )}
              </TextField>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Unit Value"
                name="unitValue"
                margin="normal"
                value={formik.values.unitValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.unitValue && Boolean(formik.errors.unitValue)
                }
                helperText={formik.touched.unitValue && formik.errors.unitValue}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="SKU"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="sku"
                margin="normal"
                value={formik.values.sku}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Sale Price"
                name="price"
                margin="normal"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Stock"
                name="stock"
                margin="normal"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Discount(%)"
                name="discount"
                margin="normal"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="TAX(%)"
                name="orderTax"
                margin="normal"
                value={formik.values.orderTax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.orderTax && Boolean(formik.errors.orderTax)
                }
                helperText={formik.touched.orderTax && formik.errors.orderTax}
              />
            </Grid2>
            <Grid2 size={4}>
              <InputLabel>IMEI</InputLabel>
              <Checkbox
                type="checkbox"
                color={colors.primary[400]}
                name="imei"
                margin="normal"
                value={formik.values.imei}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.imei && Boolean(formik.errors.imei)}
                helperText={formik.touched.imei && formik.errors.imei}
              />
            </Grid2>
            <Grid2 size={4}>
              <InputLabel>Not for Sale</InputLabel>
              <Checkbox
                color={colors.primary[400]}
                type="checkbox"
                name="notForSale"
                margin="normal"
                value={formik.values.notForSale}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.notForSale && Boolean(formik.errors.notForSale)
                }
                helperText={
                  formik.touched.notForSale && formik.errors.notForSale
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                type="number"
                multiline
                rows={4}
                variant="filled"
                label="Description"
                name="description"
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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

export default AddProduct;
