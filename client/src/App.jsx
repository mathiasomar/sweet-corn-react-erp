import { Navigate, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Home from "./scenes/home";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import Users from "./scenes/user";
import AddUser from "./scenes/user/AddUser";
import Products from "./scenes/products";
import ViewProduct from "./scenes/products/ViewProduct";
import AddProduct from "./scenes/products/AddProduct";
import EditProduct from "./scenes/products/EditProduct";
import Purchases from "./scenes/purchases";
import Suppliers from "./scenes/suppliers";
import AddSupplier from "./scenes/suppliers/AddSupplier";
import EditSupplier from "./scenes/suppliers/EditSupplier";
import ViewPurchase from "./scenes/purchases/ViewPurchase";
import AddPurchase from "./scenes/purchases/AddPurchase";

function App() {
  const [theme, colorMode] = useMode();
  const { isAuthenticated } = useAuth();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Login />}
            >
              <Route path="/dashboard" element={<Home />} />
              <Route path="/dashboard/user" element={<Users />} />
              <Route path="/dashboard/adduser" element={<AddUser />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route
                path="/dashboard/view-product/:id"
                element={<ViewProduct />}
              />
              <Route path="/dashboard/addproduct" element={<AddProduct />} />
              <Route
                path="/dashboard/edit-product/:id"
                element={<EditProduct />}
              />
              <Route path="/dashboard/suppliers" element={<Suppliers />} />
              <Route path="/dashboard/addsupplier" element={<AddSupplier />} />
              <Route
                path="/dashboard/edit-supplier/:id"
                element={<EditSupplier />}
              />
              <Route path="/dashboard/purchases" element={<Purchases />} />
              <Route
                path="/dashboard/view-purchase/:id"
                element={<ViewPurchase />}
              />
              <Route path="/dashboard/addpurchase" element={<AddPurchase />} />
            </Route>
          </Routes>
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
