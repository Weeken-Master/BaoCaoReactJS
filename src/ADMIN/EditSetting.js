import {  Badge, Button, Label, CustomInput, Input, Col } from 'reactstrap';
import { editSettingStatus, editSettingTime } from 'API/api';
import { useState } from 'react';

const submitAPI=(data)=>{
    return editSettingStatus('/edit-setting-checked', data)
}
const submitAPITime=(data)=>{
    return editSettingTime('/edit-setting-time', data)
}

export default function EditSetting(props){
    const [info, setInfo] = useState()

    const onChangeValueTime=(e)=>{
        setInfo(e.target.value)
    }

    const onSubmitTime=async()=>{
        const data = new FormData()

        if(info > 0){
            data.append('time', info)
            await submitAPITime(data)
        }
        

    }
    const onClickActived = async(e) => {
    
        const data = new FormData()
        data.append('id', Number(e.target.id))
        if(e.target.checked)
            data.append('status', 0)
        else
            data.append('status', 1)
        await submitAPI(data)
    }

    return(
        <>
        <Col sm="12">
        <h3><Badge color="success">Thay đổi cài đặt</Badge></h3>
        </Col>
        <Col sm="5">
            <Label for="exampleEmail">Thời gian đăng bài</Label>

            <Input type="number" name="name" id="exampleName" placeholder="Tính theo phút" onChange={onChangeValueTime}/>
           
        </Col>
        <Col sm="3">
            <Label for="exampleEmail">Quảng nghỉ giữa 2 bài đăng / acc</Label>
            <Button color="success" onClick={onSubmitTime}>Lưu</Button>
        </Col>
        <Col sm="8">
            <Label for="exampleEmail">Đăng kí tài khoản</Label>
            
            <CustomInput type="switch" id="1" name="customSwitch" checked="false" onClick={onClickActived}/>
        </Col>
        <Col sm="8">
            <Label for="exampleEmail">Đăng Bài</Label>
            
            <CustomInput type="switch" id="2" name="customSwitch" checked="false" onClick={onClickActived}/>
        </Col>

        </>
    )
}