import React from 'react'
import ReactPaginate from "react-paginate";

const Pagination = ({changePage, pageCount}) => {
    return (
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"page-numbers"}
            previousLinkClassName={"prev"}
            nextLinkClassName={"next"}
            activeClassName={"active"}
        />
    )
}

export default Pagination