import axios from "axios";


const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})


export const getCartItems = async () => {
    const response = await cartApiInstance.get("/")
    return response.data
}

export const addItem = async ({ productId, varientId }) => {
    const response = await cartApiInstance.post(`/add/${productId}/${varientId}`, {
        quantity: 1
    })
    return response.data
}

export const incrementCartItemApi = async ({ productId, varientId }) => {
    const response = await cartApiInstance.patch(`/quantity/increment/${productId}/${varientId}`)
    return response.data
}

export const decrementCartItemApi = async ({ productId, varientId }) => {
    const response = await cartApiInstance.patch(`/quantity/decrement/${productId}/${varientId}`)
    return response.data
}

export const removeCartItemApi = async ({ productId, varientId }) => {
    const response = await cartApiInstance.delete(`/remove/${productId}/${varientId}`)
    return response.data
}