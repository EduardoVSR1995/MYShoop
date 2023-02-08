import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductContext from "../../contexts/ProductContext";
import UserContext from "../../contexts/UserContext";
import { deleteProductStore } from "../../services/delet";
import { getProductPayd } from "../../services/getInfos";
import { updateProductPayCode } from "../../services/patch";
import { posCreatProduct, postAfiliat } from "../../services/posts";
import { changeAdvertising, getCategoris } from "../../services/product";
import { BoxOwner, ChangeAdvers } from "../Advertising/StyleAdvertising";
import { Area, Env } from "../EnvArea/EnvArea";
import { Afiliat, Form, Input } from "../Forms/StyleForms";
import { Box } from "../Products/StyleProducts";

export default function Choise({ choise }) {
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
        <Input list="selectOption" onChange={e => setForm({ ...form, category: e.target.value })} type={"text"} placeholder={"Categoria"}/>
        <datalist id="selectOption">
          { 
            product?.categoryList ?  
              product.categoryList.map( (i) => <option value={i.id} >{i.name}</option> )
              : "" 
          }
        </datalist>
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
                    {i.code !=="" ? <> Codigon De envio: { i.code} </> : "" }
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
  if (choise === "advertising") {
    const [ change, setChang ] = useState();
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
  if ( choise === "registerAfi" ) {
    const [ change, setChang ] = useState();
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
    console.log(change);
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
}
