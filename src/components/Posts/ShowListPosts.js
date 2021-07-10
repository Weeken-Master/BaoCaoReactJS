import { Badge, Table,  UncontrolledTooltip} from "reactstrap";

export default function ShowListPosts(props){
    return(
        <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
              <tr>
                  <th scope="col">Tên Bài Viết</th>
                <th scope="col">Người Đăng</th>
                <th scope="col">Ngày Đăng</th>
                <th scope="col">
                    <i className="ni ni-chat-round" />
                </th>
              </tr>
        </thead>
        <tbody>
        {props.postLists.map((postList, index) => (
              <tr key={postList.id}>
                <th className="th-name-post" onClick={() => props.toggleDetail(index)}>
                    <span className="mb-0 text-sm">
                        {postList.Header}
                    </span>
                </th>
                <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm" href="#pablo" id= {"tooltip" + index} onClick={(e) => e.preventDefault()}>
                              <img alt="..." className="rounded-circle" src="https://bizweb.dktcdn.net/100/336/001/products/admin-10a1e959-c8a2-4964-87f1-a694c39e47ca.jpg?v=1555387211130"/>
                        </a>
                        <UncontrolledTooltip delay={0} target={"tooltip" + index}>
                             {postList.UserName}
                        </UncontrolledTooltip>
                      </div>
                </td>
                <td>
                    <Badge color="" className="badge-dot mr-4">
                        {/* <i className="bg-warning" /> */}
                        {postList.Status===0? (<i className="bg-success" />):(<i className="bg-danger" />)}
                       
                        {/* <i className="bg-danger" /> */}
                        {
                        (new Date(postList.Time)).toLocaleString()
                      }
                    </Badge>
                </td>
                <td>{postList.Count}</td>
              </tr>
        ))}
        </tbody>
      </Table>
    )
}