import { createSlice } from "@reduxjs/toolkit";



const cartSlice=createSlice({
    name:"cart",
    initialState:{
        Items:[],
    },
    reducers:{
        setItems:(state,action)=>{
            state.Items=action.payload  
        },
        addItem:(state,action)=>{
            state.Items.push(action.payload)
        }
    }   
})

export const {setItems,addItem}=cartSlice.actions

export default cartSlice.reducer