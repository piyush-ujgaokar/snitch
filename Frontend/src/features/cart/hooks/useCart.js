import { useDispatch } from "react-redux";
import { addItem, createCartOrder, decrementCartItemApi, getCartItems, incrementCartItemApi, removeCartItemApi, verifyCartOrder, getPaymentDetails } from "../service/cart.api";
import { setCart } from "../state/cart.slice";

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddItem({ productId, varientId }) {
        const data = await addItem({ productId, varientId })
        return data
    }

    async function handleGetCart() {
        const data = await getCartItems()
        console.log("Fetched Cart:", data)
        //const extractedItems = Array.isArray(data?.cart) ? data.cart : (Array.isArray(data?.cart?.items) ? data.cart.items : (Array.isArray(data?.items) ? data.items : []))
        dispatch(setCart(data.cart))
    }

    async function handleIncrementCartItem({ productId, varientId }) {
        await incrementCartItemApi({ productId, varientId })
        await handleGetCart()
    }

    async function handleDecrementCartItem({ productId, varientId }) {
        await decrementCartItemApi({ productId, varientId })
        await handleGetCart()
    }

    async function handleRemoveCartItem({ productId, varientId }) {
        await removeCartItemApi({ productId, varientId })
        await handleGetCart()
    }

    async function handleCreateCartOrder({amount,currency}){
        const data=await createCartOrder({amount,currency})
        return data.order
    }

    async function handleVerifyCartOrder({razorpay_order_id,razorpay_payment_id,razorpay_signature}){
        const data=await verifyCartOrder({razorpay_order_id,razorpay_payment_id,razorpay_signature})
        return data.success
    }

    async function handleGetPaymentDetails(orderId) {
        const data = await getPaymentDetails(orderId)
        return data.order
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem, handleCreateCartOrder, handleVerifyCartOrder, handleGetPaymentDetails }
}