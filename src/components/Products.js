import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterByPrice, getProducts } from '../redux/features/productSlice'
import { addToCart } from '../redux/features/cartSlice'
import Spinner from "../components/Spinner"
import Pagination from './Pagination'
import Select from 'react-select'

const Products = () => {
    const { products, loading } = useSelector(state => state.productSlice)
    const { cart } = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(products.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])


    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'inc-price', label: 'Ucuzdan bahaya' },
        { value: 'dec-price', label: 'Bahadan ucuza' }
    ]

    const [value, setValue] = useState({
        value: "standart",
        label: "Standart sıralama"
    });

    function filterByPriceFunc(selected) {
        setValue(selected)
        if (selected.value == "inc-price") {
            dispatch(filterByPrice("asc"))
        } else if (selected.value == "dec-price") {
            dispatch(filterByPrice("desc"))
        }
        else if (selected.value == "standart") {
            dispatch(getProducts())
        }
    }

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