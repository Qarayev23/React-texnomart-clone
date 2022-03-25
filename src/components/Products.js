import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import { getProducts } from '../redux/features/productSlice'
import Product from './Product'
import Spinner from "../components/Spinner"
import PaginationComp from './Pagination'
import SideBar from './SideBar'

const Products = () => {
    const { products, productCount, loading } = useSelector(state => state.productSlice)
    const { cart } = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()
    let location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()

    const limit = 8;
    const [currentPage, setCurrentPage] = useState(1)

    const changePage = (selected) => {
        setCurrentPage(selected)
        searchParams.set("_page", selected)
        searchParams.set("_limit", limit)
        setSearchParams(searchParams)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]

    const [value, setValue] = useState(null);

    function filterByPriceFunc(selected) {
        searchParams.set("_order", selected.value)
        searchParams.set("_sort", "price")
        searchParams.set("_page", 1)
        searchParams.set("_limit", limit)
        setSearchParams(searchParams)
        setValue(selected)
        setCurrentPage(1)
    }

    useEffect(() => {
        searchParams.get("_page") && setCurrentPage(Number(searchParams.get("_page")))
        if (location.search === "") {
            dispatch(getProducts(`?_page=1&_limit=${limit}`))
            setCurrentPage(1)
            setValue(options[0])
        } else if (searchParams.get("_order") === "asc") {
            dispatch(getProducts(location.search))
            setValue(options[1])
        } else if (searchParams.get("_order") === "desc") {
            dispatch(getProducts(location.search))
            setValue(options[2])
        } else {
            dispatch(getProducts(location.search))
        }
    }, [location])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

    const [openSidebar, setOpenSidebar] = useState(true)
    const handleSidebar = () => {
        document.querySelector(".backdrop").classList.toggle("active")
        setOpenSidebar(!openSidebar)
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="products">
            <div className="container">
                <div className='wrapper'>
                    <div className='products-left'>
                        <SideBar openSidebar={openSidebar} handleSidebar={handleSidebar} />
                    </div>
                    <div className='products-right'>
                        <div className="products-content">
                            <div className="products-content-top">
                                <div className="products-found">
                                    {productCount}&nbsp;nəticədən &nbsp;{(currentPage * limit) - limit}&nbsp;-&nbsp;
                                    {(currentPage * limit) - limit + products.length} &nbsp;Məhsul tapıldı
                                </div>
                                <div className='price-filter'>
                                    <Select
                                        value={value}
                                        options={options}
                                        onChange={filterByPriceFunc}
                                        isSearchable={false} />
                                    <button class="open-sidebar" onClick={handleSidebar}>
                                        <i class="fa fa-filter" aria-hidden="true"></i>
                                        Filter
                                    </button>
                                </div>
                            </div>
                            <div className="products-list">
                                {products.map((product) => {
                                    return <Product product={product} key={product.id} />
                                })}
                            </div>
                        </div>
                        <PaginationComp changePage={changePage} productCount={productCount} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products