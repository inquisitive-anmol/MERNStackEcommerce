import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { Chart as ChartJS } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../reduxStore/actions/productAction";
import { getAllOrders } from "../../reduxStore/actions/orderAction";
import { getAllUsers } from "../../reduxStore/actions/userAction";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["tomato"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  const doughnutState = {}

  // products ? (
  //   {
  //     labels: ["Out of Stock", "InStock"],
  //     datasets: [
  //       {
  //         backgroundColor: ["#00A6B4", "#6800B4"],
  //         hoverBackgroundColor: ["#4B5000", "#35014F"],
  //         data: [outOfStock, 0],
  //       },
  //     ],
  //   }
  // ) : (
  //   {
  //     labels: ["Out of Stock", "InStock"],
  //     datasets: [
  //       {
  //         backgroundColor: ["#00A6B4", "#6800B4"],
  //         hoverBackgroundColor: ["#4B5000", "#35014F"],
  //         data: [outOfStock, products.length - outOfStock],
  //       },
  //     ],
  //   }
  // );

  const data = {labels: ["Out of Stock", "InStock"],
  datasets: [
    {
      label: '# of total',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
       "#00A6B4", "#6800B4"
      ],
      hoverBackgroundColor: ["#4B5000", "#35014F"],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],

}

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <SideBar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
{/* 
        <div className="doughnutChart">
          <Doughnut data={data} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
