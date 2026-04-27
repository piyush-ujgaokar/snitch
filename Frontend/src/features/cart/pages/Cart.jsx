import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useCart } from '../hooks/useCart'
import { Link } from 'react-router' // or react-router-dom

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const { handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem } = useCart()

    useEffect(() => {
        handleGetCart()
    }, [])

    // STRICT SAFETY CHECK: Force array to prevent `.map is not a function` error overlays
    const rawCartItems = cart?.Items || []
    const cartItems = Array.isArray(rawCartItems) ? rawCartItems : (Array.isArray(rawCartItems.items) ? rawCartItems.items : [])

    const { subtotal, estimatedDelivery } = useMemo(() => {
        let total = 0
        cartItems.forEach(item => {
            // Defensive extraction
            const product = typeof item.product === 'object' ? item.product : (typeof item.productId === 'object' ? item.productId : null)
            const variant = typeof item.varient === 'object' ? item.varient : (typeof item.varientId === 'object' ? item.varientId : null)

            // Resolve price
            const price = variant?.price?.amount || product?.price?.amount || item.price || 0
            total += (price * (item.quantity || 1))
        })
        return {
            subtotal: total,
            estimatedDelivery: total > 0 ? 0 : 0 // Free delivery
        }
    }, [cartItems])

    const total = subtotal + estimatedDelivery

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] w-full bg-[#f9f9f9] flex flex-col items-center justify-center space-y-6">
                <p className="text-sm font-bold tracking-widest text-[#1b1b1b] uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                    Your Bag is Empty
                </p>
                <Link to="/" className="text-xs font-bold tracking-widest border-b border-black text-black uppercase pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#f9f9f9] text-[#1b1b1b] p-6 lg:p-16">
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                
                {/* Left Side: Items Sequence */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <h1 className="text-4xl lg:text-5xl font-light tracking-wide uppercase mb-12" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Bag <span className="text-[#bfbfbf] text-2xl tracking-[0.2em] ml-2">[{cartItems.length}]</span>
                    </h1>

                    <div className="flex flex-col gap-12">
                        {cartItems.map((item, idx) => {
                            // Defensive parsing
                            const pId = item.productId?._id || item.productId || item.product?._id || item.product;
                            const vId = item.varientId?._id || item.varientId || item.varient?._id || item.varient || item.variantId?._id || item.variantId || item.variant?._id || item.variant;
                            
                            const product = typeof item.product === 'object' ? item.product : (typeof item.productId === 'object' ? item.productId : {});
                            const variant = typeof item.varient === 'object' ? item.varient : (typeof item.varientId === 'object' ? item.varientId : (typeof item.variant === 'object' ? item.variant : {}));
                            
                            const title = product?.title || 'Unknown Product';
                            const priceAmount = variant?.price?.amount || product?.price?.amount || item.price || 0;
                            const priceCurrency = variant?.price?.currency || product?.price?.currency || 'INR';
                            const images = variant?.images?.length ? variant.images : (product?.images || []);
                            const image = images[0]?.url || '/placeholder.png';
                            
                            // Parse attributes
                            const attrs = variant?.attributes || variant?.attribute || {};

                            return (
                                <div key={`${pId}-${vId}-${idx}`} className="flex flex-col sm:flex-row gap-8 items-start group">
                                    <div className="w-full sm:w-48 bg-[#ffffff] aspect-[3/4] flex items-center justify-center transition-all duration-500 overflow-hidden">
                                        <img src={image} alt={title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    </div>
                                    <div className="flex-1 flex flex-col pt-2 pb-2">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg lg:text-xl font-bold tracking-widest uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                                                {title}
                                            </h3>
                                            <p className="text-sm font-bold tracking-widest text-black whitespace-nowrap ml-4">
                                                {priceCurrency} {priceAmount.toLocaleString('en-IN')}
                                            </p>
                                        </div>

                                        {Object.keys(attrs).length > 0 && (
                                            <div className="flex flex-wrap gap-4 mb-8">
                                                {Object.entries(attrs).map(([k, v]) => (
                                                    <span key={k} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777]">
                                                        {k}: <span className="text-[#1b1b1b]">{v}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full pt-4">
                                            {/* Quantity Tuner */}
                                            <div className="flex items-center gap-4 bg-[#ffffff] border border-[#e8e8e8] px-4 py-2 w-max">
                                                <button 
                                                    onClick={() => handleDecrementCartItem({ productId: pId, varientId: vId })}
                                                    className="w-6 h-6 flex items-center justify-center text-[#777777] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M20 12H4"/></svg>
                                                </button>
                                                <span className="text-xs font-bold w-6 text-center select-none" style={{ fontFamily: 'Epilogue, sans-serif' }}>{item.quantity}</span>
                                                <button 
                                                    onClick={() => handleIncrementCartItem({ productId: pId, varientId: vId })}
                                                    className="w-6 h-6 flex items-center justify-center text-[#777777] hover:text-black transition-colors cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4v16m8-8H4"/></svg>
                                                </button>
                                            </div>

                                            {/* Purge Action */}
                                            <button 
                                                onClick={() => handleRemoveCartItem({ productId: pId, varientId: vId })}
                                                className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777] border-b border-transparent hover:border-[#1b1b1b] hover:text-[#1b1b1b] transition-all cursor-pointer pb-1"
                                            >
                                                Remove Selection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Side: Order Summary Panel */}
                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24 bg-[#ffffff] p-8 lg:p-12 shadow-[0_20px_40px_rgba(27,27,27,0.04)] font-manrope">
                        <h2 className="text-xl font-light tracking-widest uppercase mb-8" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-6 text-sm tracking-widest mb-10 border-b border-[#e8e8e8] pb-10">
                            <div className="flex justify-between items-center text-[#474747]">
                                <span className="uppercase text-[10px] font-bold tracking-[0.2em]">Subtotal</span>
                                <span>INR {subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#474747]">
                                <span className="uppercase text-[10px] font-bold tracking-[0.2em]">Estimated Delivery</span>
                                <span>{estimatedDelivery === 0 ? 'Complimentary' : `INR ${estimatedDelivery}`}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-12">
                            <span className="text-xs font-bold tracking-widest uppercase">Total</span>
                            <span className="text-2xl font-bold tracking-widest" style={{ fontFamily: 'Epilogue, sans-serif' }}>INR {total.toLocaleString('en-IN')}</span>
                        </div>

                        <button className="w-full py-5 bg-[#000000] text-[#e2e2e2] text-xs font-bold tracking-[0.2em] uppercase border border-black hover:bg-[#2b2b2b] transition-colors duration-300 cursor-pointer">
                            Secure Checkout
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#777777]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            <span>End-to-End Encryption</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart