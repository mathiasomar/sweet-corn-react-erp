import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/styles";
// import "../../../node_modules/react-pro-sidebar/dist/styles";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import DataArrayOutlinedIcon from "@mui/icons-material/DataArrayOutlined";
import { useAuth } from "../../contexts/AuthContext";

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);

  const { userData } = useAuth();

  return (
    <Box
    // sx={{
    //   "& .pro-sidebar-inner": {
    //     background: `${colors.primary[800]} !important`,
    //   },
    //   "& .pro-icon-wrapper": {
    //     background: "transparent !important",
    //   },
    //   "& .pro-inner-item": {
    //     padding: "5px 35px 5px 20px !important",
    //   },
    //   "& .pro-inner-item:hover": {
    //     color: "#868dfb !important",
    //   },
    //   "& .pro-menu-item.active": {
    //     color: "#6870fa !important",
    //   },
    // }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{ height: "100vh", border: "none" }}
        backgroundColor={`${colors.primary[400]} !important`}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            root: {
              fontSize: "13px",
              fontWeight: 400,
            },
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                // backgroundColor: "#13395e",
                // color: "#b6c8d9",
                color: colors.blueAccent[600],
              },
              [`&:hover`]: {
                backgroundColor: colors.grey[800],
                color: colors.primary[100],
              },
              color: colors.grey[100],
              // borderRadius: "10px",
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
          >
            {!isCollapsed ? (
              <Typography variant="h4" color={colors.grey[100]}>
                ADMIN
              </Typography>
            ) : undefined}
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
            </IconButton>
          </Box>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="20px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={`../../assets/user.png`}
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData.name}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {userData.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}

          <Box padding={isCollapsed ? undefined : "0 5%"}>
            <MenuItem
              component={<NavLink to="/dashboard" />}
              icon={<HomeOutlinedIcon />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={<NavLink to="/pos" />}
              icon={<DataArrayOutlinedIcon />}
            >
              POS
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "0 10%" }}
            >
              Data
            </Typography>
            <MenuItem
              component={<NavLink to="/dashboard/user" />}
              icon={<PeopleOutlinedIcon />}
            >
              Manage Users
            </MenuItem>
            <SubMenu label="Inventory" icon={<InventoryOutlinedIcon />}>
              <MenuItem
                component={<NavLink to="/dashboard/products" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Products
              </MenuItem>
              <MenuItem
                component={<NavLink to="/dashboard/category" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Category
              </MenuItem>
              <MenuItem
                component={<NavLink to="/dashboard/brand" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Brand
              </MenuItem>
              <MenuItem
                component={<NavLink to="/dashboard/unit" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Unit
              </MenuItem>
            </SubMenu>
            <SubMenu label="Purchases" icon={<ReceiptOutlinedIcon />}>
              <MenuItem
                component={<NavLink to="/dashboard/purchases" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Purchases
              </MenuItem>
              <MenuItem
                component={<NavLink to="/dashboard/suppliers" />}
                style={{ backgroundColor: colors.primary[400] }}
              >
                Suppliers
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<NavLink to="/dashboard/contacts" />}
              icon={<ContactsOutlinedIcon />}
            >
              Contacts
            </MenuItem>
            <MenuItem
              component={<NavLink to="/invoices" />}
              icon={<ReceiptOutlinedIcon />}
            >
              Invoice Balances
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "0 10%" }}
            >
              Pages
            </Typography>
            <MenuItem
              component={<NavLink to="/form" />}
              icon={<PersonOutlinedIcon />}
            >
              Profile Form
            </MenuItem>
            <MenuItem
              component={<NavLink to="/calendar" />}
              icon={<CalendarTodayOutlinedIcon />}
            >
              Calendar
            </MenuItem>
            <MenuItem
              component={<NavLink to="/faq" />}
              icon={<HelpOutlinedIcon />}
            >
              FAQ Page
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "0 10%" }}
            >
              Charts
            </Typography>
            <MenuItem
              component={<NavLink to="/bar" />}
              icon={<BarChartOutlinedIcon />}
            >
              Bar Chart
            </MenuItem>
            <MenuItem
              component={<NavLink to="/pie" />}
              icon={<PieChartOutlinedIcon />}
            >
              Pie Chart
            </MenuItem>
            <MenuItem
              component={<NavLink to="/line" />}
              icon={<TimelineOutlinedIcon />}
            >
              Line Chart
            </MenuItem>
            <MenuItem
              component={<NavLink to="/geo" />}
              icon={<MapOutlinedIcon />}
            >
              Geography Chart
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
