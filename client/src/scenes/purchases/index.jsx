import { Alert, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Popconfirm } from "antd";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deletePurchase, fetchPurchases } from "../../api/purchase";
import moment from "moment";
import { Tag } from "antd";
import { useState } from "react";

const Purchases = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success(data.message);
    },
  });

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
      field: "pdate",
      headerName: "DATE",
      renderCell: ({ row: { pdate } }) => (
        <>{moment(pdate).format("YYYY-MM-DD")}</>
      ),
    },
    {
      field: "ref",
      headerName: "Reference",
      cellClassName: "name-column--cell",
    },
    {
      field: "supplierId",
      headerName: "Supplier",
      flex: 2,
      renderCell: ({ row: { supplierId } }) => <>{supplierId.name}</>,
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
      renderCell: ({ row: { grandTotal } }) => (
        <>{`Ksh.${grandTotal.toLocaleString()}`}</>
      ),
    },
    {
      field: "paid",
      headerName: "Paid",
      renderCell: ({ row: { paid } }) => <>{`Ksh.${paid.toLocaleString()}`}</>,
    },
    {
      field: "due",
      headerName: "Due",
      renderCell: ({ row: { due } }) => <>{`Ksh.${due.toLocaleString()}`}</>,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <>
          {status === "pending" && <Tag color="warning">{status}</Tag>}
          {status === "ordered" && <Tag color="processing">{status}</Tag>}
          {status === "received" && <Tag color="success">{status}</Tag>}
        </>
      ),
    },
    {
      field: "purchaseStatus",
      headerName: "Payment Status",
      flex: 1,
      renderCell: ({ row: { purchaseStatus } }) => (
        <>
          {purchaseStatus === "unpaid" && (
            <Tag color="warning">{purchaseStatus}</Tag>
          )}
          {purchaseStatus === "paid" && (
            <Tag color="success">{purchaseStatus}</Tag>
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ({ row: { _id } }) => <ActionDropdown id={_id} />,
    },
  ];

  // Dropdown for each row's actions
  const ActionDropdown = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAction = (url) => {
      navigate(url + id);
      handleClose();
    };

    const confirm = () => {
      createMutation.mutate(id);
    };
    const cancel = (e) => {
      console.log(e);
      toast.error("Process Cancelled");
    };

    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleAction(`/dashboard/view-purchase/`)}>
              <VisibilityOutlinedIcon sx={{ mr: "0.6rem" }} /> View Purchase
            </MenuItem>
            <MenuItem onClick={() => handleAction(`/dashboard/edit-purchase/`)}>
              <EditOutlinedIcon sx={{ mr: "0.6rem" }} /> Edit Purchase
            </MenuItem>
            <MenuItem
              onClick={() => handleAction(`/dashboard/add-purchase-payment/`)}
            >
              <MoneyOutlinedIcon sx={{ mr: "0.6rem" }} /> Create Payment
            </MenuItem>
            <MenuItem
              onClick={() => handleAction(`/dashboard/purchase-return/`)}
            >
              <AssignmentReturnOutlinedIcon sx={{ mr: "0.6rem" }} /> Purchase
              Return
            </MenuItem>
          </Menu>
        </Box>

        <Popconfirm
          title="Delete the product"
          description="Are you sure to delete this Product?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button variant="outlined" color="error">
            <DeleteOutlineIcon />
          </Button>
        </Popconfirm>
      </Box>
    );
  };
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
