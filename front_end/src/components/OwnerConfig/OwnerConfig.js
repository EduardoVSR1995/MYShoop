import { useState } from "react";
import { BoxConfig, Sub } from "../Advertising/StyleAdvertising";
import { Dialog } from "../Dialog/Dialog";
import Choise from "./Choise";

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
