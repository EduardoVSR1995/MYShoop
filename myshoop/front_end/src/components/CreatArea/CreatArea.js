import styled from "styled-components";

const AllBox = styled.div`
span{
    margin-top: 0px;
    top: 15%;
    form{
        overflow: auto ;
        height: 95% ;
    }
}

`;

const Creat = styled.span`
  margin: 0px !important ;
  height: 100vh ;
  background: linear-gradient(270.31deg, #FD4646 -3.73%, rgba(0, 10, 255, 0.5) 99.75%);    
  display: flex ;
  justify-content: space-around ;
  align-items: center ;
  color: #FFFFFF ;
  font-weight: 600 ;
  font-size: 50px ;
  > div{
  display: inline-grid;
  justify-content: center ;
  align-items: center ;
  width: 50% ;
  > div{
      margin: 20px 0px 0px 0px ;
      font-size: 20px ;
    > div{
        overflow: scroll ;
        height: 50px ;
        > span{
          color: #FFFFFF ;
          font-weight: 600 ;
          font-size: 20px ;    
          width: 201px;
          height: 52px;
          background: linear-gradient(270deg, #CF4D4D 0%, rgba(0, 26, 255, 0.49) 104.05%);
          border-radius: 10px;
        }
      } 
    }
  
    button{
      color: #FFFFFF ;
      font-weight: 600 ;
      font-size: 20px ;    
      width: 201px;
      height: 52px;
      background: linear-gradient(270deg, #CF4D4D 0%, rgba(0, 26, 255, 0.49) 104.05%);
      border-radius: 10px;
    }
  }
  span{
    display: flex ;
    align-items: center ;
    justify-content: center;
    width: 500px ;
    height: 500px ;
    .screen{
      position: absolute ;
      width: 400px ;
      height: 220px ;
      border-radius: 20px ;
      margin-bottom: 25px ;
    }
    img{
      position: relative;
      width: 100% ;
      height: 100% ;
    }
  }
  
  @media (max-width: 1000px) {
    flex-wrap: wrap ;
    justify-content: center ;      
    > div{
          font-size: 90px ;
          width: 100% ;
          height:40% ;
          > button{
            font-size: 40px ;
            height:100% ;
            width: 100vw ;

          }
          > div{
            font-size: 50px ;
            >div{
              height: 20vh ;
              width: 100% ;  
            > span{
              font-size: 40px ;
              height:100px ;
              width: 100% ;   
              }
            }
          }
        }  
        > span{
            height:50vh ;
            width: 100vw ;   
            > img{
              width: 100vw;   
              height: 100%;
            }
            > .screen{
              height: 22vh;
              width: 80vw;
          }
        }
    }
  
`;
export { Creat, AllBox };
