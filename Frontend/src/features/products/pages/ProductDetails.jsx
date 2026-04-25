import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useProduct } from '../hooks/useProduct'

const ProductDetails = () => {

  const { productId } = useParams()
  const { handleGetProductDetails } = useProduct()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  async function fetchedProductDetail() {
    setLoading(true)
    try {
      const data = await handleGetProductDetails(productId)
      setProduct(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchedProductDetail()
  }, [productId])

  const nextImage = () => {
    if (!product?.images) return
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product?.images) return
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <p className="text-sm font-bold tracking-widest text-[#777777] uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Loading Asset...
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center space-y-6">
        <p className="text-sm font-bold tracking-widest text-[#1b1b1b] uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Asset Not Found
        </p>
        <Link to="/" className="text-xs font-bold tracking-widest border-b border-black text-black uppercase pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors">
          Return to Gallery
        </Link>
      </div>
    )
  }

  const images = product.images || []
  const hasImages = images.length > 0

  return (
    <div className="h-screen w-full bg-white text-black overflow-hidden flex flex-col" style={{ fontFamily: 'Manrope, sans-serif' }}>

      {/* Minimalist Header */}
      <nav className="w-full h-20 border-b border-[#e8e8e8] bg-white flex-shrink-0 relative z-50">
        <div className="w-full px-6 lg:px-12 h-full flex items-center justify-between">
          <Link to="/" className="text-xs font-bold tracking-widest uppercase hover:text-[#777777] transition-colors">
            ← Back
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <h1 className="text-2xl font-extralight tracking-[0.2em] text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                FAB_MENS
              </h1>
            </Link>
          </div>
          <div className="flex items-center  gap-6">
            <button className="text-[#1b1b1b] cursor-pointer hover:text-[#777777] transition-colors relative group" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row overflow-hidden">

        {/* Left Side: Image Gallery Carousel */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-full lg:border-r lg:border-[#e8e8e8] bg-[#f9f9f9] relative group">
          {hasImages ? (
            <>
              <div className="w-full h-full p-8 lg:p-20 flex items-center justify-center pb-12 lg:pb-24">
                <img
                  src={images[currentImageIndex]?.url || '/placeholder.png'}
                  alt={`${product.title} - view ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain transition-transform duration-[1s] ease-out"
                />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 border border-transparent hover:border-black hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5  text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 border border-transparent hover:border-black hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5  text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-black' : 'w-4 bg-black/30'}`}
                  ></div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xs text-[#777777] uppercase tracking-widest">No Visuals Provided</p>
            </div>
          )}
        </div>

        {/* Right Side: Product Information */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-full p-8 sm:p-12 lg:p-16 overflow-y-auto">
          <div className="space-y-6">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              {(product.title || '').replace(/_/g, ' ')}
            </h2>

            <p className="text-xl sm:text-2xl font-bold tracking-widest text-[#1b1b1b]">
              {product.price?.currency || 'INR'} {product.price?.amount?.toLocaleString('en-IN') || '0'}
            </p>

            <div className="w-full h-[1px] bg-[#e8e8e8] my-8"></div>

            <p className="text-sm text-[#474747] leading-relaxed tracking-wide mb-12">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-12 pb-8">
              <button className="cursor-pointer w-full py-5 bg-black text-[#e2e2e2] text-xs font-bold tracking-[0.2em] uppercase border border-black hover:bg-[#2b2b2b] transition-colors duration-300">
                Buy Now
              </button>
              <button className="cursor-pointer w-full py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase border border-[#c6c6c6] hover:border-black transition-colors duration-300">
                Add To Cart
              </button>
            </div>

            {/* Supplementary Information Accordions (Static Mock)
            <div className="border-t border-[#e8e8e8] pb-12">
              <div className="py-6 border-b border-[#e8e8e8] flex justify-between items-center cursor-pointer group">
                <span className="text-xs font-bold tracking-widest uppercase text-[#1b1b1b] group-hover:text-[#777777] transition-colors">Details & Care</span>
                <svg className="w-4 h-4 text-black group-hover:text-[#777777] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
              </div>
              <div className="py-6 border-b border-[#e8e8e8] flex justify-between items-center cursor-pointer group">
                <span className="text-xs font-bold tracking-widest uppercase text-[#1b1b1b] group-hover:text-[#777777] transition-colors">Delivery & Returns</span>
                <svg className="w-4 h-4 text-black group-hover:text-[#777777] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
              </div>
            </div> */}

          </div>
        </div>

      </main>
    </div>
  )
}

export default ProductDetails