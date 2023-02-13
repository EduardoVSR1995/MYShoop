import styled from "styled-components";

const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
width: 100vw;

h1{
  margin: 20px 0px 0px 0px;
  font-size: 20px;
}
button{
  color: #FFFFFF ;
  margin: 20px 0px 0px 0px ;
  width: 70.5vw;
  height: 35px;
  border-radius: 10px;
  background: #6666F0;
  font-weight: 400;
  font-size: 20px;
  line-height: 18px;
}
select option{
  background: red !important ;
  height: 222px !important;
  position: fixed !important;
  width: 111px !important;
  
}

a{
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color:#6666F0;  
  text-decoration: none ;
  margin: 20px 0px 0px 0px ;
  width: 100vw ;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

const Input = styled.input`
  margin: 20px 0px 0px 0px ;
  width: 70vw;
  height: 35px;
  border-radius: 10px;
  background: #C8C8F4;
  border: 0 none;
  text-align: center ;
  color: #FFFFFF;
  font-weight: 400;
  font-size: 20px;
  line-height: 18px;
:focus{
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}
::placeholder{
  color: #FFFFFF;
}
`;

const Afiliat = styled.span`
  margin-top: 120px ;
  width: 200px ;
  
  form{
    width: 100% ;
    margin: 0px 0px 20px 0px ;
  }
  
  > span{
    width: 100%;
    height: 70vh;
    overflow: scroll;
    border-radius: 20px;
    p{
      width: 300px ;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      text-align: initial ;
      justify-content: flex-start;
      align-items: center;
    }
  }

  
`;

export { Form, Input, Afiliat };
