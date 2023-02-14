import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { Form, Input } from "./StyleForms";

import { shopName } from "../../services/api";
import { toast } from "react-toastify";
import { signUp, signin } from "../../services/userConnectApi";
import ProductContext from "../../contexts/ProductContext";
import { paydPix } from "../../services/pay";
import { removCart } from "../../services/delet";
import { postCreatShoop } from "../../services/posts";
import All from "../..";

export default function Forms({ params, type }) {
  if (params === "signin") {
    return <Signin />;
  };
  if (params === "signup") {
    return <Signup />;
  };
  if (params === "dialog") {
    return <Dialog type={type}/>;     
  };
  if( params === "create") {
    return <CreatArea />;
  };
};

function Signin() {
  const [forms, setForms] = useState({});
  const { setValue } = useContext(UserContext);
  const navigate = useNavigate();

  async function form(forms) {
    try {
      const user = await signin(forms.email, forms.password);
      setValue(user);
      navigate(shopName);
      toast("Login realizado");
    } catch (error) {
      toast("Loguin não realizado");
    }
  }
  return (
    <Form onSubmit={e => {e.preventDefault(); form( forms);}}>
      <Input required type={"email"} placeholder={"E-mail"} onChange={e => setForms({ ...forms, email: e.target.value })} />
      <Input required type={"password"} placeholder={"Senha"} onChange={e => setForms({ ...forms, password: e.target.value })} />
      <button type={"submit"} value={"Submit"}>Entrar</button>
      <Link to={shopName + "/sign-up"} >Criar conta</Link>
    </Form>
  );
}

function Signup() {
  const [forms, setForms] = useState({});
  const { setValue } = useContext(UserContext);
  const navigate = useNavigate();

  async function form(forms) {
    try {
      if(!forms.name || !forms.url || !forms.email || !forms.password) return Error;
      const user = await signUp( forms.name, forms.url, forms.email, forms.password);
      setValue(user);
      navigate(shopName);
      toast("Login realizado");
    } catch (error) {
      toast("Loguin não realizado");
    }
  };

  function verifi(e, forms) {
    e.preventDefault();
    if (forms.password !== forms.confirmPassword) return alert("As senhas tem que ser iguais");
    return form(forms);
  };

  return (
    <Form onSubmit={e => verifi(e, forms) }>
      <Input required type={"text"} maxLength={254} placeholder={"Url da foto"} onChange={e => setForms({ ...forms, url: e.target.value })} />
      <Input required placeholder={"Nome"} onChange={e => setForms({ ...forms, name: e.target.value })} />
      <Input required type={"email"} placeholder={"E-mail"} onChange={e => setForms({ ...forms, email: e.target.value })} />
      <Input required minLength={6} type={"password"} placeholder={"Senha"} onChange={e => setForms({ ...forms, password: e.target.value })} />
      <Input required minLength={6} type={"password"} placeholder={"Confirme a senha"} onChange={(e) => setForms({ ...forms, confirmPassword: e.target.value })} />
      <button type={"submit"} >Criar conta</button>
      <Link to={shopName + "/sign-in"} >Log in</Link>
    </Form>
  );
}

function CreatArea() {
  const [forms, setForms] = useState({});
  const { setValue } = useContext(UserContext);
  const navigate = useNavigate();

  async function creat() {
    try {
      const user = await postCreatShoop(forms);
      toast("Criamos sua loja!!");
      setValue(user, "/"+forms.nameShop );
      await All();
      navigate("/"+forms.nameShop);
      window.location.href= "/"+forms.nameShop;
    } catch (error) {
      toast("Ouve um erro");
    }
  }

  return(
    <Form onSubmit={ async(e) => { e.preventDefault(); await creat(); }} >
      <Input required type={"text"} maxLength={254} placeholder={"Url da foto"} onChange={e => setForms({ ...forms, url: e.target.value })} />
      <Input required placeholder={"Nome"} onChange={e => setForms({ ...forms, name: e.target.value })} />
      <Input required type={"email"} placeholder={"E-mail"} onChange={e => setForms({ ...forms, email: e.target.value })} />
      <Input required minLength={6} type={"password"} placeholder={"Senha"} onChange={e => setForms({ ...forms, password: e.target.value })} />
      <Input required maxLength={8} pattern={"^[0-9]{8}$"} type={"text"} placeholder="cep" onChange={e => setForms({ ...forms, cep: e.target.value })} />
      <Input required placeholder="Cidade" pattern={"[aA-zZ]{2, 20}"} onChange={e => setForms({ ...forms, city: e.target.value })} />
      <Input required placeholder="Nome da rua" pattern={"[aA-zZ]{2, 20}"} onChange={e => setForms({ ...forms, street: e.target.value })} />
      <Input required placeholder="Numero da casa" pattern={"[0-9]{1,5}"} onChange={e => setForms({ ...forms, homeNumber: e.target.value })} />
      <Input required placeholder="Numero de telefone" maxLength={11} pattern={"[0-9]{10,11}"}  onChange={e => setForms({ ...forms, phone: e.target.value })} />
      <Input required placeholder="Nome da loja" pattern={"^[aA-zZ]{2,8}$"} maxLength={8} onChange={e => setForms({ ...forms, nameShop: e.target.value })} />
      <button type={"submit"} >Criar loja</button>
    </Form>
  );
}

function Dialog({ type }) {
  const [forms, setForms] = useState({});
  const { userData } = useContext(UserContext);
  const { productData } = useContext(ProductContext);
  async function form(forms) {
    try {
      if(type) {
        removCart(type, userData.token);
        return;
      };
      setForms({ ...forms, activ: true });
      toast("Aguarde o QR Code");
      const imgPix = await paydPix(
        userData.token,
        productData.id,
        productData.cont,
        forms.fone,
        forms.street,
        forms.city,
        forms.homeNumber,
        forms.cep,
        userData.code,
      );
      const valid = imgPix.imgQrcod ? setForms({ ...forms, imgQrcod: imgPix.imgQrcod }) : "";
      
      return;
    } catch (error) {
      setForms({ ...forms, activ: false });
      toast("Ouve um erro");
    }
  }
  return (
    forms.imgQrcod ?
      <img src={forms.imgQrcod} />
      :
      <Form onSubmit={e => { e.preventDefault(); const i = forms.activ ? "" : form(forms);}}>
        <Input required maxLength={8} pattern={"^[0-9]{8}$"} type={"text"} placeholder="cep" onChange={e => setForms({ ...forms, cep: e.target.value })} />
        <Input required placeholder="Cidade" onChange={e => setForms({ ...forms, city: e.target.value })} />
        <Input required placeholder="Nome da rua" onChange={e => setForms({ ...forms, street: e.target.value })} />
        <Input required placeholder="Numero da casa" onChange={e => setForms({ ...forms, homeNumber: e.target.value })} />
        <Input required placeholder="Numero de telefone" maxLength={11} pattern={"[0-9]{10,11}"} onChange={e => setForms({ ...forms, fone: e.target.value })} />
        <h1>Total do pedido R$ {(productData.price / 100).toFixed(2)} </h1>
        <button type={"submit"}>Finalizar compra</button>
      </Form>
  );
}
