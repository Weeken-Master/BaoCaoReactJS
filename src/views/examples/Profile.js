import React from "react";
import ProfileUser from "API/user";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  return (
    <>
    {ProfileUser.login ? (
      <UserHeader name={ProfileUser.data.fullname}/>
    ) : (<></>)}
      
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src=
                        "https://bizweb.dktcdn.net/100/336/001/products/admin-10a1e959-c8a2-4964-87f1-a694c39e47ca.jpg?v=1555387211130"
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Đổi ảnh
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              {ProfileUser.login ? (
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{ProfileUser.data.countPost}</span>
                        <span className="description">Bài đăng</span>
                      </div>
                      <div>
                        <span className="heading">{ProfileUser.data.countCMT}</span>
                        <span className="description">Bình luận dạo</span>
                      </div>
                      </div>
                </div>
              </Row>
              ) : (<></>)}
                      
                   
                <div className="text-center">
                 
                  <hr className="my-4" />
                  <p>
                    Update cái này sau.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Xem toàn bộ
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Tài khoản của tôi</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Cài đặt
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin tài khoản
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên đăng nhập
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="username"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Địa chỉ Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="email@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Tên hiển thị
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Tên hiển thị"
                            id="input-first-name"
                            placeholder="tên hiển thị"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">

                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                 
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Giới thiệu</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Thông tin</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="Thông tin"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
