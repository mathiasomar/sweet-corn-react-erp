import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPurchase } from "../../api/purchase";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { fetchSuppliers } from "../../api/supplier";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const validationSchema = yup.object({
  categoryId: yup.string(),
  pdate: yup.date(),
  discount: yup.number().required("Discount is required"),
  tax: yup.number().required("Tax is required"),
  shipping: yup.number().required("Shipping is required"),
  status: yup.string(),
  note: yup.string(),
});

const AddPurchase = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();
  const [items, setItems] = useState([
    { name: "", quantity: "", unit: "", price: "" },
  ]);

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addPurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success(data.message);
      navigate("/dashboard/purchases");
    },
  });

  const formik = useFormik({
    initialValues: {
      ref: `PR_${Math.floor(100000 + Math.random() * 900000)}`,
      supplierId: "",
      pdate: "",
      discount: 0,
      tax: 0,
      shipping: 0,
      status: "pending",
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate({
        ref: values.ref,
        supplierId: values.supplierId,
        pdate: values.pdate,
        items: items,
        discount: values.discount,
        tax: values.tax,
        shipping: values.shipping,
        note: values.note,
        status: values.status,
      });
    },
  });

  const {
    isLoading,
    isError,
    data: suppliers,
    error,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
    staleTime: 1000,
  });

  if (isError) return toast.error(error.response.data.error);

  // Handle input changes for individual items
  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  // Handle adding a new item
  const addItem = () => {
    setItems([...items, { name: "", quantity: "", unit: "", price: "" }]);
  };
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="New Purchase" subtitle="Add New Purchase" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/purchases")}
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
                label="Ref"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                name="ref"
                margin="normal"
                value={formik.values.ref}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ref && Boolean(formik.errors.ref)}
                helperText={formik.touched.ref && formik.errors.ref}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Supplier"
                name="supplierId"
                margin="normal"
                value={formik.values.supplierId}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Supplier</em>
                </MenuItem>
                {!isLoading ? (
                  suppliers.map((sup, index) => (
                    <MenuItem key={index} value={sup._id}>
                      {sup.name}
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
                variant="filled"
                label="Date"
                type="date"
                name="pdate"
                margin="normal"
                value={formik.values.pdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pdate && Boolean(formik.errors.pdate)}
                helperText={formik.touched.pdate && formik.errors.pdate}
              />
            </Grid2>
            <Grid2 size={12}>
              <Divider textAlign="left">
                <Typography variant="h4">Item Details</Typography>
              </Divider>
            </Grid2>
            {items.map((item, index) => (
              <Grid2 container spacing={2} size={12} key={index}>
                <Grid2 size={3}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Item Name"
                    name="name"
                    margin="normal"
                    value={items.name}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Item Quantity"
                    type="number"
                    name="quantity"
                    margin="normal"
                    value={items.quantity}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Item Unit"
                    name="unit"
                    margin="normal"
                    value={items.unit}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Item Prince"
                    type="number"
                    name="price"
                    margin="normal"
                    value={items.price}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Grid2>
              </Grid2>
            ))}
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.blueAccent[700] }}
              onClick={addItem}
            >
              <AddOutlinedIcon /> Add
            </Button>
            <Grid2 size={12}>
              <Divider textAlign="left">
                <Typography variant="h4">Item View</Typography>
              </Divider>
            </Grid2>
            {/* <Grid2 size={12}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>Ksh.{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2> */}
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
                name="tax"
                margin="normal"
                value={formik.values.tax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tax && Boolean(formik.errors.tax)}
                helperText={formik.touched.tax && formik.errors.tax}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label="Shipping"
                name="shipping"
                margin="normal"
                value={formik.values.shipping}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.shipping && Boolean(formik.errors.shipping)
                }
                helperText={formik.touched.shipping && formik.errors.shipping}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Status"
                name="status"
                margin="normal"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="received">Received</MenuItem>
                <MenuItem value="ordered">Ordered</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                type="number"
                multiline
                rows={4}
                variant="filled"
                label="Note"
                name="note"
                margin="normal"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
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

export default AddPurchase;
