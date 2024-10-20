import { Alert, Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import { Popconfirm } from "antd";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchPurchases } from "../../api/purchase";
import moment from "moment";

const Purchases = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  axios.defaults.headers.common["Authorization"] = token;

  //   const queryClient = useQueryClient();

  //   const createMutation = useMutation({
  //     mutationFn: deletePurchase,
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries({ queryKey: ["suppliers"] });
  //       toast.success(data.message);
  //     },
  //   });

  //   const confirm = (id) => {
  //     createMutation.mutate(id);
  //   };
  //   const cancel = (e) => {
  //     console.log(e);
  //     toast.error("Process Cancelled");
  //   };

  const {
    isLoading,
    isError,
    data: purchases,
    error,
  } = useQuery({
    queryKey: ["purchases"],
    queryFn: fetchPurchases,
    staleTime: 1000,
  });

  const columns = [
    {
      field: "ref",
      headerName: "REF N0",
      cellClassName: "name-column--cell",
    },
    {
      field: "supplierId",
      headerName: "Supplier",
      flex: 2,
      renderCell: ({ row: { supplierId } }) => <>{supplierId.name}</>,
    },
    {
      field: "pdate",
      headerName: "DATE",
      renderCell: ({ row: { pdate } }) => (
        <>{moment(pdate).format("YYYY-MM-DD")}</>
      ),
    },
    {
      field: "items",
      headerName: "ITEMS",
      flex: 1,
      renderCell: ({ row: { items } }) => <>{items.length}</>,
    },
    {
      field: "grandTotal",
      headerName: "Grand Total",
      renderCell: ({ row: { grandTotal } }) => <>{`Ksh.${grandTotal}`}</>,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 2,
      renderCell: ({ row: { createdAt } }) => (
        <>{moment(createdAt).format("YYYY-MM-DD HH:m")}</>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ({ row: { _id } }) => (
        <Box display="flex" alignItems="center" gap="3px" px="10px">
          <Link
            to={`/dashboard/view-purchase/${_id}`}
            style={{
              color: colors.greenAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
            }}
          >
            <VisibilityOutlinedIcon />
          </Link>
          <Link
            to={`/dashboard/edit-purchase/${_id}`}
            style={{
              color: colors.blueAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
              marginRight: "10px",
            }}
          >
            <EditOutlinedIcon />
          </Link>
          {/* <Popconfirm
            title="Delete the purchase"
            description="Are you sure to delete this Purchase?"
            onConfirm={() => confirm(_id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="outlined" color="error">
              <DeleteOutlineIcon />
            </Button>
          </Popconfirm> */}
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Purchases" subtitle="Managing purchases" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/addpurchase")}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            create new purchase
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
            rows={purchases}
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

export default Purchases;
