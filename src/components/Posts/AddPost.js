import {React, useEffect, useState} from 'react';
import {
	Button, Card, CardBody, Form, 
  	FormGroup, Label, Input, FormText,
} from "reactstrap";
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
import { addPost, getSetting } from "API/api";

const submitAddPost = (data) =>{
	return addPost("/add-post",data)
}
const submitGetSetting = () =>{
	return getSetting("/home",)
}

export default function(props){
    const [setting, setSetting] = useState(0)

    useEffect(async()=>{
        const result = await submitGetSetting()
        setSetting(result.data)
    },[])
    const [info, setInfo] = useState({ userID:0, Header:"", Content:"", Theme:1, Image:""})
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
            if(setting.StatusPost !== 0){
                showSnackbar("Đang Khóa Đăng Bài", "error");
                return;
            }
            const data = new FormData();
            
            data.append("UserID", props.userID);
            data.append("Header", info.Header);
            data.append("Content", info.Content);
            data.append("Theme", info.Theme);
            data.append("file", info.Image);

            try{
                const result = await submitAddPost(data);
                props.setPostList([...result.data].reverse());
                
                showSnackbar("Đăng Bài Thành Công", "success");
            } catch{
                showSnackbar("Thất Bại Vui Lòng Đăng Bài Cách Nhau "+ setting.TimePost + " phút", "error");
            }
        }

        return (
            <>
            <Button color="success" onClick={SubmitPostAPI}>Đăng</Button>
            </>
        );
    });
    
    return(
        <Card>
            <CardBody>
                <Form role="form">
                    <FormGroup>
                        <Label for="exampleEmail">Tên bài viết</Label>
                        <Input type="text" name="name" id="exampleName" placeholder="Nhập caption" onChange={onValueHeader}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Nội dung</Label>
                        <Input type="textarea" name="text" id="exampleText" name="content" placeholder="Nhập nội dung" onChange={onvalueContent}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Chủ Đề</Label>
                        <Input type="select" name="theme" id="exampleSelect"  onChange={onValueTheme}>
                            <option>Hỏi Đáp</option>
                            <option>Chia Sẽ</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Hình Ảnh</Label>
                        <Input type="file" name="file" id="exampleFile" onChange={onValueImage}/>
                        <FormText color="muted">
                            Thêm hình minh họa vào bài viết
                        </FormText>
                    </FormGroup>
                    <FormGroup>

                        <SnackbarProvider position="bottom-left">
                           <Success/>
                        </SnackbarProvider>

                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
}