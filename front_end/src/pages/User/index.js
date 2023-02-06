import Top from "../../components/Top/Top";
import { TopProduct } from "../../components/SalesArea/StyleSalesArea";
import Sales from "../../components/SalesArea/Sales";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { cart, cartPayd } from "../../services/useGetInfos";
import PaydArea from "../../components/PaydArea/PaydArea";
import ProductContext from "../../contexts/ProductContext";

export default function User() {
  const [product, setProduct] = useState({ cart: [], cartPayd: [] });
  const { setValue } = useContext(UserContext);
  const { productData, setProductData } = useContext(ProductContext);
 
  function load(token) {
    cart(token)
      .then((value) => {
        cartPayd(token)
          .then((i) => {
            setProduct({ ...product, cart: [ ...value ], cartPayd: [ ...i.arr ], phone: i.phone });
          })
          .catch((i) => console.error(i));
      })
      .catch((i) => console.error(i));
  }    
  useEffect(() => {
    const { token } = setValue();
    setProductData({ ...productData, load });
    load(token);
  }, []);
  console.log(product);
  return (
    <>
      <TopProduct>
        <Top />
      </TopProduct> 
      {
        product.cartPayd.length > 0 ?
          product.cartPayd.map((i, index) => { return <PaydArea key={index} type={i.ProductId} oneProduct={{ ...i, phone: product.phone }} />; })
          :
          ""
      }
      {
        product.cart.length > 0 ?
          product.cart.map((i, index) => { return <Sales key={index} type={i.ProductId} load={load} />; })
          :
          ""
      }
    </>
  );
};
