import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import { setProducts } from '../state/product.slice'




const Home = () => {
    const dispatch=useDispatch()
    const {handleGetAllProducts}=useProduct()

    const products=useSelector(state=>state.product.products)
    
    useEffect(()=>{
        handleGetAllProducts()
        dispatch(setProducts(products))
    },[])


    console.log(products)



  return (
    <div>Home</div>
  )
}

export default Home