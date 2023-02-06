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

export { Form, Input };
