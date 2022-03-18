import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/features/productSlice'
import { addToCart } from '../redux/features/cartSlice'
import Spinner from "../components/Spinner"
import Pagination from './Pagination'

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
      window.scroll(0,0)
    };

    useEffect(() => {
        dispatch(getProducts())
    }, [])

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
                    </div>
                    <div className="products-list">
                        {products.slice(pagesVisited, pagesVisited + usersPerPage).map((product) => {
                            const payment = (product.price / 12).toFixed(2)

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
                                            <span>12ay <b>{payment}$</b></span>
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