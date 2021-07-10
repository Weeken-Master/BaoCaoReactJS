
import {React, useState, useRef, useEffect} from "react";

// reactstrap components
import { Container, Input, Badge } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Label, FormGroup, Form, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import ListUser from "./ListUser";
import Pagetion from "./Pagetion";
import ListPost from "./ListPost";
import EditSetting from "./EditSetting";

import './style.css';
import { getListUser } from "API/api";
import { getSetting } from "API/api";

const submitGetListUser = () =>{
	return getListUser("/get-user")
}
const submitGetSetting = () =>{
	return getSetting("/home")
}

const Cpanel = (props) => {

    const [listUser, setListUser] = useState([]);
    const [setting, setSetting] = useState([])

    const [numberItemPage] = useState(5);
	const [numberPageNow, setNumberPageNow] = useState(0);
	const [numberPageEnd, setNumberPageEnd] = useState(0);
	const [sumNumberPage, setSumNumberPage] = useState([]);
	const [todos, setTodos] = useState([]);

    useEffect(async()=>{
        try {
            const result = await submitGetListUser();
            setListUser(result.data);
            result = await submitGetSetting()
            setSetting(result.data)

        } catch (error) {
            
        }
    },[])

    useEffect(()=>{
		setTodos(listUser.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage))
		const array = [];
		for(let i = 0; i < Math.ceil(listUser.length / numberItemPage); i++){
			array.push(i)
		}
		setNumberPageEnd(Math.ceil(listUser.length / numberItemPage));
		setSumNumberPage(array);
	},[listUser]);

    useEffect(()=>{
		setTodos(listUser.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage));
	},[numberPageNow]);

    // if(!ProfileUser.login)
    //    history.push('/home')

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

	return (
		<>
		<Sidebar {...props} routes={routes} logo={{ innerLink: "/admin/index", 
			imgSrc: require("../assets/img/brand/argon-react.png").default, imgAlt: "...",}}
		/>
		<div className="main-content">
			<AdminNavbar/>
    
            <div className="main-cpanel-admin">
                <h1><Badge color="primary">Trang Quản Lí</Badge></h1>
                <div className="content">
                                <Nav tabs>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Tài Khoản 
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Bài Đăng
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Cài Đặt
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                            <ListUser listUser={todos} number={numberItemPage*numberPageNow}/>
                            <Pagetion sumNumberPage={sumNumberPage} numberPageNow={numberPageNow} 
                                numberPageEnd={numberPageEnd} setNumberPageNow={setNumberPageNow}/>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                            <ListPost/>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="3">
                        <Row>
                            <EditSetting setting={setting}/>
                        </Row>
                        </TabPane>
                    </TabContent>
                    </div>
                </div>
			<Container fluid>
				<AdminFooter />
			</Container>
		</div>
		</>
	);
};

export default Cpanel;
