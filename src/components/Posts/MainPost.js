import {React, useState} from "react";

import { 
    Card, Media,Row, CardBody, Input, TabContent, TabPane, Nav,
    NavItem, NavLink, Col, ListGroup, ListGroupItem, CardText, CardImg, Alert
} from "reactstrap";
import classnames from 'classnames';
import { addPost } from "API/api";

const submitAddComment = (data) =>{
	return addPost("/add-comment",data)
}

export default function MainPosts(props){
    const [commentsLists, setCommentsList] = useState(props.commentsLists);
    const [numberCMT, setNumberCMT] = useState(props.commentsLists.length);

    const [comment, setComment] = useState("");
    const [activeTab, setActiveTab] = useState('1');

    const postCommentAPI = async() =>{
        const data = new FormData();
        data.append("text", comment);
        data.append("UserID", Number(props.userID));
        data.append("PostID", Number(props.idPost));
        try {
              const result = await submitAddComment(data);
              setCommentsList([...result.data].reverse());
              setNumberCMT(numberCMT+1);
        } catch (error) {
        }
    }

    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return(
        <>
        <Nav tabs>
            <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggleTab('1'); }}>
                    Thông Tin
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggleTab('2'); }}>
                    Bình Luận {"(" + numberCMT + ")"}
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <Media>
                            <Media left href="#">
                                <Media object src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq7BN1bu9bS5AFnpigyuRO74hB_xS72wy17UcmUQcxO-ZTPezxDMyPIK5B5KqLTIJo2Rs&usqp=CAU" alt="Generic placeholder image" className="img-main-detail" />
                            </Media>
                            <Media body>
                                
                                <Card>
                                    <CardBody>
                                        <CardText>
                                            {props.Content}
                                        </CardText>
                                        <CardText>
                                            <small className="text-muted">Đăng vào lúc: {new Date(props.time).toLocaleString()}</small>
                                        </CardText>
                                    </CardBody>
                                    {props.Image != 'null' ? (
                                        <CardImg bottom width="100%" src={process.env.PUBLIC_URL + "/images/" + props.Image} alt="Card image cap" id="img-post"/>
                                        ):(<></>)}
                                   
                                </Card>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <ListGroup>
                            {commentsLists.map((commentList, index) => (
                                <ListGroupItem>@{commentList.UserFullName} : {commentList.text} -- {new Date(commentList.time).toLocaleString()}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                
                {props.status===1?(
                    <Alert color="danger">Đã khóa Comments</Alert>
                ):(
                    <></>
                )}
                
                {props.login && props.status===0? (
                    <Row className="send-comment">
                    <Col sm="11">
                        <Input placeholder="Viết gì đó ..." onChange={(e) => {setComment(e.target.value)}}/>
                    </Col>
                    <Col sm="1">
                        <i className="ni ni-send" onClick={postCommentAPI}/>
                    </Col>
                </Row>
                ) : (<></>)}    
            </TabPane>
        </TabContent>
        </>
    );
}