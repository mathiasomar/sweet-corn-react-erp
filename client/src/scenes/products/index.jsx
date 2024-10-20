import { useTheme } from "@emotion/react";
import { Alert, Box, Button } from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, fetchProducts } from "../../api/products";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
// import { useState } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// const ITEM_HEIGHT = 48;

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  axios.defaults.headers.common["Authorization"] = token;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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

  // const handleDelete = (id) => {
  //   createMutation.mutate(id);
  // };

  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
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
      field: "categoryId",
      headerName: "Category",
      flex: 1,
      renderCell: ({ row: { categoryId } }) => <>{categoryId.name}</>,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      renderCell: ({ row: { unitvalue, unit } }) => (
        <>
          {unitvalue === 1 && `${unitvalue}${unit}`}
          {unitvalue === 2 && `${unitvalue}${unit}`}
          {unitvalue === 5 && `${unitvalue}${unit}/(Bag)`}
          {unitvalue === 10 && `${unitvalue}${unit}/(Bag)`}
          {unitvalue === 45 && `${unitvalue}${unit}/(Bag)`}
          {unitvalue === 50 && `${unitvalue}${unit}/(Bag)`}
        </>
      ),
    },
    {
      field: "package",
      headerName: "Packaging",
      flex: 1,
      renderCell: ({ row: { package: pkt } }) => (
        <>
          {pkt === 1 && `${pkt}pc`}
          {pkt === 12 && `${pkt}pkts/(Bale)`}
          {pkt === 24 && `${pkt}pkts/(Bale)`}
        </>
      ),
    },
    {
      field: "sku",
      headerName: "SKU",
    },
    {
      field: "price",
      headerName: "Sale Price",
    },
    {
      field: "quantity",
      headerName: "Quantity",
    },
    {
      field: "discount",
      headerName: "Discount",
      renderCell: ({ row: { discount } }) => <>{discount}%</>,
    },
    {
      field: "vat",
      headerName: "VAT",
      renderCell: ({ row: { vat } }) => <>{vat}%</>,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ({ row: { _id } }) => (
        <Box display="flex" alignItems="center" gap="3px" px="10px">
          <Link
            to={`/dashboard/view-product/${_id}`}
            style={{
              color: colors.greenAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
            }}
          >
            <VisibilityOutlinedIcon />
          </Link>
          <Link
            to={`/dashboard/edit-product/${_id}`}
            style={{
              color: colors.blueAccent[500],
              textDecoration: "none",
              padding: "2px 5px",
            }}
          >
            <EditOutlinedIcon />
          </Link>
          {/* <Link
            to={`/dashboard/barcode/${_id}`}
            style={{
              color: colors.grey[100],
              textDecoration: "none",
              padding: "2px 5px"
            }}
          >
            <QrCodeOutlinedIcon />
          </Link> */}
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this Product?"
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
          {/* <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Button
                color={colors.grey[100]}
                onClick={() => navigate(`/dashboard/view-product/${_id}`)}
              >
                <VisibilityOutlinedIcon sx={{ mr: "0.5rem" }} /> View
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                color={colors.grey[100]}
                onClick={() => navigate(`/dashboard/edit-product/${_id}`)}
              >
                <EditOutlinedIcon sx={{ mr: "0.5rem" }} /> Edit
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                color={colors.grey[100]}
                onClick={() => navigate(`/dashboard/barcode/${_id}`)}
              >
                <QrCodeOutlinedIcon sx={{ mr: "0.5rem" }} /> barcode
              </Button>
            </MenuItem>
          </Menu> */}
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Products" subtitle="Managing the Products" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/addproduct")}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            add new product
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
          <Alert
          severity="error"
          className="mb-3"
        >
          {error.response.data.error}
        </Alert>
        ) : (
          <DataGrid
            rows={products}
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

export default Products;
