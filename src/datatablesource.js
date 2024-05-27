export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",

    headerName: "Phone",
    width: 100,
  },
];

export const productColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 230,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 100,
  },
];

export const customerColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 220,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 380,
  },
  {
    field: "salesChannel",
    headerName: "SalesChannel",
    width: 110,
  },
];

export const ShippingColumns = [
  {
    field: "customerName", // Adjusted field path
    headerName: "Customer",
    width: 170,
  },
  {
    field: "productName",
    headerName: "Product",
    width: 110,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 100,
  },
  {
    field: "shippingCost",
    headerName: "Shipping Cost",
    width: 130,
  },
  {
    field: "totalWeight",
    headerName: "Total Weight",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 200,
  // },
];
