import styled from "styled-components";

const EnvPrice = styled.div`
max-width: 500px ;
height: 40px ;
display: flex;
align-items: center ;
justify-content: space-between ;
button{
  margin:20px 20px 0px 20px;
  border-style: none ;
  height: 40px ;
  background-color:#6666F0;
  border-radius: 10px ;  
  color: #FFFFFF
}
h2{
  margin: 90px 0px 0px 20px;
  font-size:20px ;
  display: flex;
  flex-wrap: wrap;
  align-items: center ;
  justify-content: center ;
  h3{
    margin-top: 50px ;
    display: flex;
    width : 500px ;
    align-items: center ;
    justify-content: center ;
    
    img{
      width: 30% ;
    }
    button{
      width:75%;

    }
  }
  button{
      width:40% ;
  }
}  
`;

const Quantiti = styled.div`
  display: flex;
  align-items: center ;
  justify-content: space-between ;
  margin: 20px 0px 0px 20px ;
  width: 150px;
  height: 50px ;
  border-radius: 10px ;
  button{
    color: #FFFFFF;
    background:#6666F0 ;
    border-radius: 10px ;  
    width: 40%;
    height: 50% ;
    display: flex;
    align-items: center ;
    justify-content: center;
  }
  
`;

const Apresentation = styled.div`
word-wrap: normal ;
width: 75% ;

h1{
  font-weight: 600;
  font-size: 30px;
   > h2{
    font-weight: 300 ;
  }
}
input{
  margin: 20px 0px 0px 20px ;
  width: 25% ;
}

`;

const SalesArea = styled.span`
margin: 150px 20px 20px 20px ;
width: 80% ;
display: flex;
align-items: flex-start ;
justify-content: center;

`;

const TopProduct = styled.span`
  div{
      top: 40px;
      background-color: #6666F0;
      border-radius: 20px ;
      h1{
          color: #FFFFFF ;
      }
  }
  top: 0px;
  width: 100vw;
  height: 130px ;
  background: #FFFFFF;
  position: fixed;
`;

export { TopProduct, SalesArea, Apresentation, Quantiti, EnvPrice };
