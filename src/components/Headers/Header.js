
import React from "react";

import { Container} from "reactstrap";
import Carousel from "../Carousel/Carousel";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Carousel/>
        </Container>
      </div>
    </>
  );
};

export default Header;
