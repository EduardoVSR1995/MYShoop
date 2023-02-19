import styled from "styled-components";

const Basket = styled.div`

  width: 90% ;
  display: flex;
  justify-content: end;  
  margin: 0px 0px 20px 0px ;
  div{
    position: relative ;
    background: #6666F0;
    width: 25px;
    height: 25px ;
    bottom: 15px;
    border-radius: 50% ;
    color: #FFFFFF ;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img{
    mix-blend-mode:multiply;
    position:absolute ;
    width: 25px ;
  }
  @media (max-width: 1000px) {        
    > div{
      font-size: 40px;
      width: 80px ;
      height: 80px ;
      bottom: 40px ;
    }
    > img{
      width: 80px ;
    }
  }

`;

const Advertising = styled.div`
  margin: 130px 0px 130px 20px ;
  
  .merchan{
    overflow: scroll;
    display: flex;
    width: 100%;
    width: 100% ;
    

  span{
    width: 100vw !important ;
    display: flex;
    align-items: center;
    justify-content: center;
    
      h1{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        margin: 20px ;
        height: 90% ;
        width: 100%;  
        > div{
          height: 50px ;
        }
      }
      h2{
        width: 60%;
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        color: #7E7E7E;
      }
      > div{
        height: 100% ;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      
          img{
            max-height: 100% ;
            width: 15vw;
          }
      }
    }
  }
  @media (max-width: 1000px) {        
    margin: 200px 0px 130px 20px ;
    .merchan{
        span{
          h1{
            width: 60%;  
            font-size: 60px;
            > a{
              width: 50% ;
              > div{
                height: 100px ;
              }
            }
            > h2{
              font-size: 45px;
              
            }  
          }
        > div{
          width: 40%;
            img{
              height: 100% ;
              width: 100%;
            }
        }
      }
      
    }
  }
`;

const Sub = styled.div`
  margin: 100px 0px 30px 0px ;
  background-color: #6666F0;
  width: 200px;
  height: 50px;
  border-radius: 10px ;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1000px) {        
    width: 300px;
    height: 100px;
    font-size: 40px ;
  }
`;

const BoxConfig = styled.div`
  span{
    width: 97vw ;
    span{
      top: 180px ;
      left:0px ;
      width: 300px ;
      flex-wrap: wrap ;
      align-items: flex-start ;
      text-align: center ;
      font-size: 20px ;
      form{
        overflow: scroll ;
        height: 98% ;
      }
      h1{
        :hover{
          background: grey ;
          border-radius: 20px ; 
        }
        margin: 10px;
        width: 100vw;
      }
      div{
        opacity: 0;
        left: 0px ;
        position: fixed ;
        
      }
      span{
          left:300px ;
          top: 180px;
          position: fixed ;
          span{
            top: 180px;
            position: fixed ;
            width: 75vw;
            right: 200px ;
          }
        }
    }
  }  
  
`;

const BoxOwner = styled.span`
  height: 70vh ;
  opacity: 1 ;
  overflow: scroll !important ;
  display: flex;
  justify-content: space-around ;
  > div{
    padding: 0px ;
    opacity: 1 !important;
    position: initial !important;
    overflow: auto ;
    width: 170px ;
    display: initial ;
    > img{
      width: 100%;
      height: 100% ;
    }
    div{
      opacity: 1 ;
    }
  }
  p{
    overflow: scroll;
  }
`;

const ChangeAdvers = styled.span`
  height: 40vh;
  opacity: 1 !important ;
  > span{
    height: 40vh ;
    display: flex ;
    justify-content: flex-start ;
    div{
      width: 350px ;
    }
  }  
  > form{
    top: 100px;
    right: 0px ;
    position: absolute ;
    height: 130px !important;
    width: 60% ;

  }
`;

export { BoxOwner, ChangeAdvers, BoxConfig, Basket, Advertising, Sub };
