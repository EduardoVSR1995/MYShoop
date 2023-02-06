import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SigsForm from "./pages/SigsForm";

import { UserProvider } from "./contexts/UserContext";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import User from "./pages/User";
import { ProductProvider } from "./contexts/ProductContext";
import PageCreat from "./pages/PageCreat";

export default function App({ name }) {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <ProductProvider>
          <Router>
            <Routes>
              <Route path={"/"} element={<PageCreat />} />   
              {name.map(({ nameStore }) => { 
                return(
                  <>
                    <Route path={`/${nameStore}`} element={<Layout />} />
                    <Route path={`/${nameStore}/sign-in`} element={<SigsForm params={"signin"}/>} />
                    <Route path={`/${nameStore}/sign-up`} element={<SigsForm params={"signup"}/>} />
                    <Route path={`/${nameStore}/product/:id`} element={<Product />} />
                    <Route path={`/${nameStore}/user`} element={<User />} />   
                  </>
                );
              })
              }
            </Routes>
          </Router>
        </ProductProvider>  
      </UserProvider>
    </>
  );
}

