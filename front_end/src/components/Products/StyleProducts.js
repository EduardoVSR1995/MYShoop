import styled from "styled-components";

const Products = styled.div`
  display: flex ;
  flex-wrap: wrap;
  justify-content: space-evenly ;
  margin-top: 30px;
  div{
    display: flow-root ;
    div{
    }
    div{
    }
  }
`;

const BoxImage = styled.div`
  display: flex; 
  width: 20vw;
  overflow: scroll;
  div{
    img{
    height: 100%;
  }
    div{
      width: 0px ;
    }
  }
`;

const Box = styled.div`
  margin: 0px 5px 10px 5px  ;
  width: 20vw;
  height: 40vh;
  border-radius: 15px ;
  border: 1px solid #6666F0 ;
  display: flex ;
  img{
    border-radius: 15px ;
    width: 20vw;
    height: 80%;
  }
  div{
    margin: 5px ;
    height: 15%;
    overflow: auto ;
  }
`;

export { Products, Box, BoxImage };
