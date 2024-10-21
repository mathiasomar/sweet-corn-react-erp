import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: 10,
  },
  flexB: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    width: "100%",
  },
  flexBtitle: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  flexText: {
    flexDirection: "column",
    gap: 2,
  },
  flexBtext: {
    fontSize: "10px",
  },
  table: {
    width: "100%",
    padding: 10,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    padding: 8,
    paddingBottom: 8,
    fontSize: "12px",
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  col1: {
    width: "25%",
  },
  col2: {
    width: "25%",
  },
  col3: {
    width: "25%",
  },
  col4: {
    width: "25%",
  },
});

const PdfDocument = ({ purchase }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>SWEET CORN MILLERS LTD</Text>
        </View>
        <View style={styles.flexB}>
          <View style={styles.flexText}>
            <Text style={styles.flexBtitle}>Supplier Info</Text>
            <Text style={styles.flexBtext}>
              Name: {purchase.supplierId.name}
            </Text>
            <Text style={styles.flexBtext}>
              Email: {purchase.supplierId.email}
            </Text>
            <Text style={styles.flexBtext}>
              Phone: {purchase.supplierId.phone}
            </Text>
            <Text style={styles.flexBtext} wrap>
              Address: {purchase.supplierId.address}
            </Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.flexBtitle}>Company Info</Text>
            <Text style={styles.flexBtext}>Name: Sweet Corn Millers Ltd</Text>
            <Text style={styles.flexBtext}>Email: info@sweetcorn.com</Text>
            <Text style={styles.flexBtext}>Phone: 0754000666</Text>
            <Text style={styles.flexBtext}>Address: Ruiru, Kenya</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.flexBtitle}>Purchase Info</Text>
            <Text style={styles.flexBtext}>Reference: {purchase.ref}</Text>
            <Text style={styles.flexBtext}>Status: {purchase.status}</Text>
            <Text style={styles.flexBtext}>Payment Status: Unpaid</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text>ITEMS SUMMARY</Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.col1}>Name</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Unit</Text>
            <Text style={styles.col4}>Price</Text>
          </View>
          {purchase.items.map((item, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <Text style={styles.col1}>{item.name}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{item.unit}</Text>
              <Text style={styles.col4}>Ksh.{item.price}</Text>
            </View>
          ))}
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Total</Text>
            <Text style={styles.col4}>Ksh.{purchase.totalAmount}</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Tax</Text>
            <Text style={styles.col4}>{purchase.tax}%</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Discount</Text>
            <Text style={styles.col4}>{purchase.discount}%</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Grand total</Text>
            <Text style={styles.col4}>Ksh.{purchase.grandTotal}</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Paid</Text>
            <Text style={styles.col4}>Ksh.{purchase.paid}</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}></Text>
            <Text style={styles.col3}>Due</Text>
            <Text style={styles.col4}>Ksh.{purchase.due}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
