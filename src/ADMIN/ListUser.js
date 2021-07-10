import React, { useState } from 'react';
import { CustomInput, Table, UncontrolledTooltip, Alert } from "reactstrap";
import { getEditActived, getEditUser, getRemoveUser } from 'API/api';
import { Button, Badge, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Form, 
    FormGroup, Label, Input, FormText, } from 'reactstrap';
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
import EditUser from './EditUser';
import Remove from './Remove';

const submitEditActived = (data) =>{
    return getEditActived("/edit-actived", data);
}
const submitEditUser = (data) =>{
    return getEditUser("/edit-user", data);
}
const submitRemoveUser = (data) =>{
    return getRemoveUser("/remove-user", data);
}


export default function ListUser(props){
    const [info, setInfo] = useState({ userID:"", name:"", email:"", user:""});
    const [modal, setModal] = useState(false);
    const [idShow, setIdShow] = useState(-1);

    const [modalRemove, setModalRemove] = useState(false);
    const [idRemove, setIdRemove] = useState(-1);
    // const [nameRemove, setNameRemove] = useState('');

    const [id, setID] = useState(0);
    function toggle(id,index){
        setID(id);
        setInfo((prev) => ({...prev, userID: id}))
        setInfo((prev) => ({...prev, Fullname: ''}))
        setInfo((prev) => ({...prev, Email: ''}))
        setInfo((prev) => ({...prev, Username: ''}))

        if(modal)
            setIdShow(-1);
        else
            setIdShow(index);
       
        setModal(!modal);
        
    }

    async function toggleRemove(id) {

        if(modal)
            setIdRemove(-1);
        else{
            setIdRemove(id);
        }
            
        setModalRemove(!modalRemove);

        // const data = new FormData()
        // console.log(id);
        // data.append("id", id)
        // try {
        //     await submitRemoveUser(data)
        // } catch (error) {
            
        // }
        
    }
    const onClickActived = async(e) => {
        const data = new FormData();
        data.append('id', e.target.id)
        if(e.target.checked)
            data.append('actived', 1)
        else
            data.append('actived', 0)

        const result = await submitEditActived(data)
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
            
            if(info.Email==='' && info.Username==='' && info.Fullname===''){
                showSnackbar("Không Có Thông Tin Thay Đổi", "warning");
            }else{
                const data = new FormData();
                data.append('id', info.userID)
                data.append('username', info.Username)
                data.append('name', info.Fullname)
                data.append('email', info.Email)
                const result = await submitEditUser(data)
            }

        }

        return (
            <>
            <Button color="success" onClick={SubmitPostAPI}>Đăng</Button>
            </>
        );
    });
    




    return(
        <>
        <h3><Badge color="success">Có tổng {props.listUser.length} tài khoản</Badge></h3>
        <Table className="align-items-center table-flush" responsive>
         
            <thead className="thead-light">
                    <tr>
                        <th scope="col">Tên Tài Khoản</th>
                        <th scope="col">Tên Hiển Thị</th>
                        <th scope="col">Email</th>
                        <th scope="col">Bài Đăng</th>
                        <th scope="col">Kích hoạt</th>
                        <th scope="col">
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
               
                    {props.listUser.map((item, index)=>(
                        
                        
                        <tr>
                            
                            <th>
                                <span className="mb-0 text-sm">
                                    {index + 1}. <b>{item.username}</b>
                                </span>
                            </th>
                            <td>
                                <span className="mb-0 text-sm">
                                    {item.fullname}
                                </span>
                            </td>
                            <td>
                                <span className="mb-0 text-sm">
                                    {item.email}
                                </span>
                            </td>
                            <td>
                                {item.posts}
                            </td>
                            <td>
                            {item.actived===1 ? (
                                <CustomInput type="switch" id={item.id} name="customSwitch" checked="false" onClick={onClickActived}/>
                                
                            ):(
                                <CustomInput type="switch" id={item.id} name="customSwitch" onClick={onClickActived}/>
                            )}
                                            
                            </td>
                            <td>
                            
                                <span className="ni ni-settings text-success" id="tooltipedit" onClick={() =>toggle(item.id, index)}></span>
                                    <UncontrolledTooltip delay={0} target="tooltipedit">
                                        Chỉnh Sửa
                                    </UncontrolledTooltip>     
     
                            </td>
                            <td>
                            
                                    <span className="ni ni-fat-remove text-red" id="tooltipremove" onClick={() =>toggleRemove(item.id)}></span>
                                    <UncontrolledTooltip delay={0} target="tooltipremove">
                                        Xóa
                                </UncontrolledTooltip>   
                            </td>
                        </tr>
                       
                    ))}
                    <EditUser listUser={props.listUser} idShow={idShow} modal={modal} toggle={toggle}/>
                    <Remove modal={modalRemove} toggle={toggleRemove} id={idRemove}/>

                </tbody>
            </Table>
            </>
    )
}