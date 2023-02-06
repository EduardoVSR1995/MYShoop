import { useContext, useEffect, useState } from "react";
import cesto from "../../assets/images/cesto.png";
import Bar from "../Bar/Bar";
import { Advertising, Basket, Sub, BoxConfig, BoxOwner } from "./StyleAdvertising";
import { advertisingGet, cart, getProductPayd } from "../../services/useGetInfos";
import UserContext from "../../contexts/UserContext";
import PrductContext from "../../contexts/ProductContext";
import { shopName } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { autorize } from "../../services/userApi";
import { Dialog } from "../Dialog/Dialog";
import { Form, Input } from "../Forms/StyleForms";
import { Box } from "../Products/StyleProducts";
import { Area, Env } from "../EnvArea/EnvArea";

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
        {product?.bar ? <Config onClick={test} /> : ""}
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

function test(setBox) {
  setBox(true);
}

function Config() {
  const [box, setBox] = useState();
  const [boxConfig, setBoxConfig] = useState();
  const [funct, setFunct] = useState();

  document.body.style.overflowX = !box ? "auto" : "hidden";
  document.body.style.overflowY = !box ? "auto" : "hidden";
  return (
    <>
      <Sub onClick={() => test(setBox)}>Configurações</Sub>
      <BoxConfig>
        {!box ? "" :
          <>
            <Dialog setDialog={setBox} >
              {!boxConfig ? "" : <Dialog setDialog={setBoxConfig} ><Choise choise={funct}></Choise></Dialog>}
              <h1 onClick={() => { test(setBoxConfig); setFunct("Insert"); }}>Inserir produto</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("remov"); }}>Remover produto</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("ProductEnv"); }}>Produtos para envio</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("advertising"); }}>Mudar promoção logo</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("registerAfi"); }}>Cadastrar afilado</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("salesAmount"); }}>Total de vendas</h1>
              <h1 onClick={() => { test(setBoxConfig); setFunct("listAfiliat"); }}>Lista dos afiliados</h1>
            </Dialog>
          </>
        }
      </BoxConfig>
    </>
  );
}

function Choise({ choise }) {
  const [product, setProduct] = useState();
  const { productData } = useContext(PrductContext);
  const { setValue } = useContext(UserContext);

  if (choise === "Insert") {
    return (
      <Form onSubmit={""} >
        <Input placeholder={"Nova categoria aqui"}></Input>
        <Input placeholder={"Categoria"}></Input>
        <Input placeholder={"Nome do produto"}></Input>
        <Input placeholder={"Url da foto do produto"}></Input>
        <Input placeholder={"Url da foto do produto"}></Input>
        <Input placeholder={"Url da foto do produto"}></Input>
        <Input placeholder={"Descrição"}></Input>
        <button type={"submit"}>Enviar</button>
      </Form>
    );
  }
  if (choise === "remov") {
    return (
      <BoxOwner>
        {
          productData?.data ?
            productData.data.map((i) => {
              return (
                <Box key={i.id} onClick={() => ""}>
                  {i.UrlImage.map((r) => { return (<img src={r.urlImage} />); })}
                  <p>{i.name}</p>
                </Box>
              );
            })
            : ""
        }
      </BoxOwner>
    );
  }

  if (choise === "ProductEnv") {
    useEffect(() => {
      const { token } = setValue();
      getProductPayd(token).then((i) => setProduct([...i])).catch((i) => console.log(i));
    }, []);
    
    return (
      <Area>
        {
          product?.length>0 ? product.map((i, index) => {
            console.log(i);
            return (
              <Env key={index}>
                <img src={i.Product.UrlImage[0].urlImage} />
                <p>
                  Produto:   { i.Product.name} <br />
                  Comprador: { i.User.name}  <br />
                  Email:     { i.User.email}  <br />
                  Cep:          { i.Addres.postOfficeCode}  <br />
                  Cidade:       { i.Addres.city}  <br />
                  Nome da rua:  { i.Addres.street}  <br />
                  Numero da casa:    { i.Addres.house}  <br />
                  Numero do telefone:{ i.Addres.phone}  <br />
                </p>
              </Env>
            );
          })
            : "Ainda não a produtos para envio"
        }
      </Area>
    );
  }

  return (
    <>

    </>
  );
}
