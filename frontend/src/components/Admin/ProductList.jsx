import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../reduxStore/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../reduxStore/constants/productsConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, toast, error, deleteError, navigate, isDeleted]);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 120,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/catelogue/${params.row.id}`}>
              <img
                src={params.row.image}
                alt="product"
                style={{ width: "80%", height: "90%" }}
              />
            </Link>
          </>
        );
      },
    },
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "sellerId",
      flex: 0.5,
      headerName: "Seller ID",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/account`}>{params.row.sellerId}</Link>
          </>
        );
      },
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "category",
      headerName: "Category",
      minWidth: 170,
      flex: 0.2,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            {/* <EditIcon onClick={() => toast.error("feature not working! Under development")}/> */}
            {/* <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button> */}
            <Button
              onClick={() =>
                toast.error("feature not working under development")
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.length &&
    products.forEach((item) => {
      rows.push({
        image: item.images[0].url,
        id: item._id,
        sellerId: item.user,
        category: item.category,
        createdAt: item.createdAt,
        name: item.name,
      });
    });
  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer overflow-x-auto">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          {/* <div className="hover:text-orange-600 mx-2 my-4">
            <Link
              to={`/admin/product/catelogue`}
              className=" bg-black/10 rounded p-3"
            >
              See Product Catelogue
            </Link>
          </div> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
