import { useEffect, useState } from "react";
import note from "../../assets/images/notebook.png";
import screen from "../../assets/images/tela.png";
import { store } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Creat } from "./CreatArea";
import Forms from "../Forms/Forms";
import { Dialog } from "../Dialog/Dialog";

export default function Page() {
  const [ dialog, setDialog ] = useState();
  const [ forms, setForms ] = useState();

  async function reload() {
    store().then((i) => {
      setForms({ ...forms, shoops: i });
    } );
  }
  useEffect(() => { 
    reload();
  }, [] );
  
  const navigat =  useNavigate();
  return(
    <>
      {
        dialog ? 
          <Dialog setDialog={setDialog} >
            <Forms params={"create"} />
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
    </>
  );
}
