import Formpage from "./components/Formpage";
import AddCompany from "./components/AddCompany";

import "./styles.css";
import { useState } from "react";
import data from "./data";

const App = () => {
  const [show, setShow] = useState(true);
  const [compData, setCompData] = useState(data);

  if (show) {
    return (
      <Formpage
        show={show}
        handleShow={setShow}
        compData={compData}
        setCompData={setCompData}
      />
    );
  } else {
    return <AddCompany show={show} handleShow={setShow} datas={compData} />;
  }
};

export default App;
