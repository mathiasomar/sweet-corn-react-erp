import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { tokens } from "../../theme";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, fetchUsers } from "../../api/users";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { toast } from "react-hot-toast";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message, { duration: 1000 });
    },
  });

  const handleDelete = (id) => {
    deleteUserMutation.mutate(id);
  };

  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000,
  });

  if (isError) return console.log(error);

  const columns = [
    {
      field: "username",
      headerName: "NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => (
        <Box
          width="60%"
          m="0.5rem"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            role === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {role === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {role}
          </Typography>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id: id } }) => (
        <Box display="flex" alignItems="center" gap={2} p="5px" m="auto">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/dashboard/edit_user/${id}`)}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            <DeleteOutlinedIcon />
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Users" subtitle="Managing the Users Members" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/adduser")}
          >
            <AddOutlinedIcon sx={{ mr: "10px" }} />
            add new user
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
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "skeleton",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
