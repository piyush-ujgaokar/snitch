import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useProduct } from '../hooks/useProduct'

const SellerProductDetail = () => {
    const { productId } = useParams()
    const { handleGetProductDetails,handleAddProductVarient } = useProduct()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    // Variant Form State
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [attributes, setAttributes] = useState([{ key: '', value: '' }])
    const [images, setImages] = useState([]) // Array of files/preview URLs
    const [localVariants, setLocalVariants] = useState([]) // Local state for immediate UI update

    async function fetchedProductDetail() {
        setLoading(true)
        try {
            const data = await handleGetProductDetails(productId)
            setProduct(data?.product || data)
        } catch (err) {
            console.error("Failed to fetch product details", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchedProductDetail()
    }, [productId])

    const handleAttributeChange = (index, field, val) => {
        const newAttrs = [...attributes]
        newAttrs[index][field] = val
        setAttributes(newAttrs)
    }

    const addAttributeField = () => {
        setAttributes([...attributes, { key: '', value: '' }])
    }
    
    const removeAttributeField = (index) => {
        const newAttrs = [...attributes]
        newAttrs.splice(index, 1)
        setAttributes(newAttrs)
    }

    const handleImageSelection = (e) => {
        if (!e.target.files) return
        const files = Array.from(e.target.files)
        
        if (images.length + files.length > 7) {
            alert("Maximum limit of 7 images per variant reached.")
            return
        }

        const newImages = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }))

        setImages([...images, ...newImages])
    }

    const removeImage = (index) => {
        const newImages = [...images]
        URL.revokeObjectURL(newImages[index].url) // Cleanup memory
        newImages.splice(index, 1)
        setImages(newImages)
    }

    const handleSubmitVariant = async(e) => {
        e.preventDefault()

        // Validation logic
        const validAttributes = attributes.filter(a => a.key.trim() !== '' && a.value.trim() !== '')
        if (validAttributes.length === 0) {
            alert("At least one valid attribute (Key and Value) is strictly required.")
            return
        }

        const parsedStock = parseInt(stock) || 0
        const parsedPriceAmount = price ? parseFloat(price) : ''

        // Create attributes map object
        const attributeMap = {}
        validAttributes.forEach(attr => {
            attributeMap[attr.key] = attr.value
        })

        // Format new local variant
        const newVariant = {
            images: images, // locally stored { url, file }
            stock: parsedStock,
            attributes: attributeMap,
            price: {
                amount: parsedPriceAmount || product.price.amount,
                currency: product.price.currency || 'INR'
            }
        }

        // send to server
        try {
            const saved = await handleAddProductVarient(productId, newVariant)

            // if server returned updated product, update UI from server state
            if (saved) {
                setProduct(saved)
                // clear any local-only variants since server copy is now authoritative
                setLocalVariants([])
            } else {
                // fallback: keep local variant so user sees immediate feedback
                setLocalVariants([newVariant, ...localVariants])
            }

            console.log("Saved variant result:", saved)
        } catch (err) {
            console.error('Failed to save variant', err)
            // still show locally so user doesn't lose work
            setLocalVariants([newVariant, ...localVariants])
        }

        // Reset form
        setPrice('')
        setStock('')
        setAttributes([{ key: '', value: '' }])
        // Do NOT revoke object URLs here since they are now being rendered directly in the Local Variants grid!
        setImages([])
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
                    Asset Directory Mismatch
                </p>
                <Link to="/dashboard" className="text-xs font-bold tracking-widest border-b border-black text-black uppercase pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        )
    }

    // Combine remote variants (backend uses `varients`) and locally created variants
    const remoteVariants = product.varients || product.variants || []
    const displayVariants = [...localVariants, ...remoteVariants]

    return (
        <div className="min-h-screen w-full bg-[#f9f9f9] text-black overflow-x-hidden flex flex-col pt-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
            
            {/* Minimalist Top Nav within Dashboard */}
            <nav className="w-full px-6 lg:px-12 mb-8 flex items-center justify-between">
                <Link to="/dashboard" className="text-xs font-bold tracking-widest uppercase hover:text-[#777777] transition-colors">
                    ← Back to Index
                </Link>
                <h1 className="text-xl font-extralight tracking-[0.2em] text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                    Variant Control
                </h1>
            </nav>

            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16 pb-20">
                
                {/* Left Side: Product Info & Existing Variants */}
                <div className="w-full lg:w-7/12 flex flex-col">
                    
                    {/* Parent Product Header */}
                    <div className="bg-white border border-[#e8e8e8] p-8 mb-8">
                         <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777] mb-2 block">
                             Parent Identity
                         </span>
                         <h2 className="text-2xl sm:text-3xl font-light tracking-wide uppercase text-black mb-4 truncate" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            {(product.title || '').replace(/_/g, ' ')}
                         </h2>
                         <p className="text-sm text-[#474747] leading-relaxed tracking-wide line-clamp-2 mb-6">
                             {product.description}
                         </p>

                         {/* Parent Visuals */}
                         {product.images && product.images.length > 0 && (
                             <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                 {product.images.map((img, idx) => (
                                     <div key={img._id || idx} className="w-30 h-40 flex-shrink-0 border border-[#e8e8e8] bg-[#f9f9f9] overflow-hidden group">
                                         <img 
                                             src={img.url} 
                                             alt="Parent Asset" 
                                             className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                                         />
                                     </div>
                                 ))}
                             </div>
                         )}
                    </div>

                    {/* Existing Variants Grid */}
                    <div>
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-black mb-6" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            Linked Variants ({displayVariants.length})
                        </h3>

                        {displayVariants.length === 0 ? (
                            <div className="w-full py-16 border border-[#e8e8e8] bg-white flex items-center justify-center">
                                <p className="text-xs text-[#777777] uppercase tracking-widest">No variations compiled</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {displayVariants.map((variant, idx) => (
                                    <div key={idx} className="bg-white border border-[#e8e8e8] p-6 hover:border-black transition-colors group cursor-pointer animate-[fadeIn_0.5s_ease-out]">
                                        <div className="w-full aspect-square bg-[#f9f9f9] border border-[#e8e8e8] mb-4 overflow-hidden relative flex items-center justify-center">
                                             {variant.images && variant.images.length > 0 ? (
                                                 <img src={variant.images[0].url} alt="Variant" className="object-cover w-full h-full mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                                             ) : (
                                                 <span className="text-[10px] text-[#c6c6c6] uppercase tracking-widest">No Visual</span>
                                             )}
                                             
                                             {/* Badge for unsaved local data */}
                                             {variant.images && variant.images[0]?.file && (
                                                 <div className="absolute top-2 right-2 bg-black text-white text-[8px] px-2 py-1 uppercase tracking-widest">Local</div>
                                             )}
                                        </div>
                                        <div className="flex justify-between items-end mb-4">
                                            <span className="text-sm font-bold tracking-widest">{variant.price?.currency || 'INR'} {variant.price?.amount || 0}</span>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#777777]">Stock: {variant.stock || 0}</span>
                                        </div>
                                        <div className="border-t border-[#e8e8e8] pt-4">
                                            {(variant.attributes || variant.attribute) && Object.entries(variant.attributes || variant.attribute).map(([k, v]) => (
                                                <div key={k} className="flex justify-between text-xs tracking-wider mb-1">
                                                    <span className="text-[#777777] uppercase">{k}</span>
                                                    <span className="text-black font-medium">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: New Variant Form */}
                <div className="w-full lg:w-5/12">
                    <div className="bg-white border border-[#e8e8e8] p-8 lg:p-10 lg:sticky lg:top-8">
                        <h3 className="text-lg font-light tracking-[0.2em] uppercase text-black mb-8 border-b border-[#e8e8e8] pb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            Compile New Variant
                        </h3>

                        <form onSubmit={handleSubmitVariant} className="space-y-8">
                            
                            {/* Base Specs */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col relative group">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777] mb-2">Price (INR) <span className="font-normal normal-case opacity-50">- Optional</span></label>
                                    <input 
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#e8e8e8] rounded-none py-2 text-sm text-black focus:outline-none focus:border-black transition-colors"
                                        placeholder="0.00"
                                    />
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                                </div>
                                <div className="flex flex-col relative group">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777] mb-2">Stock Units <span className="text-red-500">*</span></label>
                                    <input 
                                        type="number"
                                        required
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#e8e8e8] rounded-none py-2 text-sm text-black focus:outline-none focus:border-black transition-colors"
                                        placeholder="0"
                                    />
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-[#e8e8e8]"></div>

                            {/* Dynamic Attributes */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                     <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777]">Attributes <span className="text-red-500">*</span></label>
                                     <button type="button" onClick={addAttributeField} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black hover:text-[#777777] transition-colors border-b border-black pb-[1px]">
                                         + Append Layer
                                     </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {attributes.map((attr, idx) => (
                                        <div key={idx} className="flex gap-4 items-end animate-[fadeIn_0.5s_ease-out]">
                                            <div className="w-1/2 flex flex-col">
                                                <input 
                                                    type="text" 
                                                    placeholder="Key (e.g. Size, Color)" 
                                                    value={attr.key}
                                                    onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                                    className="w-full bg-transparent border-b border-[#e8e8e8] rounded-none py-2 text-xs text-black focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="w-1/2 flex flex-col relative">
                                                <input 
                                                    type="text" 
                                                    placeholder="Value (e.g. XL, Black)" 
                                                    value={attr.value}
                                                    onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                                    className="w-full bg-transparent border-b border-[#e8e8e8] rounded-none py-2 text-xs text-black focus:outline-none focus:border-black transition-colors"
                                                />
                                                {attributes.length > 1 && (
                                                    <button type="button" onClick={() => removeAttributeField(idx)} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#c6c6c6] hover:text-red-500 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-[#e8e8e8]"></div>

                            {/* Image Upload Area */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#777777]">Upload Visuals <span className="font-normal normal-case opacity-50">- Optional</span></label>
                                    <span className="text-[10px] text-[#777777] font-bold tracking-widest">{images.length}/7</span>
                                </div>
                                
                                {images.length < 7 && (
                                    <label className="w-full h-24 border border-[#e8e8e8] border-dashed bg-[#f9f9f9] flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors group mb-4">
                                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelection} />
                                        <svg className="w-5 h-5 text-[#c6c6c6] group-hover:text-black transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-black text-[#777777] transition-colors">{images.length === 0 ? "Drag Assets Here" : "Add More"}</span>
                                    </label>
                                )}

                                {/* Image Previews */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="aspect-square relative group bg-[#f9f9f9] border border-[#e8e8e8] overflow-hidden">
                                                <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                                                <div 
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                                    onClick={() => removeImage(idx)}
                                                >
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="w-full py-5 bg-black text-[#e2e2e2] text-xs font-bold tracking-[0.2em] uppercase border border-black hover:bg-white hover:text-black transition-all duration-300 mt-4 cursor-pointer">
                                Synthesize Variant
                            </button>

                        </form>
                    </div>
                </div>

            </main>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}} />
        </div>
    )
}

export default SellerProductDetail