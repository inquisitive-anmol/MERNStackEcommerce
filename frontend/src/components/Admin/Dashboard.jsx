import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../reduxStore/actions/productAction";
import { getAllOrders } from "../../reduxStore/actions/OrderAction";
import { getAllUsers } from "../../reduxStore/actions/userAction";
import MetaData from "../layout/MetaData";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      console.log(item);
      item.variants.forEach((varItem) => {
        if (varItem.Stock === 0) {
          outOfStock += 1;
        }
      });
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      console.log(item);
      item.orderItems.forEach((varItem) => {
        console.log(varItem);
        totalAmount += varItem.price;
      });
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  let doughnutState;
  if (products && products.length > 0) {
    doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    };
  } else {
    doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, 10],
        },
      ],
    };
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
              <p className="text-[0.775rem] md:text-[1.1rem]">Product</p>
              <p className="text-[0.775rem] md:text-[1.1rem]">
                {products && products.length}
              </p>
            </Link>
            <Link to="/admin/orders">
              <p className="text-[0.775rem] md:text-[1.1rem]">Orders</p>
              <p className="text-[0.775rem] md:text-[1.1rem]">
                {orders && orders.length}
              </p>
            </Link>
            <Link to="/admin/users">
              <p className="text-[0.775rem] md:text-[1.1rem]">Users</p>
              <p className="text-[0.775rem] md:text-[1.1rem]">
                {users && users.length}
              </p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <div>
            <Line
              data={lineState}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="doughnutChart">
          <div>
            <Doughnut
              data={doughnutState}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
