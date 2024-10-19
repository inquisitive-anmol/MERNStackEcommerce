import React, { useEffect } from 'react'
import ImageSliderComponent from "./ImageSliderComponent";
import FeaturedProduct from '../Product/FeaturedProduct';
import MetaData from '../layout/MetaData';
import { getAllProducts, clearErrors } from "../../reduxStore/actions/productAction";
import { useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';


const Home = () => {
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [dispatch, error, toast]);
  
  const imgHeightWidth = {
    height: window.innerWidth < window.innerHeight ? "50vmin" : window.innerWidth > 1110 ? "42vmax" : '46vmax',
    width: '100%',
  }

  return (
    <div className='w-full min-h-screen'>

      <MetaData title="Shoocart" />

      <div className='w-full'>
      <ImageSliderComponent imgHeightWidth={imgHeightWidth}/>
      </div>

      <FeaturedProduct loading={loading} products={products} title={"Featured Products"} className={"mt-16"}/>
    </div>
  )
}

export default Home