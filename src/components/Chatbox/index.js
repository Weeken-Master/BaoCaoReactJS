import {React, useState, useEffect, useMemo, } from 'react';
import './style.css';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Input, Button, Row, Col, CardBody,Alert } from 'reactstrap';
import ProfileUser from 'API/user';
import {Actived} from "API/api";
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';

let socket;
const CONNECTION_PORT = "localhost:3002/";

const Example = () => {

    const [room] = useState("global");
  
    const [message, setMessage] = useState();
    const [messageList, setMessageList] = useState([]);
    const [inRoom, setInRoom] = useState(ProfileUser.actived);


    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if(!data.length){
                setMessageList([...messageList, data]);
            }
            else{
                setMessageList(data);  
            }
        });
    });

    const connectToRoom = () => {
        socket.emit("join_room", room);
        setInRoom(true);
    };

    const Container = wrapComponent(function({ createSnackbar }) {
        function showSnackbar(message, theme) {
            createSnackbar({
                message: message,
                dismissable: false,
                pauseOnHover: false,
                progressBar: true,
                sticky: false,
                theme: theme,
                timeout: 2000
            });
        }

        const postActivedAPI = (data) => {
            return Actived('/actived', data);
        }
        const onActived = async()=>{
            const data = new FormData();
            data.append("id", ProfileUser.data.userID);
            data.append("email", ProfileUser.data.email);
            data.append("name", ProfileUser.data.fullname);
           
            try {
                const result = await postActivedAPI(data);
                if(result.data != "Fail")
                    showSnackbar('Vui lòng kiểm tra email', 'success');
                else
                    showSnackbar('Kích hoạt thất bại', 'error');
                   
            } catch{
                showSnackbar('Kích hoạt thất bại', 'error');
            }
        }

        return (
            <>
              <Alert color="danger">
                        <Button className="my-4" color="primary" type="button" onClick={onActived}>
                            Kích hoạt
                        </Button> tài khoản để tham gia phòng chat! (Kiểm tra thư trong gmail "{ProfileUser.data.email}" ) !
                </Alert>
            </>
        );

    });

    const sendMessage = async () => {
	setMessage(message.trim());
        if(!message)
            return;
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let messageContent = {
        room: room,
        content: {
            author: ProfileUser.data.userID,
            name: ProfileUser.data.fullname,
            message: message,
            time: time,
        },
        };

        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };

    return (
        <>
        <CardBody>
        <div className="chart" id="chat">
            <div className="chatbox">
                {/* chưa đăng nhập */}
                {(!inRoom && ProfileUser.login && ProfileUser.actived) ? (
                    <Alert color="primary">
                    <Button className="my-4" color="primary" type="button" onClick={connectToRoom}>
                        Tham Gia
                    </Button> phòng chát !
                </Alert>
                ) : (<></>)}
                {!ProfileUser.login? (
                    <>                    
                    <Alert color="danger">
                        <Button className="my-4" color="primary" type="button" to="../auth/dang-nhap" tag={Link}>
                            Đăng Nhập
                        </Button> để tham gia phòng chát !
                    </Alert>
                    </>
                    ) : (<></>)}

                    {/* đã kích hoạt */}
                    {(!ProfileUser.actived && ProfileUser.login)? (
                        <SnackbarProvider position="bottom-left">
                        {/* nút đăng kí */}
                        <Container />
                    </SnackbarProvider>
                        
                    ) : (
                        <ListGroup>
                        {[...messageList].reverse().map((val, key) => {
                            return(
                                <ListGroupItem className={val.author == ProfileUser.data.userID ?"me" : "every-body"}>
                                    @{val.name} : {val.message}
                                    <div className="time">{val.time}</div>
                                </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                    )}
                </div>
            </div>
            </CardBody>
            {inRoom? (
            <Row>
                <Col xs="11">
                    <Input onChange={(e) => {setMessage(e.target.value)}} placeholder="Bạn muốn nhắn..." id="input-mess" value={message}/>
                </Col>
                <Col xs="1">
                    <i className="ni ni-send" onClick={sendMessage} id="send-mess"/>
                </Col>
            </Row>
            ) : (<></>)}

   </>
    );

}

export default Example;