import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../reduxStore/actions/productAction";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ScaleIcon from "@mui/icons-material/Scale";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import LayersIcon from "@mui/icons-material/Layers";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
// import StorageIcon from "@mui/icons-material/Storage";
import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../reduxStore/constants/productsConstants";
import { matchRoutes, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  console.log(product);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = params.id;

  const handleAddMoreBtn = () => {
    const newVariants = [...variants];
    newVariants.push({});
    setVariants(newVariants);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setOldImages(product.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    toast,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const prepareFormData = () => {
    let finalVariants = [];
    const variantsChild = document.querySelectorAll(".variantsChild");
    variantsChild.forEach((variant) => {
      let grandChilds = variant.children;
      let obj = {};
      for (let i = 1; i < grandChilds.length; i++) {
        let inp = grandChilds[i].lastElementChild;
        obj[inp.name] = inp.value;
      }
      finalVariants.push(obj);
    });

    return finalVariants;
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    const finalVariants = prepareFormData();
    console.log(finalVariants);
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.append("variants", JSON.stringify(finalVariants));

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>


            <div
              className="w-full h-fit flex flex-wrap gap-6"
              id="variantParent"
            >
              {product &&
                product.variants &&
                product.variants.map((item, index) => (
                  <div
                    className="variantsChild w-full flex flex-col gap-2 border-b-2 border-black/5 rounded"
                    key={index}
                  >
                    <h3>Variant({index + 1}): </h3>
                    <div className="inpDiv">
                      <AttachMoneyIcon />
                      <input
                        className="inp custom-placeholder"
                        type="number"
                        name="shoocartPrice"
                        placeholder={item.shoocartPrice}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <AttachMoneyIcon />
                      <input
                        className="inp custom-placeholder"
                        type="number"
                        name="maxPrice"
                        placeholder={item.maxPrice}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <ZoomOutMapIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="size"
                        placeholder={item.size}
                        required
                      />
                    </div>

                    <div className="inpDiv">
                      <Inventory2Icon />
                      <input
                        className="inp custom-placeholder"
                        type="number"
                        name="stock"
                        placeholder={item.stock}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <ScaleIcon />
                      <input
                        className="inp custom-placeholder"
                        type="number"
                        name="weight"
                        placeholder={item.weight}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <BrandingWatermarkIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="brand"
                        placeholder={item.brand}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <LayersIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="material"
                        placeholder={item.material}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <AcUnitIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="soleMaterial"
                        placeholder={item.soleMaterial}
                        required
                      />
                    </div>
                    <div className="inpDiv">
                      <BlurOnIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="manufacturersDetail"
                        placeholder={item.manufacturersDetail}
                      />
                    </div>
                    <div className="inpDiv">
                      <LocalShippingIcon />
                      <input
                        className="inp custom-placeholder"
                        type="text"
                        name="packersDetail"
                        placeholder={item.packersDetail}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full flex items-center justify-end">
              <button
                onClick={handleAddMoreBtn}
                type="button"
                className="bg-black/5 hover:bg-black/10 px-3 py-2 rounded-lg"
              >
                Add More Variants
              </button>
            </div>
            {/* ladsfjlsdf */}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
