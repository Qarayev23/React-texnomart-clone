import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/features/productSlice'
import { addToCart } from '../redux/features/cartSlice'
import Spinner from "../components/Spinner"
import Pagination from './Pagination'

const Products = () => {
    const { products, loading, } = useSelector(state => state.productSlice)
    const { cart } = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
        console.log(cart);
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
                            <span>{products.length}</span> Məhsul tapıldı
                        </div>
                    </div>
                    <div className="products-list">
                        {products.map((product) => {
                            const payment = (product.price / 12).toFixed(2)

                            return (
                                <Link to="" className="product" key={product.id}>
                                    <div className="product-img">
                                        <img src={product.img} alt="" />
                                    </div>
                                    <h4 className="product-name">{product.name}</h4>
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
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <Pagination />
            </div>
        </section>
    )
}

export default Products