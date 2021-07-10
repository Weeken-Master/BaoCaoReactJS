import {React, useState, useEffect} from "react";
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
import { RegisterAPI } from "API/api";
import { useHistory } from "react-router-dom";
import { getSetting } from "API/api";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const submitSetting=()=>{
  return getSetting('/home')
}

const Register = () => {
  const [info, setInfo] = useState({ username:"", password:"", email:"",fullname:""})
  const history = useHistory();
  const [setting, setSetting] = useState();

  useEffect(async()=>{
    try {
      const result = await submitSetting()
      setSetting(result.data)
    } catch (error) {
      
    }
  },[])
  const onValueUsername = (e) =>{
    setInfo((prev) => ({...prev, username: e.target.value.trim()}))
  }
  const onValuePassword = (e) =>{
    setInfo((prev) => ({...prev, password: e.target.value.trim()}))
  }
  const onValueEmail = (e) =>{
    setInfo((prev) => ({...prev, email: e.target.value.trim()}))
  }
  const onValueFullName = (e) =>{
    setInfo((prev) => ({...prev, fullname: e.target.value.trim()}))
  }

  const Container = wrapComponent(function({ createSnackbar }) {
    function showSnackbar(message, theme) {
        createSnackbar({
            message: message,
            dismissable: false,
            pauseOnHover: false,
            progressBar: true,
            sticky: false,
            theme: theme,
            timeout: 5000
        });
    }

    const postRegisterAPI = (data) => {
      return RegisterAPI('/register', data);
    }

    
    const onSubmit = async()=>{
      if(setting.StatusRegister !== 0){
        showSnackbar('Đang khóa đăng kí tài khoản', 'error');
        return;
      }
      const data = new FormData();
      //kiểm tra xem dữ kiệu nhập vào đáp ứng yêu cầu
      if(!info.username || !info.password || !info.email || !info.fullname){
        showSnackbar('Thông tin không được để trống', 'error');
        return;
      }
      if(info.username.indexOf(' ') != -1 || info.password.indexOf(' ') != -1){
        showSnackbar('Tên tài khoản và mật khẩu không chứa khoảng trắng', 'error');
        return;
      }
      //kiểm tra email
      const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
      if (!filter.test(info.email)) { 
        showSnackbar('Email không hợp lệ', 'error');
        return;
      }
      
      data.append("username", info.username);
      data.append("password", info.password);
      data.append("email", info.email);
      data.append("fullname", info.fullname);
      
      try {
         const result = await postRegisterAPI(data);
         if(result.data != "Fail"){
            showSnackbar('Đăng Kí Thành Công', 'success');
            history.push('./dang-nhap');
         }
         else{
          showSnackbar('Tài Khoản Đã Tồn Tại', 'error');
         }
      } catch (error) {
          showSnackbar('Tài Khoản Đã Tồn Tại', 'error');
      }
    }
    return (
      <>
        <Button className="mt-4" color="primary" type="button" onClick={onSubmit}>
          Đăng Kí
        </Button>
      </>
  );

  });


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Đăng nhập với</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Hoặc đăng kí bằng thông tin</small>
            </div>
            <Form role="form">
              <FormGroup>
             
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Tên Tài Khoản" type="text" name="username" onChange={onValueUsername}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email" name="email" onChange={onValueEmail}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật Khẩu"
                    type="password"
                    autoComplete="new-password" name="password" onChange={onValuePassword}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>     
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Họ Và Tên" type="text" name="fullname" onChange={onValueFullName}/>
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        Tôi đồng ý với{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Điều Khoản
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                  <SnackbarProvider position="bottom-left">
                      {/* nút đăng kí */}
                      <Container />
                  </SnackbarProvider>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
