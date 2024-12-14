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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Modal } from "antd";
import { fetchCategory, updateCategory } from "../../api/category";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = yup.object({
  name: yup.string().required("Category name is required"),
});

const EditCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const categoryQuery = useQuery({
    queryKey: ["categories", id],
    queryFn: () => fetchCategory(id),
  });

  const createMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message);
      navigate("/dashboard/category");
    },
  });

  const formik = useFormik({
    initialValues: {
      id: id,
      name: categoryQuery.isLoading ? "" : categoryQuery.data.name,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      createMutation.mutate({ id, ...values });
    },
  });
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Edit Category" subtitle="Update the Category" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/category")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            category list
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
                label="Category Name"
                name="name"
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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

export default EditCategory;
