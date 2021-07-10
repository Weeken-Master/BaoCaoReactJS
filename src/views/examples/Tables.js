
import {React, useState, useEffect} from "react";
import './style.css';
import { Posts, Comments } from "API/api";
import Header from "components/Headers/Header.js";

import ProfileUser from "API/user";

import {
	Button, Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem,
  	UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem,
  	PaginationLink, Progress, Table, Container, Row, Collapse, Modal, ModalHeader, ModalBody, ModalFooter,
  	Alert, UncontrolledTooltip
} from "reactstrap";


import MainPosts from "components/Posts/MainPost";
import AddPost from "components/Posts/AddPost";
import ShowListPosts from "components/Posts/ShowListPosts";


const submitPosts = () =>{
	return Posts("/posts");
}
const submitComments = (id) =>{
	return Comments("/comments/" + id);
}

const Tables = () => {
  // mở bảng post bài
  	const [isOpen, setIsOpen] = useState(false);
  	const [idPost, setIdPost] = useState(-1);

  	const toggle = () => setIsOpen(!isOpen);
  	const [postLists, setPostList] = useState([]);

	
	//numberItemPage là số lượng hiển thị trên 1 trang
	const [numberItemPage] = useState(5);
	const [numberPageNow, setNumberPageNow] = useState(0);
	const [numberPageEnd, setNumberPageEnd] = useState(0);
	const [sumNumberPage, setSumNumberPage] = useState([]);
	const [todos, setTodos] = useState([]);
	
	useEffect(async()=> {
		try{
			const result = await submitPosts();
			setPostList([...result.data].reverse());
		} catch{
		}
	},[]);

	useEffect(()=>{
		setTodos(postLists.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage))
		const array = [];
		for(let i = 0; i < Math.ceil(postLists.length / numberItemPage); i++){
			array.push(i)
		}
		setNumberPageEnd(Math.ceil(postLists.length / numberItemPage));
		setSumNumberPage(array);
	},[postLists]);
	
	useEffect(()=>{
		setTodos(postLists.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage));
		console.log(numberPageNow);
		console.log(numberPageEnd);
	},[numberPageNow]);

	//hiển thị thông tin bình luận của bài post
	const [commentsLists, setCommentsList] = useState([]);
	
  	const MainPost = () => {
		return(
			<>
			{ProfileUser.login ? (
				<MainPosts Image={postLists[idPost].Image} time={postLists[idPost].Time} commentsLists={commentsLists} 
				Content={postLists[idPost].Content} idPost={postLists[idPost].PostID} 
					login={ProfileUser.login} userID={ProfileUser.data.userID} status={postLists[idPost].Status}/>
			) : (
				<MainPosts Image={postLists[idPost].Image} time={postLists[idPost].Time} commentsLists={commentsLists} 
				Content={postLists[idPost].Content} idPost={postLists[idPost].PostID} 
					login={false} userID={-1} status={postLists[idPost].Status}/>
			)}
			
			</>
		);
	}
	//mở bảng thông tin

	const [modal, setModal] = useState(false);
	const [backdrop] = useState('static');

	const toggleDetail = async(id) =>{
		id = (numberPageNow * numberItemPage) + id;
		if(modal)
		  	setIdPost(-1);
		else
		  	setIdPost(id);
			  
		setModal(!modal);
	
		try {
		  	id = postLists[id].PostID;
		  	const result = await submitComments(id);
		  	setCommentsList([...result.data].reverse());
		} catch (error) {
		}
	}

	const Detail = () =>{
		return(
		  	(idPost !== -1) ? (
				<Modal isOpen={modal} toggle={toggleDetail} backdrop={backdrop} modalTransition={{ timeout: 200 }} backdropTransition={{ timeout: 750 }}>
					<ModalHeader toggle={toggleDetail}>      
			  			<Alert color="success">
							<Button id="header-detail">{postLists[idPost].ThemeName}</Button>
							{/* tiêu đề bài post */}
				 			{ postLists[idPost].Header }
			 		 	</Alert>
					</ModalHeader>
					<ModalBody className="main-detail-posts">
			  			<MainPost/>
					</ModalBody>
					<ModalFooter>
			  			<Button color="danger" onClick={toggleDetail}>Đóng</Button>
					</ModalFooter>
		  		</Modal>):(<></>)
			);
		}
	
	return (
		<>
		<Header />
	  		<Container className="mt--7" fluid>
				<Detail/>
				<Row>
		  			<div className="col">
						<Card className="shadow">
			  				<CardHeader className="border-0">
			  					<Row className="align-items-center">
				  					<div className="col">
										<h3 className="mb-0">Hỏi Đáp</h3>
				  					</div>
									{ProfileUser.login ? (<>
									<div className="col text-right">
										<Button color="primary" onClick={toggle} size="sm">
											Tạo Bài Viết
										</Button>
									</div>
									<Collapse isOpen={isOpen} className="add_post">
										<AddPost setPostList={setPostList} userID={ProfileUser.data.userID} />
									</Collapse></>):(<></>)}
								</Row>
			  				</CardHeader>
								<ShowListPosts postLists={todos} toggleDetail={toggleDetail} />
			  				<CardFooter className="py-4">
								<nav aria-label="...">
									<Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
										<PaginationItem className={numberPageNow==0? "disabled": ""}>
											<PaginationLink onClick={() => setNumberPageNow(numberPageNow-1)}>
												<i className="fas fa-angle-left"/>
												<span className="sr-only">Previous</span>
											</PaginationLink>
										</PaginationItem>
											{sumNumberPage.map((number, index)=>(
												<PaginationItem className={numberPageNow==index? "active": ""}>
													<PaginationLink onClick={() =>setNumberPageNow(number)}>
													{index+1}
												</PaginationLink>
											</PaginationItem>
										))}
										<PaginationItem className={numberPageEnd==numberPageNow+1? "disabled": ""}>
											<PaginationLink onClick={() => setNumberPageNow(numberPageNow+1)}>
												<i className="fas fa-angle-right"/>
												<span className="sr-only">Next</span>
											</PaginationLink>
										</PaginationItem>
							
									</Pagination>
								</nav>
			  				</CardFooter>
						</Card>
		  			</div>
				</Row>

		{/* Dark table */}
	
	  </Container>
	</>
  );
};

export default Tables;
