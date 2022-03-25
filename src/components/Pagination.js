import React from 'react'
import Pagination from 'rc-pagination';

const PaginationComp = ({changePage, productCount, currentPage}) => {
    return ( 
        <Pagination
        onChange={changePage}
        current={currentPage}
        total={productCount}
      />
    )
}

export default PaginationComp