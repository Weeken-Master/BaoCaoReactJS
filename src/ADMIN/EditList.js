import React, { useState } from 'react';
import { CustomInput, Table, UncontrolledTooltip, Alert } from "reactstrap";
import { editPost } from 'API/api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Form, 
    FormGroup, Label, Input, FormText, } from 'reactstrap';
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';


const submitEditUser = (data) =>{
    return editPost("/edit-post", data);
}

export default function EditList(props) {
    const [info, setInfo] = useState({ Header:"", Content:"", Theme:'', Image:""})


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
            
            if(info.Header==='' && info.Content==='' && info.Theme==='' && info.Image===''){
                showSnackbar("Không Có Thông Tin Thay Đổi", "warning");
            }else{
                const data = new FormData();
                console.log(info.Header)
                data.append('id', props.listPost[props.idShow].PostID)
                data.append('content', info.Content)
                data.append('header', info.Header)
                data.append('theme', info.Theme)
                data.append('file', info.Image)
                try {
                    await submitEditUser(data)
                    showSnackbar("Thay Đổi Thông Tin Thành Công", "success");
                    setInfo((prev) => ({...prev, Header: ''}))
                    setInfo((prev) => ({...prev, Content: ''}))
                    setInfo((prev) => ({...prev, Theme: ''}))
                    setInfo((prev) => ({...prev, Image: ''}))
            
                    setTimeout(()=>{
                        props.toggle(props.listPost[props.idShow].PostID, -1)
                    },2000)
                } catch (error) {
                    showSnackbar("Thay Đổi Thông Tin Thất Bại", "error");
                }
               
            }
            //     const data = new FormData();
            //     data.append('id', props.listUser[props.idShow].id)
            //     data.append('username', info.user)
            //     data.append('name', info.name)
            //     data.append('email', info.email)
             
              
            //     try{
            //         const result = await submitEditUser(data)
    
            //         showSnackbar("Thay Đổi Thông Tin Thành Công", "success");
            //         setTimeout(()=>{
            //             props.toggle(props.listUser[props.idShow].id, -1)
            //         },2000)
                   
            //     // } catch{
                   
            //     }
            //     catch{
            //         showSnackbar("Thay Đổi Thông Tin Thất Bại", "error");
            //     }
            // }

        }

        return (
            <>
            <Button color="success" onClick={SubmitPostAPI}>Thay Đổi</Button>
            </>
        );
    });
    
    const onValueTheme = (e) =>{
        if(e.target.value == "Hỏi Đáp")
            setInfo((prev) => ({...prev, Theme: 1}))
        else if(e.target.value == "Chia Sẽ")
        setInfo((prev) => ({...prev, Theme: 2}))
    }
    const onValueHeader = (e) =>{
        setInfo((prev) => ({...prev, Header: e.target.value}))
    }
    const onvalueContent = (e) =>{
        setInfo((prev) => ({...prev, Content: e.target.value}))
    }
    const onValueImage =(e) =>{
        setInfo((prev) => ({...prev, Image:e.target.files[0]}))
    }


            return(
                (props.idShow != -1) ?(

                    <Modal isOpen={props.modal} toggle={() =>props.toggle(props.listPost[props.idShow].PostID)} backdrop={"static"} keyboard={true}>
                                        
                    <ModalHeader toggle={() =>props.toggle(props.listPost[props.idShow].PostID, -1)}>
                    <Alert color="primary">
                            Thay Đổi Thông Tin <b>(ID: {props.listPost[props.idShow].PostID})</b>
                        </Alert>
                       </ModalHeader>
                       <ModalBody>
                     
                <Card>
                <CardBody>
                    <Form role="form">
                        <FormGroup>
                            <Label for="exampleEmail">Tên Chủ Đề</Label>
                            {/* { setInfo((prev) => ({...prev, Username: item.username}))} */}
                            <Input type="text" name="name" id="exampleName" placeholder={props.listPost[props.idShow].Header} onChange={onValueHeader}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Nội Dung</Label>
                            {/* { setInfo((prev) => ({...prev, Fullname: item.fullname}))} */}
                            <Input type="textarea" name="text" id="exampleText" name="content" placeholder={props.listPost[props.idShow].Content} onChange={onvalueContent}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="exampleSelect">Chủ Đề</Label>
                            <Input type="select" name="theme" id="exampleSelect" onChange={onValueTheme}>
                                {props.listPost[props.idShow].ThemeName === "Hỏi Đáp"? (
                                    <>
                                    <option>Hỏi Đáp</option>
                                    <option>Chia Sẽ</option>
                                    </>
                                ):
                                (<>
                                    <option>Chia Sẽ</option>
                                    <option>Hỏi Đáp</option>
                                    </>
                                )}
                                
                            </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleFile">Hình Ảnh</Label>
                        <Input type="file" name="file" id="exampleFile" onChange={onValueImage}/>
                        <FormText color="muted">
                            Không chọn ảnh sẽ giữ nguyên ảnh cũ
                        </FormText>
                    </FormGroup>
                    
                    </Form>
                </CardBody>
            </Card>

            </ModalBody>
                    <ModalFooter>
                    <SnackbarProvider position="bottom-left">
                    <Success/>
                     </SnackbarProvider>
                        <Button color="secondary" onClick={() =>props.toggle(props.listPost[props.idShow].id, -1)}>Đóng</Button>
                </ModalFooter>
            </Modal>  
                ):(<></>)
            );
}