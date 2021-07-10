import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import ProfileUser from "API/user";
import './style.css';
import { getSearch } from "API/api";

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const[valueSearch, setValueSearch] = useState('');
  const typingTimeoutRef = useRef(null);
  const [listSearchTrue, setListSearchTrue] = useState([]);

    
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  function handleSearchOnChange(e){
    setValueSearch(e.target.value);

    
    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current);
    }
    if(e.target.value == ""){
      setDropdownOpen(false);
      // setListSearchTrue([null]);
      return;
    }
      

    typingTimeoutRef.current = setTimeout(async() => {
      try{
        
        const result = await getSearch("search?text=" + e.target.value);
        
        if(result.data.length == 0){
          setListSearchTrue([{'header': 'Không có kết quả nào'}])

        }
        else
          setListSearchTrue(result.data);

          toggle();
      } catch{
      }
      
    },500)

    
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>

                    
                    <Input caret placeholder="Tìm kiếm..." type="text" value={valueSearch} onChange={handleSearchOnChange}/>
                    <Dropdown isOpen={dropdownOpen} className="dropdown-search">
                    <DropdownMenu>
                      {listSearchTrue.map((item, index) =>(
                         <DropdownItem>{item.header}</DropdownItem>
                      ))}

                    </DropdownMenu>
                  </Dropdown>
                
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt=""
                      src={
                        require("../../assets/img/theme/user.png")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {ProfileUser.login ? (ProfileUser.data.fullname):("Khách")}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              
              <DropdownMenu className="dropdown-menu-arrow" right>
                
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Chào mừng!</h6>
                </DropdownItem>
                
                {/* đã đăng nhập */}
                {ProfileUser.login ? (
                  <>
                    
                      <DropdownItem to="/admin/thong-tin" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>Thông tin</span>
                    </DropdownItem>

                    <DropdownItem to="/cpanel" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>Quản Trị Viên</span>
                    </DropdownItem>

                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-support-16" />
                      <span>Hỗ trợ</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-user-run" />
                      <span>Đăng Xuất</span>
                    </DropdownItem>
                  </>
                ) : (
                  // chưa đăng nhâp
                  <>
              
                  <DropdownItem to="/auth/dang-nhap" tag={Link}>
                      <i className="ni ni-key-25" />
                      <span>Đăng nhập</span>
                    </DropdownItem>
               
                    
                    <DropdownItem to="/auth/dang-ki" tag={Link}>
                      <i className="ni ni-circle-08" />
                      <span>Đăng kí</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <i className="ni ni-support-16" />
                      <span>Hỗ trợ</span>
                    </DropdownItem>
                  </>
                )}
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
