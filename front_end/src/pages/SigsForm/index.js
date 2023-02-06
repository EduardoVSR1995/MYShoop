import Forms from "../../components/Forms/Forms";
import Bar from "../../components/Bar/Bar";
import { Link } from "react-router-dom";

import { shopName } from "../../services/api";

export default function SigsForm({ params }) {
  return(
    <>
      <Link to={ shopName }>
        <Bar>{ shopName.replace(/\//g, "") }</Bar>
      </Link>
      <Forms params={ params } />
    </>
  );
};
