import styled from "styled-components";

const Area = styled.span`
  height: 70%;
  border-radius: 20px ;
  overflow: scroll;
  opacity: 1;
  @media (max-width: 1000px) {        
        h2{
          font-size: 40px ;
        }
    }
  
`;

const SoldList = styled.span`
  height: 70%;
  border-radius: 20px ;
  overflow: scroll;
  opacity: 1;
  > span{
    height: 18vh ;
    border: solid 1px #000000 ;
    > img{
      height: 100% ;
    }
  }

  @media (max-width: 1000px) {   
    h2{
      width: 90% ;
      font-size: 30px ;
    }
  }
  
`;

const Env = styled.span`
   position: initial !important;
   display: flex ;
   flex-wrap: initial !important;
   width: 100%;
   height: 25vw ;
   img{
    width: 100px ;
   }
   p{
    width: 80% ;
    word-wrap: wrap ;
    height:100px;
    text-align: initial ;
    font-size: 20px ;
    font-weight: 600 ;
   form{
     height: 30px;
     width: 100% ;
      input{
        margin: 0px ;
      }
      button{
        margin: 0px ;
      }

     }
   }
   > button{
    background-color: #6666F0 ;
    width: 200px ;
    height: 100% ;
    margin: 0px ;
   }
  
   
`;

export { Area, Env, SoldList };
