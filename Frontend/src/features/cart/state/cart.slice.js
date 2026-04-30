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
            const { productId, varientId } = action.payload;

            const extractId = (val) => {
                if (!val) return null;
                if (typeof val === 'object') return val._id ? String(val._id) : String(val);
                return String(val);
            };
            
            const normalizeVId = (v, p) => {
                const vid = extractId(v);
                const pid = extractId(p);
                if (!vid || vid === pid || vid === 'null' || vid === 'undefined') return null;
                return vid;
            };

            const reqPId = extractId(productId);
            const reqVId = normalizeVId(varientId, reqPId);

            const item = state.Items.find(item => {
                const itemPId = extractId(item.productId || item.product);
                const itemVId = normalizeVId(item.varientId || item.varient || item.variantId || item.variant, itemPId);
                return itemPId === reqPId && itemVId === reqVId;
            });

            if (item) {
                item.quantity += 1;
            }
        },
        decrementCartItem: (state, action) => {
            const { productId, varientId } = action.payload;

            const extractId = (val) => {
                if (!val) return null;
                if (typeof val === 'object') return val._id ? String(val._id) : String(val);
                return String(val);
            };
            
            const normalizeVId = (v, p) => {
                const vid = extractId(v);
                const pid = extractId(p);
                if (!vid || vid === pid || vid === 'null' || vid === 'undefined') return null;
                return vid;
            };

            const reqPId = extractId(productId);
            const reqVId = normalizeVId(varientId, reqPId);

            const item = state.Items.find(item => {
                const itemPId = extractId(item.productId || item.product);
                const itemVId = normalizeVId(item.varientId || item.varient || item.variantId || item.variant, itemPId);
                return itemPId === reqPId && itemVId === reqVId;
            });

            if (item) {
                item.quantity -= 1;
            }
        },
        removeCartItem: (state, action) => {
            const { productId, varientId } = action.payload;

            const extractId = (val) => {
                if (!val) return null;
                if (typeof val === 'object') return val._id ? String(val._id) : String(val);
                return String(val);
            };
            
            const normalizeVId = (v, p) => {
                const vid = extractId(v);
                const pid = extractId(p);
                if (!vid || vid === pid || vid === 'null' || vid === 'undefined') return null;
                return vid;
            };

            const reqPId = extractId(productId);
            const reqVId = normalizeVId(varientId, reqPId);

            state.Items = state.Items.filter(item => {
                const itemPId = extractId(item.productId || item.product);
                const itemVId = normalizeVId(item.varientId || item.varient || item.variantId || item.variant, itemPId);
                return !(itemPId === reqPId && itemVId === reqVId);
            });
        }
        
    }
})

export const { setItems, addItem, incrementCartItem, decrementCartItem, removeCartItem } = cartSlice.actions

export default cartSlice.reducer