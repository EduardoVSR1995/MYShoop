import Bar from "../../components/Bar/Bar";
import { Input } from "../../components/Forms/StyleForms";
import search from "../../assets/images/search.png";
import { Top, UserBox } from "./StyleTop";
import { Link, useNavigate } from "react-router-dom";

import { shopName } from "../../services/api";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import ProductContext from "../../contexts/ProductContext";

export default function Toop({ to }) { 
  const { userData, setValue } = useContext(UserContext);
  const { productData, SetProductData, setProductData } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    setValue();
  }, []);

  return(
    <>
      <Top>
        <Link to={ to ? shopName+"/"+to : shopName }>
          <Bar>
            {shopName?.replace(/\//g, "")}
          </Bar>
        </Link>  
        <span>
          <Input onChange={ e => { e.target.value !== "" ? setProductData({ ...productData, string: e.target.value }) : SetProductData(); }} />
          <img onClick={() => { SetProductData({ ...productData, search: productData.string }); navigate(shopName); } } src={search}/>
        </span>
        <UserBox >
          <Link to={userData.name ? shopName+"/user" : shopName+"/sign-in" } >
            {userData.name ? userData.name : "Login" }
            <img src={userData.urlImage ? userData.urlImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNEelTlk7s95SyQHFW1aktkzWR6-M8MwOOg&usqp=CAU"}/>
          </Link>
          {userData.name ? <div className="hiden" onClick={ () => { window.localStorage.clear(); window.location.href=shopName; } }> Sair </div> : "" }
        </UserBox>
      </Top>
    </>
  );
};

