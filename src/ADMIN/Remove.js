import React, { useEffect, useState } from 'react';
import { ListGroupItem, ListGroup, UncontrolledTooltip, Alert } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Form, 
    Badge, Label, Input, FormText, } from 'reactstrap';
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';

import { getRemoveUserTemp, getRemoveUser } from 'API/api';

const submitRemoveUserTemp = (url) =>{
    return getRemoveUserTemp("/remove-user-temp/"+url);
}
const submitRemoveUser = (url) =>{
    return getRemoveUserTemp("/remove-user/"+url);
}

export default function Remove(props){

    const [profileUserPost, setProfileUserPost] = useState([]);

    useEffect(async()=>{
        if(props.idShow != -1){
            const result = await submitRemoveUserTemp(props.id);
            setProfileUserPost(result.data);
        }
    },[props.id])

    const Success = wrapComponent(function({ createSnackbar }) {
        function showSnackbar(message, theme) {
            createSnackbar({
                message: message,
                dismissable: false,
                pauseOnHover: false,
                progressBar: true,
                sticky: false,
                theme: theme,
                timeout: 1500
            });
        }
                    
        const SubmitPostAPI = async() =>{
            if(props.id != -1){
                
            try{
                await submitRemoveUser(props.id)
               
                showSnackbar("Xóa Thành Công", "success");

                setTimeout(()=>{
                    props.toggle(-1);
                    
                }, 1510);
            }
            catch{
                showSnackbar("Xảy Ra Lỗi", "error");
            }
            }
               
        }

        return (
            <>
            <Button color="danger" onClick={SubmitPostAPI}>Xóa Hết</Button>
            </>
        );
    });

    return(
        (props.idShow != -1) ?(

            <Modal isOpen={props.modal} toggle={() =>props.toggle(-1)} backdrop={"static"} keyboard={true}>
                                
            <ModalHeader toggle={() =>props.toggle(-1)}>
            <Alert color="danger">
                    Xóa tài khoản ID: {props.id}
                </Alert>
               </ModalHeader>
               <ModalBody>
        <Card>
        <CardBody>
            <Form role="form">
            <h3>Tài khoản này có <Badge color="success">{profileUserPost.length} bài viết</Badge></h3>
            <ListGroup>
                {profileUserPost.map((item, index)=>(
                    <ListGroupItem>{index+1}. <b>{item.header}</b> ({item.CMT} bình luận)</ListGroupItem>
                ))}
                </ListGroup>

            </Form>
        </CardBody>
    </Card>

    </ModalBody>
            <ModalFooter>
            <SnackbarProvider position="bottom-left">
            <Success/>
             </SnackbarProvider>
                <Button color="secondary" onClick={() =>props.toggle(-1)}>Đóng</Button>
        </ModalFooter>
    </Modal>  
        ):(<></>)
    )
}