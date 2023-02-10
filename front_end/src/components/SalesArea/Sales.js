import { Input } from "../Forms/StyleForms";
import { Box, BoxImage } from "../Products/StyleProducts";
import { Dialog } from "../Dialog/Dialog";
import { Apresentation, SalesArea, EnvPrice, Quantiti } from "./StyleSalesArea";
import { useContext, useEffect, useState } from "react";
import FormDialog from "../Forms/Forms";
import UserContext from "../../contexts/UserContext";
import ProductContext from "../../contexts/ProductContext";
import { getOneProduct } from "../../services/getInfos";
import { useNavigate } from "react-router-dom";
import { shopName } from "../../services/api";
import { postCart } from "../../services/posts";

import { postFret } from "../../services/postFret";
import { removCart } from "../../services/delet";
import { toast } from "react-toastify";

export default function Sales({ type, load }) {
  const [dialog, setDialog] = useState();
  const [product, setProduct] = useState({ cont: 1 });
  const { userData } = useContext(UserContext);
  const { productData, setProductData } = useContext(ProductContext);

  const id = type ? type : window.location.pathname.split("/")[3];

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const navigate = useNavigate();

  const page = product.cont === 0 ?
    navigate(shopName)
    :
    product.cont;

  function DialogBox() {
    if (!dialog) {
      return;
    };
    return (
      <Dialog setDialog={setDialog} load={load} >
        <FormDialog params={"dialog"} type={type}/>
      </Dialog>
    );
  };
  function getProduct(id) {
    const select = getOneProduct(id)
      .then((value) => {
        setProduct({ ...value, cont: product.cont });
      })
      .catch((i) => console.error(i));
  };

  function fret(id, quantiti, cep) {
    if (cep.length !== 8 || !Number(cep)) {
      alert("Cep tem que ter oito caracteres e todos numericos");
      return 0;
    };
    postFret(id, quantiti, cep)
      .then((i) => {
        setProduct({
          ...product,
          fret: (parseInt((i[0].Valor).replace(",", ""))),
          dais: i[0].PrazoEntrega
        });
      })
      .catch((i) => console.error(i));
  }

  function transition() {
    setProductData({
      ...productData,
      cont: product.cont,
      price: product.price + product.fret,
      id: product.id,
      cep: product.cep
    });
    setDialog(true);
  }
  return (
    <>
      <DialogBox />
      <SalesArea>
        <BoxImage>
          {
            product.UrlImage?.map((i, index) => {
              return (
                <Box key={index}>
                  <img src={i.urlImage} />
                </Box>
              );
            })
          }
        </BoxImage>
        <Apresentation>
          <h1>
            {product?.name}
            <h2>{product?.description}</h2>
          </h1>
          {type ?
            ""
            :
            <Quantiti>
              <button onClick={() => {
                setProduct({ ...product, cont: product.cont - 1 });
              }}>
                -
              </button>
              <h2>{product?.cont}</h2>
              <button onClick={() => {
                setProduct({ ...product, cont: product.cont + 1 });
              }}>
                +
              </button>
            </Quantiti>
          }
          <EnvPrice>
            <Input type="text" maxLength={8} onChange={e =>
              setProduct({ ...product, cep: e.target.value })} />
            <button onClick={() => fret(id, product.cont, product.cep)}>
              Digite o cep para saber o preço do frete
            </button>
          </EnvPrice>
          <EnvPrice>
            <h2>
              R$ {(product.cont * (product?.price / 100)).toFixed(2)}
              {product.dais ?
                <> Seu produto chegara em {product.dais} dias <br />
                  Com o valor do frete ${(product.fret / 100).toFixed(2)} </>
                :
                " Coloque o cep a acima"}

              <button onClick={ async() =>
                type ?
                  removCart(id, userData.token)
                    .then(() => {toast("Seu item foi removido com sucesso"); load(userData.token); })
                    .catch((i) => { console.error(i); toast("Há um erro, tente novamente."); })
                  :
                  (await postCart(product.id, product.cont, userData.token)).length === 0 ?
                    toast("Seu item foi adicionado com sucesso")
                    :
                    toast("Há um erro, tente novamente.")
              }>
                {type ? "Retirar Do carrinho" : "Colocar no carrinho"}
              </button>
              <button onClick={() => {
                product?.fret ?
                  transition()
                  :
                  setProduct({ ...product });
              }}>
                Finalizar compra
              </button>
            </h2>
          </EnvPrice>
        </Apresentation>
      </SalesArea>
    </>
  );
};
