import { Posts, editStatus } from "API/api";

import { useEffect, useState } from "react";
import { CustomInput, Table, Badge,UncontrolledTooltip } from "reactstrap";
import Pagetion from "./Pagetion";
import EditList from "./EditList";

const submitPosts=()=>{
    return Posts("/posts");
}
const submitEditStatus=(data)=>{
    return editStatus("/edit-status", data);
}


export default function ListPost(){
    const [listPost, setListPost] = useState([]);

    const [numberItemPage] = useState(5);
	const [numberPageNow, setNumberPageNow] = useState(0);
	const [numberPageEnd, setNumberPageEnd] = useState(0);
	const [sumNumberPage, setSumNumberPage] = useState([]);
	const [todos, setTodos] = useState([]);

    useEffect(async()=>{
        const result = await submitPosts();
        setListPost([...result.data].reverse())
    },[])

    useEffect(()=>{
		setTodos(listPost.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage))
		const array = [];
		for(let i = 0; i < Math.ceil(listPost.length / numberItemPage); i++){
			array.push(i)
		}
		setNumberPageEnd(Math.ceil(listPost.length / numberItemPage));
		setSumNumberPage(array);
	},[listPost]);

    useEffect(()=>{
		setTodos(listPost.slice(numberPageNow * numberItemPage,numberPageNow * numberItemPage + numberItemPage));
	},[numberPageNow]);





    const [idShow, setIdShow] = useState(-1)
    const [modal, setModal] = useState(false);
    const [id, setID] = useState(-1);
    const [info, setInfo] = useState({ Header:"", Content:"", Theme:'', Image:""})

    function toggle(index, id){

   
        if(modal)
            setIdShow(-1);
        else{
            setIdShow(index);
            setID(id);
        }
            

        setModal(!modal);
    }

    async function toggleRemove(id) {

        
    }

    const onClickActived = async(e) => {
        const data = new FormData();
        data.append('id', e.target.id)
        
        if(e.target.checked)
            data.append('status', 0)  
        else
            data.append('status', 1)
        await submitEditStatus(data)
        // const result = await submitEditActived(data)
    }
    

    return(
        <>
        <h3><Badge color="success">Có tổng {listPost.length} bài viết</Badge></h3>

        <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
                <tr>
                    <th scope="col">Tiêu Đề Bài Viết</th>
                    <th scope="col">Chủ Đề</th>
                    <th scope="col">Người Đăng</th>
                    <th scope="col">Ngày Đăng</th>
                    
                    <th scope="col">
                    <i className="ni ni-chat-round" />
                    </th>
                    <th scope="col">Comments</th>
                    <th scope="col">
                    </th>
                </tr>
                
            </thead>
            <tbody>
        
                {todos.map((item, index)=>(
                <tr>
                    <th>
                        {numberItemPage*numberPageNow + index + 1}. {item.Header}
                    </th>
                    <td>{item.ThemeName}</td>
                    <td>{item.UserName} <b>(ID: {item.UserID})</b></td>
                    <td>{item.Time}</td>
                    <td>{item.Count}</td>
                    <td>
                    
                    {item.Status===0 ? (
                        <CustomInput type="switch" id={item.PostID} name="customSwitch" checked="false" onClick={onClickActived}/>
                        
                    ):(
                        <CustomInput type="switch" id={item.PostID} name="customSwitch" onClick={onClickActived}/>
                    )}
                                    
                    </td>
                    <td>
                            
                            <span className="ni ni-settings text-success" id="tooltipedit" onClick={() =>toggle(numberPageNow*
                                numberItemPage + index,item.id)}></span>
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
                
            </tbody>
            </Table>
            <Pagetion sumNumberPage={sumNumberPage} numberPageNow={numberPageNow} 
            numberPageEnd={numberPageEnd} setNumberPageNow={setNumberPageNow}/>

            <EditList listPost={listPost} id={id} idShow={idShow} modal={modal} toggle={toggle}/>
            </>
    )
}