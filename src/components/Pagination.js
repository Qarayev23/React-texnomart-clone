import React from 'react'

const Pagination = () => {
    return (
        <ul class="page-numbers">
            <li><a class="prev page-numbers" href=""><i class="fa-solid fa-angle-left"></i></a></li>
            <li><a class="page-numbers" href="">1</a></li>
            <li><a class="page-numbers" href="">2</a></li>
            <li><a class="next page-numbers" href=""><i class="fa-solid fa-angle-right"></i></a></li>
        </ul>
    )
}

export default Pagination