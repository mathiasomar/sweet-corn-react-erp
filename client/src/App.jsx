import { Navigate, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Home from "./scenes/home";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geo from "./scenes/geo";
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
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/dashboard/user" element={<Users />} />
              <Route path="/dashboard/adduser" element={<AddUser />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/view-product/:id" element={<ViewProduct />} />
              <Route path="/dashboard/addproduct" element={<AddProduct />} />
              <Route path="/dashboard/edit-product/:id" element={<EditProduct />} />
              <Route path="/dashboard/purchases" element={<Purchases />} />
              <Route path="/dashboard/suppliers" element={<Suppliers />} />
              <Route path="/dashboard/addsupplier" element={<AddSupplier />} />
              <Route path="/dashboard/edit-supplier/:id" element={<EditSupplier />} />
              <Route path="/dashboard/contacts" element={<Contacts />} />
              <Route path="/dashboard/Invoices" element={<Invoices />} />
              <Route path="/dashboard/form" element={<Form />} />
              <Route path="/dashboard/bar" element={<Bar />} />
              <Route path="/dashboard/pie" element={<Pie />} />
              <Route path="/dashboard/line" element={<Line />} />
              <Route path="/dashboard/faq" element={<FAQ />} />
              <Route path="/dashboard/geo" element={<Geo />} />
              <Route path="/dashboard/calendar" element={<Calendar />} />
            </Route>
          </Routes>
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
