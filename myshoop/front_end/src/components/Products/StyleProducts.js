import styled from "styled-components";

const Products = styled.div`
  display: flex ;
  flex-wrap: wrap;
  justify-content: space-evenly ;
  margin-top: 30px;
  div{
    display: flow-root ;
    
  }
`;

const BoxImage = styled.div`
  display: flex; 
  width: 13vw;
  overflow: scroll;
  div{
    img{
    height: 100%;
  }
    div{
      width: 0px ;
    }
  }
  @media (max-width: 1000px) {     
    margin: 0px ;
    width: 35vw;
    > div{
      width: 30vw ;
      > img{
        width: 30vw ;
      }
    }
  }
  
`;

const Box = styled.div`
  margin: 0px 5px 10px 5px  ;
  width: 13vw;
  height: 20vh;
  border-radius: 12px ;
  border: 1px solid #6666F0 ;
  display: flex ;
  img{
    border-radius: 15px ;
    width: 25vw;
    height: 80%;
  }
  div{
    margin: 5px ;
    height: 15%;
    overflow: auto ;
  }
`;

const BoxLayout = styled.div`
  margin: 0px 5px 10px 5px  ;
  width: 13vw;
  height: 25vh;
  border-radius: 12px ;
  border: 1px solid #6666F0 ;
  display: flex ;
  img{
    border-radius: 11px ;
    width: 100%;
    height: 80%;
  }
  div{
    margin: 5px ;
    height: 15%;
    overflow: auto ;
  }
  @media (max-width: 1000px) {        
    width: 25vw;
    height: 30vh;
    > div{
      font-size: 30px ;
    }
    
  }
`;

export { Products, Box, BoxImage, BoxLayout };
