import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllProducts,
} from "../../reduxStore/actions/productAction";
import Loader from "../ui/Loader";
import ProductCard from "../ui/ProductCard";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import PaginationUi from "../ui/PaginationUi";
import FilterUi from "../ui/FilterUi";
import MetaData from "../layout/MetaData";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (newRating) => {
    setRatings(newRating);
  };

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <MetaData title="Products -- Shoocart" />
          <div className="w-full mt-16 flex">
            <div className="filter w-[20%] pr-4 pl-1 border-r-1 border-gray-200">
              <FilterUi
                priceHandler={priceHandler}
                price={price}
                setCategory={setCategory}
                ratings={ratings}
                ratingHandler={ratingHandler}
              />
            </div>

            <div className="w-[80%] flex flex-wrap justify-center items-center gap-5 ">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          {productsCount > resultPerPage &&
            products.length >= resultPerPage && (
              <div className="w-full flex items-center justify-end pr-20 mt-6 mb-3">
                <PaginationUi
                  productsCount={productsCount}
                  resultPerPage={resultPerPage}
                  currentPage={currentPage}
                  setCurrentPageNo={setCurrentPageNo}
                />
              </div>
            )}
        </>
      )}
    </>
  );
};

export default Products;
