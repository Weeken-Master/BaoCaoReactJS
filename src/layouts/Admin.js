
import {React, useEffect, useRef} from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import ProfileUser from "API/user";
import {loginToken} from "API/api";
import Token from "API/token";

const Admin = (props) => {
  	const mainContent = useRef(null);
  	const location = useLocation();
  	const history = useHistory();
	
  	// SETUP dữ liệu khi đã đăng nhập
  	async function setUP(){
		//kiểm tra token để check đăng nhập
		if(ProfileUser.login || Token.die)
			return;
	   	//kiểm tra token để check đăng nhập
		const token = localStorage.getItem('token');
	  	if(token){
			try {
		  		const result = await loginToken("/protected?token="+token);
		  		//đã đăng nhập
		 		//Lưu data dể sử dụng
				ProfileUser.login = true;
				ProfileUser.data = result.data;

				if(result.data.actived == 1)
			  		ProfileUser.actived = true;
				else
					ProfileUser.actived = false;
				history.push();
			} catch (error) {
		  		ProfileUser.login = false;
		  		Token.die = true;
		  		ProfileUser.data = "";
		}
	  }
  }
  setUP();
//   kết thức setup dữ liệu

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;

	}, [location]);

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
		if (prop.layout === "/admin") {
			return (
			<Route path={prop.layout + prop.path} component={prop.component} key={key}/>
			);
		} else {
			return null;
		}
		});
	};

	const getBrandText = () => {
		for (let i = 0; i < routes.length; i++) {
			if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return "Brand";
	};

	return (
		<>
		<Sidebar {...props} routes={routes} logo={{ innerLink: "/admin/index", 
			imgSrc: require("../assets/img/brand/argon-react.png").default, imgAlt: "...",}}
		/>
		<div className="main-content" ref={mainContent}>
			<AdminNavbar {...props} brandText={getBrandText(props.location.pathname)}/>
			<Switch>
				{getRoutes(routes)}
				<Redirect from="*" to="/admin/index" />
			</Switch>
			<Container fluid>
				<AdminFooter />
			</Container>
		</div>
		</>
	);
};

export default Admin;
