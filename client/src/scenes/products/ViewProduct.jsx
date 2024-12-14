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
import { Image, Skeleton } from "antd";
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
                            Brand
                          </span>
                          <span style={{ width: "50%" }}>
                            {product.brandId.name}
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
                            {product.unitValue}
                            {product.unitId.shortname}
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
                            Stock
                          </span>
                          <span style={{ width: "50%" }}>{product.stock}</span>
                        </Box>
                      </Box>
                      <Box width="100%">
                        <Divider textAlign="left">
                          <Typography variant="h5" color={colors.grey[100]}>
                            Product Images
                          </Typography>
                        </Divider>
                        <Grid2 container spacing={2} sx={{ mt: 2 }}>
                          <Grid2 size={3}>
                            <Box
                              backgroundColor={colors.greenAccent[500]}
                              p={1}
                              borderRadius="5px"
                            >
                              <Image src="../../assets/loginIcon.png" />
                            </Box>
                          </Grid2>
                          <Grid2 size={3}>
                            <Box
                              backgroundColor={colors.greenAccent[500]}
                              p={1}
                              borderRadius="5px"
                            >
                              <Image src="../../assets/loginIcon.png" />
                            </Box>
                          </Grid2>
                          <Grid2 size={3}>
                            <Box
                              backgroundColor={colors.greenAccent[500]}
                              p={1}
                              borderRadius="5px"
                            >
                              <Image src="../../assets/loginIcon.png" />
                            </Box>
                          </Grid2>
                          <Grid2 size={3}>
                            <Box
                              backgroundColor={colors.greenAccent[500]}
                              p={1}
                              borderRadius="5px"
                            >
                              <Image src="../../assets/loginIcon.png" />
                            </Box>
                          </Grid2>
                        </Grid2>
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
