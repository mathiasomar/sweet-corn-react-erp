import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { fetchProduct } from "../../api/products";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  // Paper,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import moment from "moment";
// import { Image } from "antd";
import Barcode from "react-barcode";
import { Skeleton } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const ViewProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();

  const { id } = useParams();

  axios.defaults.headers.common["Authorization"] = token;

  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000,
  });

  // if (isLoading) return <span>Loading...</span>;
  // if (isError) return <span>{error}</span>;

  // console.log(product);
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Product" subtitle={`Viewing Product`} />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/products")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            product list
          </Button>
        </Box>
      </Box>

      {isError ? (
        <Alert severity="error" className="mb-3">
          {error.response.data.error}
        </Alert>
      ) : (
        <Box m="20px 0 0 0" height="75vh">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <Card variant="outlined">
              <Box width="100%" p="20px">
                <Grid2 container spacing={2} sx={{ mb: "1rem" }}>
                  <Grid2 size={6}>
                    <Box display="flex" flexDirection="column" gap="10px">
                      <Box width="100%">
                        <Divider textAlign="left">
                          <Typography variant="h5" color={colors.grey[100]}>
                            Specifications
                          </Typography>
                        </Divider>
                        <Box mt="10px" display="flex" alignItems="center">
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Name
                          </span>
                          <span style={{ width: "50%" }}>{product.name}</span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Category
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.categoryId.name}
                          </span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Unit
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.unitvalue === 1 &&
                              `${product.unitvalue}${product.unit}`}
                            {product.unitvalue === 2 &&
                              `${product.unitvalue}${product.unit}`}
                            {product.unitvalue === 5 &&
                              `${product.unitvalue}${product.unit}/(bag)`}
                            {product.unitvalue === 10 &&
                              `${product.unitvalue}${product.unit}/(bag)`}
                            {product.unitvalue === 45 &&
                              `${product.unitvalue}${product.unit}/(bag)`}
                            {product.unitvalue === 50 &&
                              `${product.unitvalue}${product.unit}/(bag)`}
                          </span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Packaging
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.package === 1 && `${product.package}pc`}
                            {product.package === 12 &&
                              `${product.package}pks/(Bale)`}
                            {product.package === 24 &&
                              `${product.package}pks/(Bale)`}
                          </span>
                        </Box>
                      </Box>
                      <Box width="100%">
                        <Divider textAlign="left">
                          <Typography variant="h5" color={colors.grey[100]}>
                            Product Pricing
                          </Typography>
                        </Divider>
                        <Box mt="10px" display="flex" alignItems="center">
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Selling Price
                          </span>
                          <span style={{ width: "50%" }}>
                            Ksh.{product.price}
                          </span>
                        </Box>
                      </Box>
                      <Box width="100%">
                        <Divider textAlign="left">
                          <Typography variant="h5" color={colors.grey[100]}>
                            Item Details
                          </Typography>
                        </Divider>
                        <Box mt="10px" display="flex" alignItems="center">
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            SKU
                          </span>
                          <span style={{ width: "50%" }}>{product.sku}</span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            VAT/Tax
                          </span>
                          <span style={{ width: "50%" }}>{product.vat}%</span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Discount
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.discount}%
                          </span>
                        </Box>
                        <Box
                          mt="10px"
                          display="flex"
                          alignItems="center"
                          gap="40px"
                        >
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Date
                          </span>
                          <span style={{ width: "50%" }}>
                            {moment(product.createdAt).format("DD-MM-YYYY")}
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Grid2>
                  <Grid2 size={6}>
                    <Box display="flex" flexDirection="column" gap="10px">
                      <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        {/* <Image
                        width={200}
                        height={200}
                        src={product.productimg}
                        fallback="data:image/png;base64,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"
                      /> */}
                        <Box>
                          <Typography variant="h5">BarCode</Typography>
                          <Box
                            width={200}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            sx={{
                              // backgroundColor: colors.grey[100],
                              padding: "0 1rem",
                            }}
                          >
                            {/* <img
                          src="/assets/barcode.png"
                          style={{ objectFit: "cover", width: "100%" }}
                          alt=""
                        /> */}
                            <Barcode value={product.sku} />
                          </Box>
                        </Box>
                      </Box>
                      <Box width="100%">
                        <Divider textAlign="left">
                          <Typography variant="h5" color={colors.grey[100]}>
                            Stock Details
                          </Typography>
                        </Divider>
                        <Box mt="10px" display="flex" alignItems="center">
                          <span
                            style={{ color: colors.grey[400], width: "50%" }}
                          >
                            Quantity
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.quantity}
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ViewProduct;
