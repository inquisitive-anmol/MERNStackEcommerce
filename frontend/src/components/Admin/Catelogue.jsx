import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  getProductDetails,
  deleteProduct,
} from "../../reduxStore/actions/productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../reduxStore/constants/productsConstants";
import CatelogueDisplay from "./CatelogueDisplay";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;

  const { error, products } = useSelector((state) => state.products);
  const { error : prodDetailError, product } = useSelector((state) => state.productDetails);


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

    if(prodDetailError) {
      toast.error(prodDetailError);
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
    dispatch(getProductDetails(id));
  }, [dispatch, toast, error, deleteError, navigate, isDeleted, prodDetailError]);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 120,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.image}
              alt="product"
              style={{ width: "80%", height: "90%" }}
            />
          </>
        );
      },
    },
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 160,
      flex: 0.3,
    },
    {
      field: "maxPrice",
      headerName: "MRP",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "shoocartPrice",
      headerName: "Shoocart Price",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "size",
      headerName: "Size",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "weight",
      headerName: "Weight",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "material",
      headerName: "Material",
      minWidth: 100,
      flex: 0.3,
    },
  ];

  const rows = [];
let obj = {};

if(product) {
  obj.image = product.images[0].url;
  obj.name = product.name;

}

  product &&
    product.variants.length &&
    product.variants.forEach((item) => {
      rows.push({...obj,
        id: item._id + item.size,
        maxPrice: item.maxPrice,
        shoocartPrice: item.shoocartPrice,
        size: item.size,
        stock: item.stock,
        weight: item.weight,
        brand: item.brand,
        material: item.material,
      });
    });
  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer overflow-x-auto">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <div className="flex-col lg:flex-row gap-1">
           <CatelogueDisplay />
            <div className="w-[74%] lg:w-full bg-green-200 overflow-x-auto">
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
        </div>
      </div>
    </>
  );
};

export default ProductList;
