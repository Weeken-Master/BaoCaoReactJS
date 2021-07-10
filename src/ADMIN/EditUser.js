import React, { useState } from 'react';
import { CustomInput, Table, UncontrolledTooltip, Alert } from "reactstrap";
import { getEditActived, getEditUser } from 'API/api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Form, 
    FormGroup, Label, Input, FormText, } from 'reactstrap';
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';


const submitEditUser = (data) =>{
    return getEditUser("/edit-user", data);
}

export default function EditUser(props) {

    const [info, setInfo] = useState({ userID:"", name:"", email:"", user:""});
    const onValueUserName = (e) =>{
        setInfo((prev) => ({...prev, user: e.target.value}))
    }

    const onValueFullName = (e) =>{
        setInfo((prev) => ({...prev, name: e.target.value}))
    }
    const onvalueEmail = (e) =>{
        setInfo((prev) => ({...prev, email: e.target.value}))
    }

    const Success = wrapComponent(function({ createSnackbar }) {
        function showSnackbar(message, theme) {
            createSnackbar({
                message: message,
                dismissable: false,
                pauseOnHover: false,
                progressBar: true,
                sticky: false,
                theme: theme,
                timeout: 4000
            });
        }
                    
        const SubmitPostAPI = async() =>{
            
            if(info.user==='' && info.name==='' && info.email===''){
                showSnackbar("Không Có Thông Tin Thay Đổi", "warning");
            }else{
                const data = new FormData();
                data.append('id', props.listUser[props.idShow].id)
                data.append('username', info.user)
                data.append('name', info.name)
                data.append('email', info.email)
             
              
                try{
                    const result = await submitEditUser(data)
    
                    showSnackbar("Thay Đổi Thông Tin Thành Công", "success");
                    setTimeout(()=>{
                        props.toggle(props.listUser[props.idShow].id, -1)
                    },2000)
                   
                // } catch{
                   
                }
                catch{
                    showSnackbar("Thay Đổi Thông Tin Thất Bại", "error");
                }
            }



 
        }

        return (
            <>
            <Button color="success" onClick={SubmitPostAPI}>Đăng</Button>
            </>
        );
    });
    


            return(
                (props.idShow != -1) ?(

                    <Modal isOpen={props.modal} toggle={() =>props.toggle(props.listUser[props.idShow].id)} backdrop={"static"} keyboard={true}>
                                        
                    <ModalHeader toggle={() =>props.toggle(props.listUser[props.idShow].id, -1)}>
                    <Alert color="primary">
                            Thay Đổi Thông Tin
                        </Alert>
                       </ModalHeader>
                       <ModalBody>
                     

                <Card>
                <CardBody>
                    <Form role="form">
                        <FormGroup>
                            <Label for="exampleEmail">Tên Tài Khoản</Label>
                            {/* { setInfo((prev) => ({...prev, Username: item.username}))} */}
                            <Input type="text" name="name" id="exampleName" placeholder={props.listUser[props.idShow].username} onChange={onValueUserName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Tên Hiển Thị</Label>
                            {/* { setInfo((prev) => ({...prev, Fullname: item.fullname}))} */}
                            <Input type="text" name="text" id="exampleText" name="content" placeholder={props.listUser[props.idShow].fullname} onChange={onValueFullName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Email</Label>
                            {/* { setInfo((prev) => ({...prev, Email: item.email}))} */}
                            <Input type="text" name="email" id="exampleText" placeholder={props.listUser[props.idShow].email} onChange={onvalueEmail}>
                                
                            </Input>
                        </FormGroup>
                        

                    </Form>
                </CardBody>
            </Card>

            </ModalBody>
                    <ModalFooter>
                    <SnackbarProvider position="bottom-left">
                    <Success/>
                     </SnackbarProvider>
                        <Button color="secondary" onClick={() =>props.toggle(props.listUser[props.idShow].id, -1)}>Đóng</Button>
                </ModalFooter>
            </Modal>  
                ):(<></>)
            );
}