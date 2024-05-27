import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
const Home = () => {
  const { data, loading } = useFetch("/customer/countcustomers");
  const { data: productData } = useFetch("/product/countproducts");
  const { data: ShippingData } = useFetch("/shipping//count-shippings");
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Customers" count={data} />
          <Widget type="Products" count={productData} />
          <Widget type="Shipment" count={ShippingData} />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
