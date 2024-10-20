import { useTheme } from "@emotion/react";
import { Box, Collapse, IconButton, TextField } from "@mui/material";
import { Modal } from "antd";
import { tokens } from "../theme";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../api/category";
import toast from "react-hot-toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { Alert } from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Name is Required!"),
});

const CategoryModal = ({ openModal, handleOk, handleCancel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message);
      handleOk();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createMutation.mutate(values);
    },
  });
  return (
    <Modal
      title="Add Category"
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Box sx={{ color: colors.grey[100] }}>
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
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="filled"
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              mb: "1rem",
            }}
          />
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
    </Modal>
  );
};

export default CategoryModal;
