import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import { filterByPrice, getProducts } from '../redux/features/productSlice'
import { addToCart } from '../redux/features/cartSlice'
import Spinner from "../components/Spinner"
import Pagination from './Pagination'

const Products = () => {
    const { products, loading } = useSelector(state => state.productSlice)
    const { cart } = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()
    let location = useLocation();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(products.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]

    const [value, setValue] = useState(options[0]);

    function filterByPriceFunc(selected) {
        if (selected.value === "asc") {
            setSearchParams({ _sort: "price", _order: selected.value })
        } else if (selected.value === "desc") {
            setSearchParams({ _sort: "price", _order: selected.value })
        }
        else if (selected.value === "standart") {
            navigate("/")
        }
    }

    useEffect(() => {
        if (location.search === "?_sort=price&_order=asc") {
            dispatch(filterByPrice(location.search))
            setValue(options[1])
        } else if (location.search === "?_sort=price&_order=desc") {
            dispatch(filterByPrice(location.search))
            setValue(options[2])
        } else if (location.search === "") {
            dispatch(getProducts())
            setValue(options[0])
        }
    }, [location])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="products">
            <div className="container">
                <div className="products-content">
                    <div className="filter-section">
                        <div className="products-found">
                            {products.length}&nbsp;nəticədən &nbsp;{pagesVisited}&nbsp;-&nbsp;
                            {pagesVisited + products.slice(pagesVisited, pagesVisited + usersPerPage).length}
                            &nbsp;Məhsul tapıldı
                        </div>
                        <div className='price-filter'>
                            <Select
                                value={value}
                                options={options}
                                onChange={filterByPriceFunc} />
                        </div>
                    </div>
                    <div className="products-list">
                        {products.slice(pagesVisited, pagesVisited + usersPerPage).map((product) => {
                            return (
                                <div className="product" key={product.id}>
                                    <Link to={`/products/${product.id}`} className="product-img">
                                        <img src={product.img} alt="" />
                                    </Link>
                                    <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
                                    <div className="product-footer">
                                        <div className="product-price">
                                            <span className="small">Qiymət</span>
                                            <b>{product.price}$</b>
                                        </div>
                                        <div className="product-payment">
                                            <span className="small">Hissə-hissə ödəniş</span>
                                            <span>12ay <b>{(product.price / 12).toFixed(2)}$</b></span>
                                        </div>
                                    </div>
                                    <button onClick={() => dispatch(addToCart(product))}>Səbətə at</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Pagination changePage={changePage} pageCount={pageCount} />
            </div>
        </section>
    )
}

export default Products