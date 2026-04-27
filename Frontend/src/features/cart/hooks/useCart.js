import { useDispatch } from "react-redux";
import { addItem, decrementCartItemApi, getCartItems, incrementCartItemApi, removeCartItemApi } from "../service/cart.api";
import { addItem as addItemToCart, decrementCartItem, incrementCartItem, removeCartItem, setItems } from "../state/cart.slice";

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddItem({ productId, varientId }) {
        const data = await addItem({ productId, varientId })
        return data
    }

    async function handleGetCart() {
        const data = await getCartItems()
        console.log("Fetched Cart:", data)
        const extractedItems = Array.isArray(data?.cart) ? data.cart : (Array.isArray(data?.cart?.items) ? data.cart.items : (Array.isArray(data?.items) ? data.items : []))
        dispatch(setItems(extractedItems))
    }

    async function handleIncrementCartItem({ productId, varientId }) {
        await incrementCartItemApi({ productId, varientId })
        dispatch(incrementCartItem({ productId, varientId }))
    }

    async function handleDecrementCartItem({ productId, varientId }) {
        await decrementCartItemApi({ productId, varientId })
        dispatch(decrementCartItem({ productId, varientId }))
    }

    async function handleRemoveCartItem({ productId, varientId }) {
        await removeCartItemApi({ productId, varientId })
        dispatch(removeCartItem({ productId, varientId }))
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem }

}