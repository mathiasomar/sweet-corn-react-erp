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
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQueries,
  //   useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { useFormik } from "formik";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Modal } from "antd";
import CategoryModal from "../../components/CategoryModal";
import { fetchCategories } from "../../api/category";
import { fetchProduct, updateProduct } from "../../api/products";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  categoryId: yup.string(),
  unit: yup.string(),
  package: yup.number().required("Package is required"),
  price: yup.number().required("Price is required"),
});

const EditProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  axios.defaults.headers.common["Authorization"] = token;

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const queryClient = useQueryClient();

  const [productQuery, categoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["products", id],
        queryFn: () => fetchProduct(id),
      },
      {
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000,
      },
    ],
  });

  const createMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      id: id,
      name: productQuery.isLoading ? "" : productQuery.data.name,
      categoryId: productQuery.isLoading
        ? ""
        : productQuery.data.categoryId._id,
      unitvalue: productQuery.isLoading ? "" : productQuery.data.unitvalue,
      unit: productQuery.isLoading ? "" : productQuery.data.unit,
      package: productQuery.isLoading ? "" : productQuery.data.package,
      price: productQuery.isLoading ? "" : productQuery.data.price,
      quantity: productQuery.isLoading ? "" : productQuery.data.quantity,
      sku: productQuery.isLoading ? "" : productQuery.data.sku,
      discount: productQuery.isLoading ? "" : productQuery.data.discount,
      vat: productQuery.isLoading ? "" : productQuery.data.vat,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate({ id, ...values });
    },
  });

  if (categoryQuery.isError)
    return <p>{categoryQuery.error.response.data.error}</p>;
  if (productQuery.isError)
    return <p>{productQuery.error.response.data.error}</p>;
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
                <Button
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
                />
              </Box>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Unit Value"
                name="unitvalue"
                margin="normal"
                value={formik.values.unitvalue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.unitvalue && Boolean(formik.errors.unitvalue)
                }
                helperText={formik.touched.unitvalue && formik.errors.unitvalue}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                select
                variant="filled"
                label="Unit"
                name="unit"
                margin="normal"
                value={formik.values.unit}
                onChange={formik.handleChange}
              >
                <MenuItem value="Kg">Kg</MenuItem>
                <MenuItem value="grams">grams</MenuItem>
                <MenuItem value="bale">Bale</MenuItem>
                <MenuItem value="Kg Bag">Kg Bag</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Package"
                name="package"
                margin="normal"
                value={formik.values.package}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.package && Boolean(formik.errors.package)}
                helperText={formik.touched.package && formik.errors.package}
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
                label="Product Price"
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
                label="Quantity"
                name="quantity"
                margin="normal"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
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
                label="VAT(%)"
                name="vat"
                margin="normal"
                value={formik.values.vat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vat && Boolean(formik.errors.vat)}
                helperText={formik.touched.vat && formik.errors.vat}
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
