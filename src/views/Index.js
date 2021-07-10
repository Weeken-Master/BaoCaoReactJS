
import React, { useEffect, useState} from "react";
import './style.css';
import Chart from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col, Modal, ModalBody, ModalFooter,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Chatbox from "components/Chatbox";
import { getCount } from "API/api";


const Index = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [count, setCount] = useState([]);

  const submitAPI = () =>{
    return getCount("/count-theme")
  }

  useEffect(async()=> {
		try{
			const result = await submitAPI();
			setCount(result.data);
		} catch{
		}
	},[]);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="text-white mb-0">Chat Tổng</h3>
                  </div>
                </Row>
              </CardHeader>
              {/* chat */}
              <Chatbox/>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Thống Kê Số Lượng Thành Viên
                    </h6>
                    {/* <h2 className="mb-0">Số Lượng Thành Viên</h2> */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Thông Báo</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={toggle} size="sm">
                      Tình hình dịch Covid
                    </Button>
                  </div>
                  <Modal isOpen={modal} toggle={toggle} backdrop={"static"} keyboard={true}>
                      
                      <ModalBody>
                      <iframe src="https://coccoc.com/search?query=covid&shared=1&showCoronaMap=1&tab=2" id="static-covid"></iframe>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Đóng</Button>
                      </ModalFooter>
                    </Modal>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên Bài Viết</th>
                    <th scope="col">Chủ Đề</th>
                    <th scope="col">Người Đăng</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Test tên bài viết</th>
                    <td>Test chủ đề</td>
                    <td>test người đăng</td>
                  </tr>

                  <tr>
                    <th scope="row">Test tên bài viết</th>
                    <td>Test chủ đề</td>
                    <td>test người đăng</td>
                  </tr>
                  
                  {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                  {/* <i className="fas fa-arrow-up text-success mr-3" /> 50,87% */}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Bài Viết</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Đăng</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {count.map((item, key) => (
                    <>
                  <tr>
                    <th scope="row">{item.name}</th>
                    <td>{item.number}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{Math.ceil(item.number / item.sum * 100)}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={Math.ceil(item.number / item.sum * 100)}
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                    </>
                  ))}

                  {/* <tr>
                    <th scope="row">Thông Báo</th>
                    <td>10,1</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <Progress max="100" value="90" />
                        </div>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
