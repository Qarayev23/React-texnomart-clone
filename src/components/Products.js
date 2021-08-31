import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'

const Products = () => {
    const products = useSelector(state => state.products.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const cart = useSelector(state => state.cart.cart)
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

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
            </div>
        </section>
    )
}

export default Products