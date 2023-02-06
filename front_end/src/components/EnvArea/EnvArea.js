import styled from "styled-components";

const Area = styled.span`
  height: 70%;
  border-radius: 20px ;
  overflow: scroll;
  opacity: 1;
`;

const Env = styled.span`
   position: initial !important;
   display: flex ;
   width: 100%;
   img{
    height: 250px ; 
   }
   p{
    width: 80% ;
    word-wrap: wrap ;
    height:100px;
    text-align: initial ;
    font-size: 20px ;
    font-weight: 600 ;
   }
`;

export { Area, Env };
