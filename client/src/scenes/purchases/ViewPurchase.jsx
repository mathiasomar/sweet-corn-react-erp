import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Paper,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
// import moment from "moment";
// import { Image } from "antd";
import { Skeleton } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { fetchPurchase } from "../../api/purchase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ViewPurchase = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { token } = useAuth();
  const contentRef = useRef();

  const { id } = useParams();

  axios.defaults.headers.common["Authorization"] = token;

  const {
    isLoading,
    isError,
    data: purchase,
    error,
  } = useQuery({
    queryKey: ["purchases", id],
    queryFn: () => fetchPurchase(id),
    staleTime: 1000,
  });
  // if (isLoading) return <span>Loading...</span>;
  // if (isError) return <span>{error}</span>;

  // console.log(product);

  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <Box m="20px">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Purchase" subtitle={`Viewing Purchase`} />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/dashboard/purchases")}
          >
            <FormatListBulletedOutlinedIcon sx={{ mr: "10px" }} />
            purchase list
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
              <Box
                mb="30px"
                display="flex"
                alignItems="center"
                gap="10px"
                padding="20px"
              >
                <ButtonGroup>
                  <PDFDownloadLink
                    document={<PdfDocument purchase={purchase} />}
                    fileName="purchase-invoice.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading content..."
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: colors.blueAccent[400] }}
                        >
                          <PictureAsPdfOutlinedIcon /> PDF
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: colors.greenAccent[400] }}
                    onClick={reactToPrintFn}
                  >
                    <PrintOutlinedIcon /> print
                  </Button>
                </ButtonGroup>
              </Box>
              <Box width="100%" p="10px" ref={contentRef}>
                <Typography variant="h3" align="center">
                  {/* Ref N0: {purchase.ref} */}
                  SWEET CORN MILLERS LTD
                </Typography>
                <hr style={{ margin: "3rem 0" }} />
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h5" fontWeight="bold">
                      Supplier Info
                    </Typography>
                    <Typography variant="body1">
                      Name: {purchase.supplierId.name}
                    </Typography>
                    <Typography variant="body1">
                      Email: {purchase.supplierId.email}
                    </Typography>
                    <Typography variant="body1">
                      Phone: {purchase.supplierId.phone}
                    </Typography>
                    <Typography variant="body1">
                      Address: {purchase.supplierId.address}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h5" fontWeight="bold">
                      Company Info
                    </Typography>
                    <Typography variant="body1">
                      Name: Sweet Corn Millers Ltd
                    </Typography>
                    <Typography variant="body1">
                      Email: info@sweetcorn.com
                    </Typography>
                    <Typography variant="body1">Phone: 0754000666</Typography>
                    <Typography variant="body1">
                      Address: Ruiru, Kenya
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h5" fontWeight="bold">
                      Purchase Info
                    </Typography>
                    <Typography variant="body1">
                      Reference: {purchase.ref}
                    </Typography>
                    <Typography variant="body1">
                      Status: {purchase.status}
                    </Typography>
                    <Typography variant="body1">
                      Payment Status: {purchase.purchaseStatus}
                    </Typography>
                  </Box>
                </Box>

                <Box mt="30px">
                  <Typography variant="h3">Items Summary</Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {purchase.items.map((item) => (
                          <TableRow
                            key={item._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>Ksh.{item.price}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Tax</TableCell>
                          <TableCell>{purchase.tax}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Discount</TableCell>
                          <TableCell>{purchase.discount}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Shipping</TableCell>
                          <TableCell>Ksh.{purchase.shipping}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Total</TableCell>
                          <TableCell>Ksh.{purchase.totalAmount}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Grand Total</TableCell>
                          <TableCell>Ksh.{purchase.grandTotal}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Paid</TableCell>
                          <TableCell>Ksh.{purchase.paid}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell>Due</TableCell>
                          <TableCell>Ksh.{purchase.due}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ViewPurchase;
