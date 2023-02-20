import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export function Dialog({ setDialog, children, load }) {
  const { userData } = useContext(UserContext);
  
  return (
    <AllBox>
      <DialogBox onClick={() => { setDialog(""); const i = load ? load(userData.token) : "";}} />
      <ComandBox >
        {children}
      </ComandBox>
    </AllBox>
  );
};

const AllBox = styled.span`
    display: flex ;
    justify-content: center ;
    margin-top: 5vw ;
    
`;

const ComandBox = styled.span`
    display: flex ;
    justify-content: center ;
    align-items:center ;
    z-index: 3;
    position: absolute ;
    width: 80vw ;
    height: 70%; 
    border-radius: 20px ;
    background: #FFFFFF ;
    @media (max-width: 1000px) {   
      width: 100vw ;
      h1{
        font-size: 50px ;
      }   
      > img{
        width: 1000px ;
      }
    }
`;

const DialogBox = styled.div`
    z-index:2 ;
    top: 0;
    position: absolute;
    width: 100vw ;
    height: 100vh;
    background: #000000 ;
    opacity: 0.8 ;
  
`;
