import { useContext, useEffect, useState } from "react";
import cesto from "../../assets/images/cesto.png";
import Bar from "../Bar/Bar";
import { Advertising, Basket } from "./StyleAdvertising";
import { advertisingGet, cart } from "../../services/getInfos";
import UserContext from "../../contexts/UserContext";
import { shopName } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { autorize } from "../../services/userConnectApi";
import OwnerConfig from "../OwnerConfig/OwnerConfig";
 
export default function Adverti() {
  const { setValue } = useContext(UserContext);
  const [product, setProduct] = useState();

  useEffect(() => {
    const value = setValue();
    cart(value?.token)
      .then((i) => {
        advertisingGet()
          .then((v) => {
            autorize(value?.token).then((va) => { setProduct({ ...product, list: i, advertising: v, bar: va }); });});
      })
      .catch((i) => {
        advertisingGet()
          .then((v) => {
            setProduct({ ...product, list: i, advertising: v });
          })
          .catch((i) => console.error(i));
      });
  }, []);

  const navigat = useNavigate();

  return (
    <>
      <Advertising>
        {product?.bar ? <OwnerConfig /> : ""}
        <Basket onClick={() => navigat(shopName + "/user")} >
          <div>{product?.list.length ? product?.list.length : 0}</div>
          <img src={cesto} />
        </Basket>
        <div className={"merchan"}>
          {
            product?.advertising.length > 0 ? product.advertising.map((value) => {
              return (
                <span>
                  <h1>{value.text}
                    <h2>
                      {value.Product.description}
                    </h2>
                    <Link to={shopName + "/product/" + value.productId}>
                      <Bar>Saiba mais</Bar>
                    </Link>
                  </h1>
                  <div>
                    <img src={value.Product.UrlImage[0].urlImage} />
                  </div>
                </span>
              );
            }) :
              <span>
                <h1>
                  Coloque sua propaganda aqui !!
                </h1>
              </span>
          }
        </div>
      </Advertising>
    </>
  );
};
