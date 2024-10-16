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
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CloseIcon from "@mui/icons-material/Close";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [open, setOpen] = useState(false);

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
  const handleFilterClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const classes = open && "h-[40vmax] !flex";

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
          <div className="flex items-center justify-center w-full lg:mb-8 lg:mt-10">
            <h1 className=" w-fit border-b-1 border-b-black/50 px-5 md:text-lg lg:text-2xl lg:px-10 md:px-7">
              Products
            </h1>
          </div>
          <div className=" w-full mt-6 flex items-center gap-2 flex-col md:flex-row px-3">
            <p
              onClick={handleFilterClick}
              className="self-end mr-10 text-base cursor-pointer md:hidden"
            >
              Filter
              <ImportExportIcon className="!text-base" />
            </p>
            <div
              className={
                window.innerWidth < 768
                  ? `${classes} hidden w-full z-30 transition-all fixed bottom-0 left-[50%] -translate-x-2/4 bg-white px-4 py-5 overflow-scroll `
                  : "lg:w-[20%] md:w-[27%]"
              }
            >
             <div className="h-fit mb-3 mt-2 w-full relative left-[50%] -translate-x-2/4">
             {open && <CloseIcon className="mb-4 bg-black/5 p-1 rounded-full" onClick={handleFilterClick} />}
              <FilterUi
                priceHandler={priceHandler}
                price={price}
                setCategory={setCategory}
                ratings={ratings}
                ratingHandler={ratingHandler}
              />
             </div>
            </div>

            <div className="w-full lg:w-[80%] md:w-[73%] flex flex-wrap justify-center items-center gap-3">
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
