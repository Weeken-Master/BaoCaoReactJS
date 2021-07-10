
import { CardFooter, Pagination, PaginationItem, PaginationLink } from "reactstrap"
export default function  Pagetion(props) {
    return(
        <CardFooter className="py-4">
        <nav aria-label="...">
            <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                <PaginationItem className={props.numberPageNow==0? "disabled": ""}>
                    <PaginationLink onClick={() => props.setNumberPageNow(props.numberPageNow-1)}>
                        <i className="fas fa-angle-left"/>
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                    {props.sumNumberPage.map((number, index)=>(
                        <PaginationItem className={props.numberPageNow==index? "active": ""}>
                            <PaginationLink onClick={() =>props.setNumberPageNow(number)}>
                            {index+1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className={props.numberPageEnd==props.numberPageNow+1? "disabled": ""}>
                    <PaginationLink onClick={() => props.setNumberPageNow(props.numberPageNow+1)}>
                        <i className="fas fa-angle-right"/>
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
    
            </Pagination>
        </nav>
      </CardFooter>
    )
}