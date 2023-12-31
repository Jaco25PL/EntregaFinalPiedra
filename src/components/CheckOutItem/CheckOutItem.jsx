import "../../App.css"
import styles from "./styles.module.css"
import Toastify from "toastify-js"
import { Logo } from "../Logo/Logo" 
import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import { CartContext } from "../../context/cartContext"

export const CheckOutItem = ({ client, orderId}) => {

    const { cart, cartItemsQuantity, totalCost, clearCart } = useContext(CartContext)

    const handleCopy = () => {
        const id = `order Id: ${orderId}`
        navigator.clipboard.writeText(id)
        Toastify({
            text: "Order Id copied",
            className: "info",
            gravity: "top",
            style: {
                background: "linear-gradient(to right, #111, #444)",
                borderRadius: ".5rem",
                cursor: "default",
            }
        }).showToast()
    }
    
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            clearCart()
        })
        return () => {
            clearCart()
        } 
    },[])

  

    return (

        <div className={styles.container}>
            <div id="iC" className={styles.itemContainer}>
                <div>
                    <Link to="/" className={`bi bi-x-lg ${styles.close}`}/>
                </div>
                <div>
                    <div className={styles.item}>
                        <Logo/>
                    </div>
                    <div className={styles.item}>
                        <div>Order ID: {orderId}c</div>
                        <div>Name: {client.userName}</div>
                    </div>
                    <div className={styles.item}>
                        {cart.map(item => 
                            <div key={item.id}>
                                <div>Product: {item.title}</div>
                                <div>{item.quantity}</div>
                            </div>
                        )}
                        <div>Quantity: {cartItemsQuantity()}</div>
                    </div>
                    <div className={styles.item}>
                        <div>Total Paid: ${totalCost()}</div>
                    </div>
                    <footer>
                        <span className={styles.ty}>Thank you for shopping with us</span>
                        <button onClick={handleCopy}>Copy ID</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}