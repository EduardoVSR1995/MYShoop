import styled from "styled-components";

const UserBox = styled.h1`
  width: 250px;
  display: flex;
  align-items: center ;
  justify-content: center;  
  color: #7E7E7E;
  
  img{
    border-radius: 50% ;
    height: 50px;
  }
  :hover{
    .hiden{
      display: flex;
      align-items: flex-end ;
      justify-content: center ;
      height: 50px ;
      width: 50px ;
    }
  }
  .hiden{
    display: none;
  }
  @media (max-width: 1000px) {    
    img{
      height: 100px ;
    }
    font-size: 30px ;
  }

`;

const Top = styled.div`
  background-color: #FFFFFF ;
  z-index: 1 ;
  position: fixed;
  top:0px;
  padding: 25px 25px 25px 0px;
  display: flex;
  align-items: center ;
  justify-content: space-evenly;
  height: 39px;
  width: 99vw ;
  div{
    margin-top: 0px;
    width: 20vw ;
  }
  span{
    width: 50vw;
    display: flex;
    align-items: center ;
    justify-content: flex-end;
    
    input{
    position: relative ;
    margin: 0px;
    height: 65px;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #7E7E7E;
    :focus{
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    ::placeholder{
      color: #7E7E7E;
    } 
  }

  img{
    position: absolute ;
    height: 39px;
    top: 20px;
    margin-right: 20px;
  }
}
@media (max-width: 1000px) {    
  top: 0px ;
  height: 110px ;
  div{
    width: 100% ;
    height: 150px ;
  }
  span{
    background-color: #FFFFFF ;
    width: 40vw ;
    input{
      padding-left: 20px ;
      text-align: start ;
      height: 120px ;
    }
    img{
      height: 80px ;
      width: 80px ;
      top: 40px ;
    }
   }
  }
`;

const Logout = styled.div`
 
`;

export { Logout, UserBox, Top };
