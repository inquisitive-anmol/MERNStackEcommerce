import SimpleImageSlider from "react-simple-image-slider";
import React from 'react'




const ImageSliderComponent = ({imgHeightWidth}) => {
    const images = [
        { url: "/images/banner1.png" },
        { url: "/images/banner2.png" },
        { url: "/images/banner3.png" },
        { url: "/images/banner4.png" }
      ];
   
  return (
    <div>
        <SimpleImageSlider
        width={imgHeightWidth.width}
        height={imgHeightWidth.height}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={false}
      />
    </div>
  )
}

export default ImageSliderComponent;