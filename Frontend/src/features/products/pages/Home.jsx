import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import { setProducts } from '../state/product.slice'
import { useNavigate } from 'react-router'

const Home = () => {
    const dispatch = useDispatch()
    const { handleGetAllProducts } = useProduct()
    const products = useSelector(state => state.product.products) || []
    const navigate=useNavigate()
    
    useEffect(() => {
        handleGetAllProducts()
        dispatch(setProducts(products))
    }, [])

    return (
        <div className="min-h-screen w-full bg-white text-black overflow-x-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
            
            {/* Minimalist Navigation */}
            <nav className="w-full border-b border-[#e8e8e8] bg-white sticky top-0 z-50">
                <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    
                    {/* Left: Nav Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        <button className="text-xs font-bold tracking-widest uppercase hover:text-[#777777] transition-colors relative group py-2">
                            Shop
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        {/* <button className="text-xs font-bold tracking-widest uppercase hover:text-[#777777] transition-colors relative group py-2">
                            Collections
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button className="text-xs font-bold tracking-widest uppercase hover:text-[#777777] transition-colors relative group py-2">
                            Editorial
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </button> */}
                    </div>

                    {/* Center: Brand */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <h1 className="text-3xl font-extralight tracking-[0.2em] text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            FAB_MENS
                        </h1>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-6 lg:gap-8">
                        <button className="text-[#1b1b1b] hover:text-[#777777] transition-colors" aria-label="Search">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"></path></svg>
                        </button>
                        <button className="text-[#1b1b1b] hover:text-[#777777] transition-colors" aria-label="Account">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"></path></svg>
                        </button>
                        <button className="text-[#1b1b1b] hover:text-[#777777] transition-colors relative group" aria-label="Cart">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </button>
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full h-[85vh] bg-[#1b1b1b] flex items-center justify-center overflow-hidden">
                {/* Hero Backgronud */}
                <div className="absolute inset-0 w-full h-full">
                     <img 
                       src="/images/login.png" 
                       className="w-full h-full object-cover object-[center_30%] opacity-60 scale-105 animate-[zoomOut_10s_ease-out_forwards]" 
                       alt="Hero Collection" 
                     />
                </div>
                
                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
                     <span className="text-white tracking-[0.3em] text-xs font-bold uppercase mb-6 drop-shadow-md">New Season Arrivals</span>
                     <h2 className="text-5xl md:text-7xl font-extralight tracking-widest text-white uppercase leading-tight mb-10 drop-shadow-lg" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                         The Monolithic<br/>Collection
                     </h2>
                     <button className="px-10 py-5 bg-white text-black border border-white hover:bg-transparent hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.02]">
                         Shop The Collection
                     </button>
                </div>
            </section>

            {/* Latest Releases Grid */}
            <section className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-24 sm:py-32">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-16 border-b border-[#e8e8e8] pb-6">
                    <h3 className="text-3xl font-light tracking-widest uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        Latest Releases
                    </h3>
                    <button className="text-xs font-bold tracking-widest uppercase text-[#777777] hover:text-black transition-colors relative group mt-4 sm:mt-0">
                        View All
                        <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className="w-full py-32 flex justify-center border border-[#e8e8e8]">
                        <p className="text-sm font-bold tracking-widest text-[#777777] uppercase">Loading Collection...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((product) => (
                            <article 
                            onClick={()=>{navigate(`/product/${product._id}`)}}
                            key={product._id} className="group cursor-pointer">
                                {/* Image Box */}
                                <div className="w-full aspect-[3/4] bg-[#f9f9f9] relative overflow-hidden mb-6 border border-[#eeeeee]">
                                    <img 
                                        src={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png'} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    
                                    {/* Quick Add Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                        <button className="w-full py-4 bg-black text-[#e2e2e2] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#2b2b2b] transition-colors border-t border-black">
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center flex flex-col items-center">
                                    <h4 className="text-sm font-bold tracking-widest uppercase text-[#1b1b1b] mb-2 truncate w-full group-hover:text-[#777777] transition-colors">
                                        {(product.title || '').replace(/_/g, ' ')}
                                    </h4>
                                    <span className="text-sm font-medium text-[#474747] tracking-wider">
                                        {product.price?.currency || 'INR'} {product.price?.amount?.toLocaleString('en-IN') || '0'}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        
            {/* Tailored CSS string inject for a keyframe */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes zoomOut {
                0% { transform: scale(1.1); opacity: 0; }
                100% { transform: scale(1.05); opacity: 0.6; }
              }
            `}} />
        </div>
    )
}

export default Home