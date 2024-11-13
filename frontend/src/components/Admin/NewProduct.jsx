import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
} from "../../reduxStore/actions/productAction";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ScaleIcon from "@mui/icons-material/Scale";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import LayersIcon from "@mui/icons-material/Layers";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SideBar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../../reduxStore/constants/productsConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const variantsList = [
    {
      its: "empty",
    },
  ];

  const [variants, setVariants] = useState(variantsList);

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

  const handleAddMoreBtn = () => {
    const newVariants = [...variants];
    newVariants.push({});
    setVariants(newVariants);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, toast, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
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

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={createProductImagesChange}
                multiple
                required
              />
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
              {variants.map((item, index) => (
                <div
                  className="variantsChild w-full flex flex-col gap-2 border-b-2 border-black/5 rounded"
                  key={index}
                >
                  <h3>Variant({index + 1}): </h3>
                  <div className="inpDiv">
                    <AttachMoneyIcon />
                    <input
                      className="inp"
                      type="number"
                      name="shoocartPrice"
                      placeholder="Shoocart Price"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <AttachMoneyIcon />
                    <input
                      className="inp"
                      type="number"
                      name="maxPrice"
                      placeholder="Maximum Retail Price(MRP)"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <ZoomOutMapIcon />
                    <input
                      className="inp"
                      type="text"
                      name="size"
                      placeholder="size"
                      required
                    />
                  </div>

                  <div className="inpDiv">
                    <Inventory2Icon />
                    <input
                      className="inp"
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <ScaleIcon />
                    <input
                      className="inp"
                      type="number"
                      name="weight"
                      placeholder="weight"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <BrandingWatermarkIcon />
                    <input
                      className="inp"
                      type="text"
                      name="brand"
                      placeholder="Brand"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <LayersIcon />
                    <input
                      className="inp"
                      type="text"
                      name="material"
                      placeholder="Material"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <AcUnitIcon />
                    <input
                      className="inp"
                      type="text"
                      name="soleMaterial"
                      placeholder="Sole Material"
                      required
                    />
                  </div>
                  <div className="inpDiv">
                    <BlurOnIcon />
                    <input
                      className="inp"
                      type="text"
                      name="manufacturersDetail"
                      placeholder="Manufacturers Detail (optional)!"
                    />
                  </div>
                  <div className="inpDiv">
                    <LocalShippingIcon />
                    <input
                      className="inp"
                      type="text"
                      name="packersDetail"
                      placeholder="Packers Detail (optional)!"
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

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
