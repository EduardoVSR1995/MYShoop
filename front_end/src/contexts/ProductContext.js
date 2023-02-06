import { createContext, useState } from "react";

import { getProducts, getSearchProducts } from "../services/useProduct";
const ProductContext = createContext();
export default ProductContext;

export function ProductProvider({ children }) {
  const [productData, setProductData] = useState();

  function SetProductData(product) {
    if(product) {
      getSearchProducts(product.search)
        .then((value) => setProductData({ ...productData, data: value }))
        .catch((value) => console.error(value));
      return productData;
    }
    getProducts()
      .then((value) => setProductData({ ...productData, data: value }))
      .catch((value) => console.error(value));
    return productData;
  };

  return (
    <ProductContext.Provider value={{ productData, SetProductData, setProductData  }}>
      {children}
    </ProductContext.Provider>
  );
}
