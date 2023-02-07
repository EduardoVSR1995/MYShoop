import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductContext from "../../contexts/ProductContext";
import UserContext from "../../contexts/UserContext";
import { deleteProductStore } from "../../services/delet";
import { getProductPayd } from "../../services/getInfos";
import { posCreatProduct } from "../../services/posts";
import { getCategoris } from "../../services/product";
import { BoxConfig, BoxOwner, Sub } from "../Advertising/StyleAdvertising";
import { Dialog } from "../Dialog/Dialog";
import { Area, Env } from "../EnvArea/EnvArea";
import { Afiliat, Form, Input } from "../Forms/StyleForms";
import { Box } from "../Products/StyleProducts";

function select(setBox) {
  setBox(true);
}

export default function Config() {
  const [box, setBox] = useState();
  const [boxConfig, setBoxConfig] = useState();
  const [funct, setFunct] = useState();

  document.body.style.overflowX = !box ? "auto" : "hidden";
  document.body.style.overflowY = !box ? "auto" : "hidden";

  return (
    <>
      <Sub onClick={() => select(setBox)}>Configurações</Sub>
      <BoxConfig>
        {!box ? "" :
          <>
            <Dialog setDialog={setBox} >
              {!boxConfig ? "" : <Dialog setDialog={setBoxConfig} ><Choise choise={funct}></Choise></Dialog>}
              <h1 onClick={() => { select(setBoxConfig); setFunct("Insert"); }}>Inserir produto</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("remov"); }}>Remover produto</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("ProductEnv"); }}>Produtos para envio</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("advertising"); }}>Mudar promoção logo</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("registerAfi"); }}>Cadastrar afilado</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("salesAmount"); }}>Total de vendas</h1>
              <h1 onClick={() => { select(setBoxConfig); setFunct("listAfiliat"); }}>Lista dos afiliados</h1>
            </Dialog>
          </>
        }
      </BoxConfig>
    </>
  );
}

function Choise({ choise }) {
  const [product, setProduct] = useState();
  const { productData, SetProductData } = useContext(ProductContext);
  const { setValue } = useContext(UserContext);
  
  if (choise === "Insert") {
    const [form, setForm] = useState({});

    function itens() { 
      const { token } = setValue();
      getCategoris(token).then((i) => setProduct({ ...product, categoryList: i })).catch( (i) => console.error(i));
    } 
    useEffect(() => {
      itens();
    }, []);
    async function creatProduct() {
      const { token } = setValue();
      if( !form.category && !form.creatCategory ) return alert("Selecione uma categoria ou crie uma nova categoria");
      if( form.creatCategory && form.creatCategory === "" ) {
        delete form.creatCategory;
      }
      const price = form.price;
      const packingSize = form.packingSize;

      form["price"]= (parseInt(price.replace(",", "")));
      form["packingSize"]= (((parseInt(packingSize))/3).toFixed(2));
      form["url"]=[form.url1];

      if(form.url2) {
        form.url.push(form.url2);
      }  
      if(form.url3) {
        form.url.push(form.url3);
      }  

      delete form.url1;
      delete form.url2;
      delete form.url3;
      
      const obj = { ...form };  
      try {
        await posCreatProduct(token, obj);
        toast("Produto criado");  
        itens();
      } catch (error) {
        toast("Ouve um erro");
      }    
    }
    return (
      <Form onSubmit={e => { e.preventDefault(); creatProduct(); }} >
        <Input onChange={e => setForm({ ...form, creatCategory: e.target.value })} placeholder={"Nova categoria aqui"}/>
        { 
          product?.categoryList ?  
            product.categoryList.map( (i) => { return <Input onClick={ () => { setForm({ ...form, category: i.id }); alert("Categoria selecionada");}} value={i.name} placeholder={i.name}/>;})
            : "" 
        }
        <Input onChange={e => setForm({ ...form, name: e.target.value })} required placeholder={"Nome do produto"}/>
        <Input onChange={e => setForm({ ...form, url1: e.target.value })} required placeholder={"Url da foto do produto"}/>
        <Input onChange={e => setForm({ ...form, url2: e.target.value })} placeholder={"Url da foto do produto"}/>
        <Input onChange={e => setForm({ ...form, url3: e.target.value })} placeholder={"Url da foto do produto"}/>
        <Input onChange={e => setForm({ ...form, description: e.target.value })} required placeholder={"Descrição"}/>
        <Input onChange={e => setForm({ ...form, price: e.target.value })} type={"text"} maxLength={7} title={"Formato 0000,00 usar virgula não ponto"} pattern={"[0-9]{1,4},[0-9]{2}"} required placeholder={"Valor"}/>
        <Input onChange={e => setForm({ ...form, packingSize: e.target.value })} required placeholder={"Tamanho meddio do produto em cm L x A x C"}/>
        <button type={"submit"}>Enviar</button>
      </Form>
    );
  }
  if (choise === "remov") {
    async function del(id) {
      const { token } = setValue();

      if(!window.confirm("Deseja remover o produto")) return;
      try {
        await deleteProductStore(id, token);
        toast("Produto deletado");
        SetProductData();
      } catch (error) {
        toast("Ouve um erro");
      }
    }

    return (
      <BoxOwner>
        {
          productData?.data ?
            productData.data.map((i) => {
              return (
                <Box key={i.id} onClick={() => del(i.id)}>
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
  if (choise === "advertising") {
    return(
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
  if ( choise === "registerAfi" ) {
    return(
      <Afiliat>   
        <Form onSubmit={e => ""}>
          <Input required type={"email"} placeholder={"E-mail"} onChange={e => setProduct({ ...product, email: e.target.value })} />
          <button type={"submit"} > Cadastrar afiliado(a) </button>
        </Form>
        O codigo do afiliado aparece aqui {` => ${product?.code ? product.code : ""} <= `} basta colocalo ao final de cada link de produto.
      </Afiliat> 
    );
  }
  return (
    <>

    </>
  );
}

function Insert({ categoris }) {
  const [product, setProduct] = useState();
  console.log(categoris);
  return (
    <Form onSubmit={""} >
      <Input placeholder={"Nova categoria aqui"}></Input>
      <Input  list="selectOption" type={"text"} placeholder={"Categoria"}></Input>
      <datalist id="selectOption">
        <option value="valor1"></option>
        <option value="valor2"></option>
        <option value="valor3"></option>
      </datalist>
      <Input placeholder={"Nome do produto"}></Input>
      <Input placeholder={"Url da foto do produto"}></Input>
      <Input placeholder={"Url da foto do produto"}></Input>
      <Input placeholder={"Url da foto do produto"}></Input>
      <Input placeholder={"Descrição"}></Input>
      <Input placeholder={"Tamanho meddio do produto em cm L x A x C"}></Input>
      <button type={"submit"}>Enviar</button>
    </Form>
  );
}
