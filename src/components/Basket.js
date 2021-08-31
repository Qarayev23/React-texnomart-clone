import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { increase, decrease, remove } from '../actions/cartActions'

const Basket = () => {
    const cart = useSelector(state => state.cart.cart)
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])


    const totalPrice = cart.reduce((acc, element) => {
        return acc + element.price * element.count
    }, 0)

    const totalQuantity = cart.reduce((acc, element) => {
        return acc + element.count
    }, 0)

    const dispatch = useDispatch()

    return (
        <section className="cart-area">
            <div className="container">
                <div className="cart-content">
                    <h1>Səbət</h1>
                    {cart.length > 0 ?
                        <div className="cart-header">
                            <div className="cart-header-left">
                                <ul>
                                    <li><h3>Məhsul</h3></li>
                                </ul>
                            </div>
                            <div className="cart-header-right">
                                <ul>
                                    <li><h3>QİYMƏT</h3></li>
                                    <li><h3>MİQDARI</h3></li>
                                    <li><h3>ÜMUMİ</h3></li>
                                </ul>
                            </div>
                        </div>
                        : <div className="basket-empty">Səbətiniz hazırda boşdur.</div>
                    }
                    <div className="cart-body">
                        {
                            cart.map((item) => {
                                const amount = item.price * item.count

                                return <div className="cart-item" key={item.id}>
                                    <div className="cart-item-left">
                                        <div className="cart-img">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className="cart-name">
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                    <div className="cart-item-right">
                                        <div className="cart-price">
                                            <span className="mob-screen">Qiymət:</span>
                                            <span>{item.price}$</span>
                                        </div>
                                        <div className="cart-quantity">
                                            <button type="button" className="minus-btn" onClick={() => dispatch(decrease(item.id))}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="count">{item.count}</span>
                                            <button type="button" className="plus-btn" onClick={() => dispatch(increase(item.id))}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="cart-total">
                                            <span className="mob-screen">Ümumi:</span>
                                            <span>{amount}$</span>
                                        </div>
                                        <div className="cart-remove">
                                            <button onClick={() => dispatch(remove(item.id))}><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="cart-footer">
                        <Link to="/" className="go-to-store">
                            <i class="fas fa-long-arrow-alt-left"></i>
                                    Mağazaya keç
                        </Link>
                        {cart.length > 0 ?
                            <a href="" className="clean-cart">
                                Səbəti təmizlə
                                </a>
                            : ""
                        }
                    </div>
                    {cart.length > 0 ?
                        <div className="cart-totals">
                            <h3>Səbətdəki məhsullar</h3>
                            <ul>
                                <li>
                                    <span>Ümumi say</span>
                                    <span>{totalQuantity}</span>
                                </li>
                                <li>
                                    <span>Ümumi məbləğ</span>
                                    <span>{totalPrice}$</span>
                                </li>
                            </ul>
                            <a href="#" className="pay-cart">Kartla ödə</a>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </section>
    )
}

export default Basket
