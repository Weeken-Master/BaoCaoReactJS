
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


const Maps = () => {
  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
            {/* <iframe src="https://coccoc.com/search?query=covid&shared=1&showCoronaMap=1&tab=2"></iframe> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
