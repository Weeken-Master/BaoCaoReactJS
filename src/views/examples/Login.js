import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {postAPI} from "../../API/api";
import { useHistory } from "react-router-dom";

import ProfileUser from "API/user";
import Token from "API/token";

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
    NavLink,
} from "reactstrap";
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';

const Login = () => {
    //NẾU ĐÃ ĐĂNG NHẬP Thì Không vào được trang
    const history = useHistory();
    if(ProfileUser.login)
        history.push("/home");

    const submitLoginAPI = (data) =>{
        localStorage.removeItem('token');
        return postAPI("/login", data);
    }

    const [info, setInfo] = useState({ username:"", password:""})
    const onValueUsername = (e) =>{
        setInfo((prev) => ({...prev, username: e.target.value}))
    }
    const onValuePassword = (e) =>{
        setInfo((prev) => ({...prev, password: e.target.value}))
    }

    const Container = wrapComponent(function({ createSnackbar }) {
        function showSnackbarError() {
            createSnackbar({
                message: 'Thông tin tài khoản không chính xác',
                dismissable: false,
                pauseOnHover: false,
                progressBar: true,
                sticky: false,
                theme: 'error',
                timeout: 2000
                });
            }

        const onSubmit = async()=>{
            const data = new FormData();
            data.append("username", info.username);
            data.append("password", info.password);

            try{
                const result = await submitLoginAPI(data);

                if(result.data != "Fail"){
                    localStorage.setItem("token", result.data.token);
                    Token.die = false;
                    history.push("/home");
                }
                else
                    showSnackbarError(); 
            } catch(e){
                showSnackbarError();
            }
        }

        return (
            <>
            <Button className="my-4" color="primary" type="button" onClick={onSubmit}>
                Đăng Nhập
            </Button>
            </>
        );
    });

    return (
    <>
        <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                        <small>Đăng nhập với</small>
                    </div>
                    <div className="btn-wrapper text-center">
                        <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <span className="btn-inner--icon">
                                <img alt="..." src={ require("../../assets/img/icons/common/github.svg").default}/>
                            </span>
                            <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <span className="btn-inner--icon">
                                <img alt="..." src={require("../../assets/img/icons/common/google.svg").default}/>
                            </span>
                            <span className="btn-inner--text">Google</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small>Hoặc sử dụng tài khoản có sẵn</small>
                    </div>
                    <Form role="form">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="UserName" type="email" name="username" autoComplete="new-email" onChange={onValueUsername} />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Password" type="password" name="password" autoComplete="new-password" onChange={onValuePassword} />
                            </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                            <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                            <label className="custom-control-label" htmlFor=" customCheckLogin">
                                <span className="text-muted">Ghi Nhớ</span>
                            </label>
                        </div>
                        <div className="text-center">
                            <SnackbarProvider position="bottom-left">
                                {/* nút đăng nhập */}
                                <Container />
                            </SnackbarProvider>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <Row className="mt-3">
                <Col xs="6">
                    <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                        <small>Quên mật khẩu?</small>
                    </a>
                </Col>
                <Col className="text-right" xs="6">
                    <small>
                        <NavLink className="nav-link-icon" to="/auth/dang-ki" tag={Link}>
                            <span className="nav-link-inner--text">Tạo tài khoản mới</span>
                        </NavLink>
                    </small>
                </Col>
            </Row>
        </Col>
    </>
    );
};

export default Login;
