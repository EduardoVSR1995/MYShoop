import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductContext from "../../contexts/ProductContext";
import UserContext from "../../contexts/UserContext";
import { deleteProductStore } from "../../services/delet";
import { getAfiliate, getProductPayd, getProductSold } from "../../services/getInfos";
import { updateProductPayCode } from "../../services/patch";
import { posCreatProduct, postAfiliat } from "../../services/posts";
import { changeAdvertising, getCategoris } from "../../services/product";
import { BoxOwner, ChangeAdvers } from "../Advertising/StyleAdvertising";
import { Area, Env } from "../EnvArea/EnvArea";
import { Afiliat, Form, Input } from "../Forms/StyleForms";
import { Box } from "../Products/StyleProducts";

export default function PageChoise({ choise }) {
  if (choise === "Insert") {
    return <Incert />;
  }
  if (choise === "remov") {
    return <Remov/>;
  }
  if (choise === "ProductEnv") {
    return <ProductEnv />;
  }
  if (choise === "advertising") {
    return <Advertising />;
  }
  if ( choise === "registerAfi" ) {
    return <RegisterAfi />;
  }
  if (choise === "salesAmount") {
    return <SalesAmount />;
  }
  if (choise === "listAfiliat") {
    return <ListAfiliat />;
  }
}

function Incert() {
  const [product, setProduct] = useState();
  const [form, setForm] = useState({});
  const { setValue } = useContext(UserContext);

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
      <Input list="selectOption" onChange={e => setForm({ ...form, category: e.target.value })} type={"text"} placeholder={"Categoria"}/>
      <datalist id="selectOption">
        { 
          product?.categoryList ?  
            product.categoryList.map( (i) => <option value={i.id} >{i.name}</option> )
            : "" 
        }
      </datalist>
      <Input onChange={e => setForm({ ...form, name: e.target.value })} required placeholder={"Nome do produto"}/>
      <Input onChange={e => setForm({ ...form, url1: e.target.value })} maxLength={254} required placeholder={"Url da foto do produto"}/>
      <Input onChange={e => setForm({ ...form, url2: e.target.value })} maxLength={254} placeholder={"Url da foto do produto"}/>
      <Input onChange={e => setForm({ ...form, url3: e.target.value })} maxLength={254} placeholder={"Url da foto do produto"}/>
      <Input onChange={e => setForm({ ...form, description: e.target.value })} required placeholder={"Descrição"}/>
      <Input onChange={e => setForm({ ...form, price: e.target.value })} type={"text"} maxLength={7} title={"Formato 0000,00 usar virgula não ponto"} pattern={"[0-9]{1,4},[0-9]{2}"} required placeholder={"Valor"}/>
      <Input onChange={e => setForm({ ...form, packingSize: e.target.value })} pattern="[0-9]" required placeholder={"Tamanho meddio do produto em cm L x A x C"}/>
      <button type={"submit"}>Enviar</button>
    </Form>
  );
}

function Remov() {
  const { setValue, SetProductData } = useContext(UserContext);
  const { productData } = useContext(ProductContext);

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

function ProductEnv() {
  const { setProduct, product } = useContext(ProductContext);
  const { setValue } = useContext(UserContext);

  function load() {
    const { token } = setValue();
    getProductPayd(token).then((i) => setProduct({ ...product, list: [...i] })).catch((i) => console.error(i));
  }
  useEffect(() => {
    load();
  }, []);
  async function atualization(id) { 
    const { token } = setValue();

    try {
      await updateProductPayCode(token, { code: product.code, id: id });  

      toast("Codigo de rastreamento enviado");
      load();
    } catch (error) {
      toast("Ouve um erro");
    };
  }
  async function send(id) {
    const { token } = setValue();
    try {
      await updateProductPayCode(token, { send: true, id: id });  
      toast("Produto entregue enviado");
      load();
    } catch (error) {
      toast("Ouve um erro");
    };
  }
  return (
    <Area>
      {
        product?.list && product?.list.length>0  ? product.list.map((i, index) => {
          return (
            <>
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
                  {i.code !== "" ? <> Codigo De envio: { i.code} </> : "" }
                  <Form onSubmit={(e) => { e.preventDefault(); atualization(i.id); }} >
                    <Input pattern={"^[A-Za-z0-9]{4,9}"} placeholder={"Codigo de envio"} onChange={ e => setProduct({ ...product, code: e.target.value })} ></Input>
                    <button type={"submit"}>Enviar</button>
                  </Form>
                </p>
                <button onClick={ () => send(i.id) } > Produto entregue </button>
              </Env>
            </>
          );
        })
          : "Ainda não a produtos para envio"
      }
    </Area>
  );
}

function Advertising() {
  const [ change, setChang ] = useState();
  const { setValue } = useContext(UserContext);
  const { productData } = useContext(ProductContext);
  async function env(id) {
    const { token } = setValue();
    try {
      await changeAdvertising({ id: id, text: change.text }, token);
      toast("Propaganda no lugar");
      window.location.reload();
    } catch (error) {
      toast("Ouve um erro");
    }
  }
  return(
    <>
      {
        change ?
          <ChangeAdvers>
            <BoxOwner>
              <Box onClick={ () => setChang("") }>
                { change.UrlImage.map((r) => { return (<img src={ r.urlImage } />); })}
                <p>{ change.name }</p>
              </Box>
            </BoxOwner>
            <Form onSubmit={(e) => { e.preventDefault(); env(change.id); }} >
              <Input placeholder={"Texto de apresentação do produto"} onChange={ e => setChang({ ...change, text: e.target.value })} ></Input>
              <button type={"submit"}>Enviar</button>
            </Form> 
          </ChangeAdvers>
          :
          <BoxOwner>
            {
              productData?.data ?
                productData.data.map((i) => {
                  return (
                    <Box key={i.id} onClick={ () => setChang({ ...i }) }>
                      {i.UrlImage.map((r) => { return (<img src={r.urlImage} />); })}
                      <p>{i.name}</p>
                    </Box>
                  );
                })
                : ""
            }
          </BoxOwner>
      }
    </>
  );
}

function RegisterAfi() {
  const [ change, setChang ] = useState();
  const { setValue } = useContext(UserContext);
  async function afiliat() {
    const { token } = setValue();
    try {
      const code = await postAfiliat({ email: change.email, cellPhone: change.cellPhone }, token);
      setChang({ ...change, code: code.code });
      toast("Afiliado(a) inserido!");
    } catch (error) {
      toast("Ouve um erro");
    }
  }
  return(
    <Afiliat>   
      <Form onSubmit={e => { e.preventDefault(); afiliat(); }}>
        <Input required type={"email"} placeholder={"E-mail"} onChange={e => setChang({ ...change, email: e.target.value })} />
        <Input required type={"text"} placeholder={"Numero de telefone"} maxLength={9} pattern={"[0-9]{8,9}"} onChange={e => setChang({ ...change, cellPhone: e.target.value })} />
        <button type={"submit"} > Cadastrar afiliado(a) </button>
      </Form>
      O codigo do afiliado aparece aqui {` => ${change?.code ? "code="+change.code : ""} <= `} basta colocalo ao final de cada link de produto.
    </Afiliat> 
  );
}

function SalesAmount() {
  const [ sold, setSold ] = useState();
  const { setValue } = useContext(UserContext);
  async function get() {
    const { token } = setValue();
    try {
      const list = await getProductSold(token);  
      setSold({ ...sold, list: list });
    } catch (error) {
    };
  }    
  useEffect(() => {
    get();
  }, []);
  return (
    <Area>
      {
        sold?.list && sold?.list.length>0  ? sold.list.map((i, index) => {
          return (
            <>
              <Env key={index}>
                <img src={i.Product.UrlImage[0].urlImage} />
                <p>
                  Name:        { i.Product.name} <br />
                  Comprador:   { i.User.name}    <br />
                  Email:       { i.User.email}   <br />
                  Preço:       { (i.Product.price/100).toFixed(2)} <br />
                </p>
              </Env>
            </>
          );
        })
          : "Ainda não a produtos vendidos"
      }
      Total de vendas R$ { sold?.list && sold?.list.length>0  ? ((sold.list.reduce((soma, i) => { return  soma + i.Product.price; }, 0))/100).toFixed(2)  : "" }
    </Area>
  );
}

function ListAfiliat() {
  const [ sold, setSold ] = useState();
  const { setValue } = useContext(UserContext);  
  async function get() {
    const { token } = setValue();
    try {
      const list = await getAfiliate(token);  
      setSold({ ...sold, list: list });
    } catch (error) {
    };
  }    
  useEffect(() => {
    get();
  }, []);
  return (
    <Afiliat>
      <span>
        {
          sold?.list && sold?.list.length>0  ? sold.list.map((i, index) => {
            return (
              <p>
                Email:  { i.email} <br/>
                code:   code={ i.code} <br/>
                Telefone:   { i.cellPhone} <br/>
                {i.SalesAffiliated.length>0 ? "Total vendido R$ "+(i.SalesAffiliated.reduce((soma, i) => { return  soma + i.value; }, 0)/100).toFixed(2) : ""}
              </p>
            );
          })
            : "Ainda não a afiliados"
        }
      </span>  
    </Afiliat>
  );
}
