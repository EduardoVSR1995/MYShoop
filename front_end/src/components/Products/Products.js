import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../contexts/ProductContext";

import { shopName } from "../../services/api";
import { Products, Box } from "./StyleProducts";

export default function Product() {
  const { productData, SetProductData } = useContext(ProductContext);

  const navigat = useNavigate();
  
  useEffect(() => {
    const i = productData?.data ? "": SetProductData();  
  }, []);

  return(
    <>
      <Products>
        { 
          productData?.data ? 
            productData.data.map( (i) => {
              console.log(i);
              return(
                <Box key={i.id} onClick={() => navigat(`${shopName}/product/${i.id}`)}>
                  <img src={i.UrlImage.length ? i.UrlImage[0].urlImage :"https://avatars.githubusercontent.com/u/106880629?s=40&v=4"}/>
                  <div>{i.name}</div>
                </Box>
              );})
            : "" 
        }
      </Products>
    </>
  );
};
