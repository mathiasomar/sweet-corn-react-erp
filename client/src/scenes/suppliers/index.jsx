import { Alert, Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Popconfirm } from "antd";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deleteSupplier, fetchSuppliers } from "../../api/supplier";

const Suppliers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(data.message);
    },
  });

  const confirm = (id) => {
    createMutation.mutate(id);
  };
  const cancel = (e) => {
    console.log(e);
    toast.error("Process Cancelled");
  };

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

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
    },
    {
      field: "city",
      headerName: "City",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ({ row: { _id } }) => (
        <Box display="flex" alignItems="center" gap="3px" px="10px">
          <Link
            to={`/dashboard/edit-supplier/${_id}`}
            style={{
              color: colors.blueAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
              marginRight: "10px",
            }}
          >
            <EditOutlinedIcon />
          </Link>
          <Popconfirm
            title="Delete the supplier"
            description="Are you sure to delete this Supplier?"
            onConfirm={() => confirm(_id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="outlined" color="error">
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
        <Header title="Suppliers" subtitle="Managing suppliers" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/addsupplier")}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            add new supplier
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
            rows={suppliers}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            slotProps={{
              loadingOverlay: {
                variant: "linear-progress",
                noRowsVariant: "skeleton",
              },
            }}
            slots={{ toolbar: GridToolbar }}
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

export default Suppliers;
