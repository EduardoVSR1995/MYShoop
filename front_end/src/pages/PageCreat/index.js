import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import note from "../../assets/images/notebook.png";
import screen from "../../assets/images/tela.png";
import { Dialog } from "../../components/Dialog/Dialog";
import { Form, Input } from "../../components/Forms/StyleForms";
import { postCreatShoop } from "../../services/posts";
import All from "../../index";
import { store } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

export default function PageCreat() {
  const [ dialog, setDialog ] = useState();
  const [ forms, setForms ] = useState();
  const { setValue } = useContext(UserContext);
  async function reload() {
    store().then((i) => {
      setForms({ ...forms, shoops: i });
    } );
  }
  useEffect(() => { 
    reload();
  }, [] );
  async function creat() {
    try {
      const user = await postCreatShoop(forms);
      setValue(user);
      await All();
      await reload();

      navigat("/"+forms.nameShop); 
      window.location.href="/"+forms.nameShop; 
    } catch (error) {
      toast("Ouve um erro");
    }
  }
  const navigat =  useNavigate();
  console.log(forms);
  return(
    <AllBox>
      { dialog ? 
        <Dialog setDialog={setDialog} >
          <Form onSubmit={ async(e) => { e.preventDefault(); await creat(); }} >
            <Input required type={"text"} maxLength={254} placeholder={"Url da foto"} onChange={e => setForms({ ...forms, url: e.target.value })} />
            <Input required placeholder={"Nome"} onChange={e => setForms({ ...forms, name: e.target.value })} />
            <Input required type={"email"} placeholder={"E-mail"} onChange={e => setForms({ ...forms, email: e.target.value })} />
            <Input required minLength={6} type={"password"} placeholder={"Senha"} onChange={e => setForms({ ...forms, password: e.target.value })} />
            <Input required maxLength={8} pattern={"^[0-9]{8}$"} type={"text"} placeholder="cep" onChange={e => setForms({ ...forms, cep: e.target.value })} />
            <Input required placeholder="Cidade" onChange={e => setForms({ ...forms, city: e.target.value })} />
            <Input required placeholder="Nome da rua" onChange={e => setForms({ ...forms, street: e.target.value })} />
            <Input required placeholder="Numero da casa" onChange={e => setForms({ ...forms, homeNumber: e.target.value })} />
            <Input required placeholder="Numero de telefone" onChange={e => setForms({ ...forms, phone: e.target.value })} />
            <Input required placeholder="Nome da loja" pattern={"^[aA-zZ]{2,8}$"} onChange={e => setForms({ ...forms, nameShop: e.target.value })} />
            <button type={"submit"} >Criar loja</button>
          </Form>
        </Dialog>: ""
      }  
      <Creat>
        <div>
          Crie sua loja online 
          <button onClick={ () => setDialog(true) }> Vamos começar  </button>
          <div>Ou entre em alguma de nossas lojas !!
            <div>
              {forms?.shoops ? forms.shoops.map((i) => <span onClick={() => { navigat("/"+i.nameStore); window.location.href="/"+i.nameStore; } } > {i.nameStore}</span>) : "" }
            </div>
          </div>
        </div>  
        <span>
          <img src={note}/>
          <img className="screen" src={screen}/>
        </span>
      </Creat>
    </AllBox>
  );
}

const AllBox = styled.div`
    span{
        margin-top: 0px;
        top: 15%;
        form{
            overflow: auto ;
            height: 95% ;
        }
    }

`;

const Creat = styled.span`
  margin: 0px !important ;
  height: 100vh ;
  background: linear-gradient(270.31deg, #FD4646 -3.73%, rgba(0, 10, 255, 0.5) 99.75%);    
  display: flex ;
  justify-content: space-around ;
  align-items: center ;
  color: #FFFFFF ;
  font-weight: 600 ;
  font-size: 50px ;
  > div{
    display: inline-grid;
    justify-content: center ;
    align-items: center ;
    width: 50% ;
    > div{
        margin: 20px 0px 0px 0px ;
        font-size: 20px ;
    > div{
        overflow: scroll ;
        height: 50px ;
        > span{
          color: #FFFFFF ;
          font-weight: 600 ;
          font-size: 20px ;    
          width: 201px;
          height: 52px;
          background: linear-gradient(270deg, #CF4D4D 0%, rgba(0, 26, 255, 0.49) 104.05%);
          border-radius: 10px;
        }
    }}

    button{
      color: #FFFFFF ;
      font-weight: 600 ;
      font-size: 20px ;    
      width: 201px;
      height: 52px;
      background: linear-gradient(270deg, #CF4D4D 0%, rgba(0, 26, 255, 0.49) 104.05%);
      border-radius: 10px;
    }
  }
  span{
    display: flex ;
    align-items: center ;
    justify-content: center;
    .screen{
      position: absolute ;
      width: 400px ;
      height: 220px ;
      border-radius: 20px ;
      margin-bottom: 25px ;
    }
    img{
  
      position: relative;
      width: 500px ;
      height: 500px ;
    }
  }
`;
