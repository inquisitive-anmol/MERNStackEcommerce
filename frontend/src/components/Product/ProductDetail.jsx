import React, { useState } from "react";
import AnimatedLoadingImage from "../ui/AnimatedLoadingImage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllProducts,
  getProductDetails,
  newReview,
} from "../../reduxStore/actions/productAction";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import FeaturedProduct from "../Product/FeaturedProduct";
import Loader from "../ui/Loader";
import ReviewCard from "../ui/ReviewCard";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../reduxStore/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../reduxStore/constants/productsConstants";

const ProductDetail = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { id } = useParams();
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { products } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const setImage = (idx) => setImgIndex(idx);

  const handleQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const options = {
    value: product.ratings,
readOnly: true,
    size: "medium",
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review submitted Successfully!");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(getAllProducts());
  }, [dispatch, useParams, error, useAlert, reviewError, success]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <MetaData title={`${product.name} -- Shoocart`} />
          <div className="w-full flex items-center justify-center p-1 mt-8">
            <div className="left w-[50%] flex items-start justify-center gap-2">
              <div className="img-b1 flex flex-col gap-2 items-center justify-start">
                {product.images &&
                  product.images.map((image, idx) => (
                    <AnimatedLoadingImage
                      key={idx}
                      height={70}
                      width={70}
                      imgUrl={image.url}
                      imgAlt={"product image"}
                      className={`hover:scale-[1.1] cursor-pointer hover:opacity-[.8]`}
                      index={idx}
                      setImage={setImage}
                    />
                  ))}
              </div>
              {product.images && (
                <AnimatedLoadingImage
                  height={500}
                  width={570}
                  imgUrl={product.images[imgIndex].url}
                  imgAlt={"product image"}
                />
              )}
            </div>

            {/* right section */}
            <div className="right w-[50%] pl-10 pr-8">
              <p className="vendor">seller</p>
              <p className="name text-black font-medium text-4xl text-wrap">
                {product.name}
              </p>
              <p className="rating mb-5 flex justify-start items-center border-b-1 border-gray-500">
                <p className="text-black/60">({product && product.ratings})</p>
                <p className="mx-2">
                  <Rating {...options} />
                </p>
                <p className="ml-1 text-black/45">({product.numOfReviews} Reviews)</p>
              </p>

              {product.size && product.size.length > 0 ? (
                <div className="size mt-4">
                  <label htmlFor="size" className="mr-2">
                    Size:
                  </label>
                  <select className="rounded-xl px-3 py" name="size" id="size">
                    <option value="6">6 UK</option>
                    <option value="7">7 UK</option>
                    <option value="8">8 UK</option>
                    <option value="9">9 UK</option>
                    <option value="10">10 UK</option>
                    <option value="11">11 UK</option>
                    <option value="12">12 UK</option>
                  </select>
                </div>
              ) : null}

              <p className="price mx-1 my-6">
                <span className="mr-1 text-lg font-medium text-black">₹</span>
                <span className="font-medium text-3xl text-textColor hover:text-black transition-colors">
                  {product.price}
                </span>
              </p>

              <div className="quantity">
                <label htmlFor="qty" className="mr-2">
                  Quantity:
                </label>
                {product.stock ? (
                  <select
                    onChange={handleQuantity}
                    value={quantity}
                    className="rounded-xl px-3 py border-1 border-gray-300 outline-none"
                    name="qty"
                    id="qty"
                  >
                    {[...Array(product.stock).keys()].map((num) => (
                      <option value={num + 1} key={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-accentColor">Out of Stock</p>
                )}
              </div>

              <div className="cta-btns">
                {isAuthenticated ? (
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="text-white px-20 py-2 bg-accentColor mt-8 rounded-3xl text-lg font-medium hover:bg-[#FF3C00]"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => alert.success("Login to Access Cart")}
                    className="text-white px-20 py-2 bg-accentColor mt-8 rounded-3xl text-lg font-medium hover:bg-[#FF3C00]"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <p className="status">
                <b
                  className={`${
                    product && product.stock < 1
                      ? "text-red-600"
                      : "text-green-800"
                  } ml-4`}
                >
                  <span className="text-textColor">Status: </span>
                  {product && product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
              <p className="description text-[16px] text-black text-wrap mt-7">
                <p className="font-medium text-black text-lg">Description: </p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda aut beatae voluptatum facere recusandae tempora esse
                consequuntur alias, dolorem vitae, eaque sint saepe dolore
                quidem, tenetur velit! Sit totam veritatis possimus quisquam ex
                unde rem sequi neque. Facilis aperiam voluptates, facere
                accusamus sit exercitationem!
              </p>
              <div className="give-review">
                <button
                  onClick={submitReviewToggle}
                  className="px-4 py-1 bg-bgColor border-accentColor border-2 mt-4 rounded-3xl text-sm font-normal hover:scale-110 transition-all ease-in-out "
                >
                  Submit Review
                </button>
                <>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                  >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog flex flex-col">
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                      />

                      <textarea
                        className="submitDialogTextArea border-2 outline-none border-black/10 mt-2 px-2 py-1"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                      </Button>
                      <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <FeaturedProduct
              loading={loading}
              products={products}
              title={"Similar Products"}
              className={"mt-24"}
            />
          </div>
          <div className="reviews flex flex-col justify-center items-center mt-14 w-full">
            <h1 className="font-semibold text-2xl text-textColor">Reviews</h1>
            <div className="w-[30%] h-px mt-2 mb-10 bg-black"></div>
            <div className="mb-12">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <ReviewCard
                    loading={loading}
                    review={review}
                    options={options}
                  />
                ))
              ) : (
                  <p className="text-gray-400 font-semibold text-lg">
                    No Reviews Yet
                  </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
