import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        Items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.Items = action.payload
        },
        addItem: (state, action) => {
            state.Items.push(action.payload)
        },
        incrementCartItem: (state, action) => {
            const { productId, varientId } = action.payload

            state.Items = state.Items.map(item => {
                const pId = item.productId?._id || item.productId || item.product?._id || item.product;
                const vId = item.varientId?._id || item.varientId || item.varient?._id || item.varient || item.variantId?._id || item.variantId || item.variant?._id || item.variant;
                
                if (pId === productId && vId === varientId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                } else {
                    return item
                }
            })
        },
        decrementCartItem: (state, action) => {
            const { productId, varientId } = action.payload

            state.Items = state.Items.map(item => {
                const pId = item.productId?._id || item.productId || item.product?._id || item.product;
                const vId = item.varientId?._id || item.varientId || item.varient?._id || item.varient || item.variantId?._id || item.variantId || item.variant?._id || item.variant;

                if (pId === productId && vId === varientId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                } else {
                    return item
                }
            })
        },
        removeCartItem: (state, action) => {
            const { productId, varientId } = action.payload

            state.Items = state.Items.filter(item => {
                const pId = item.productId?._id || item.productId || item.product?._id || item.product;
                const vId = item.varientId?._id || item.varientId || item.varient?._id || item.varient || item.variantId?._id || item.variantId || item.variant?._id || item.variant;
                
                return !(pId === productId && vId === varientId)
            })
        }
        
    }
})

export const { setItems, addItem, incrementCartItem, decrementCartItem, removeCartItem } = cartSlice.actions

export default cartSlice.reducer