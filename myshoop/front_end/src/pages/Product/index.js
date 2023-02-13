import Top from "../../components/Top/Top";
import Sales from "../../components/SalesArea/Sales";
import { TopProduct } from "../../components/SalesArea/StyleSalesArea";

export default function Product() {
  return(
    <>
      <TopProduct>
        <Top />
      </TopProduct>
      <Sales />
    </>
  );
};
