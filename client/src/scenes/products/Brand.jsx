import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Alert, Box, Button } from "@mui/material";
import { Popconfirm } from "antd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { deleteBrand, fetchBrands } from "../../api/brand";

const Brand = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success(data.message);
    },
  });

  const confirm = (id) => {
    deleteMutation.mutate(id);
  };
  const cancel = (e) => {
    console.log(e);
    toast.error("Process Cancelled");
  };

  const {
    isLoading,
    isError,
    data: brands,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 1000,
  });

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ({ row: { _id } }) => (
        <Box display="flex" alignItems="center" gap="3px" px="10px">
          <Link
            to={`/dashboard/edit-brand/${_id}`}
            style={{
              color: colors.blueAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
            }}
          >
            <EditOutlinedIcon />
          </Link>
          <Popconfirm
            title="Delete the Brand"
            description="Are you sure to delete this brand?"
            onConfirm={() => confirm(_id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="outlined"
              color="error"
              // onClick={() => handleDelete(_id)}
            >
              <DeleteOutlineIcon />
            </Button>
          </Popconfirm>
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Brands" subtitle="Managing the Brands" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/addbrand")}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            add new brand
          </Button>
        </Box>
      </Box>

      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {isError ? (
          <Alert severity="error" className="mb-3">
            {error.response.data.error}
          </Alert>
        ) : (
          <DataGrid
            rows={brands}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            slotProps={{
              loadingOverlay: {
                variant: "linear-progress",
                noRowsVariant: "skeleton",
              },
            }}
            // slots={{ toolbar: GridToolbar }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        )}
      </Box>
    </Box>
  );
};

export default Brand;
