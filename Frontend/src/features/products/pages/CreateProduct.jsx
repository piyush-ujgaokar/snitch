// import React, { useRef, useState } from 'react'
// import {useProduct} from '../hooks/useProduct'


// const CreateProduct=()=>{
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [price, setPrice] = useState('')
//   const [currency, setCurrency] = useState('INR')
//   const [files, setFiles] = useState([])
//   const fileInputRef = useRef(null)

//   const {handleCreateProduct}=useProduct()

//   const onFilesAdded = (newFiles) => {
//     const arr = Array.from(newFiles)
//     const combined = [...files, ...arr].slice(0, 7) // limit to 7
//     const withPreviews = combined.map((f) => {
//       if (typeof f === 'string') return f
//       return Object.assign(f, { preview: URL.createObjectURL(f) })
//     })
//     setFiles(withPreviews)
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     if (e.dataTransfer?.files) onFilesAdded(e.dataTransfer.files)
//   }

//   const handleSelectPrimary = (index) => {
//     const copy = [...files]
//     const [sel] = copy.splice(index, 1)
//     copy.unshift(sel)
//     setFiles(copy)
//   }

//   const removeImage = (index) => {
//     const copy = [...files]
//     const removed = copy.splice(index, 1)[0]
//     if (removed && removed.preview) URL.revokeObjectURL(removed.preview)
//     setFiles(copy)
//   }

//   const submit = async (e) => {
//     e.preventDefault()
//     // Basic client-side payload; replace with your API call
//     const formData = new FormData()
//     formData.append('title', title)
//     formData.append('description', description)
//     // backend validator expects `priceAmount` and `priceCurrency`
//     formData.append('priceAmount', Number(price))
//     formData.append('priceCurrency', currency)
//     files.forEach((f) => {
//       if (f instanceof File) formData.append('images', f)
//     })
// console.log(formData)
//     try {
//       // placeholder; update URL to your backend endpoint
//       await handleCreateProduct(formData) // Implement this function to call your API
//       alert('Product created (mock)')
//     } catch (err) {
//       console.error(err)
//       alert('Submit failed')
//     }
//   }

//   return (
//     <div className="min-h-screen w-full bg-[#f9f9f9] text-[#1b1b1b]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      
//       {/* Header */}
//       <header className="border-b border-[#c6c6c6] bg-white p-6 sm:px-12 flex items-center justify-between">
//         <h1 className="text-2xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//           SNITCH
//         </h1>
//         <p className="text-[10px] tracking-widest text-[#777777] uppercase">Seller Portal / Create Listing</p>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-24">
//         <div className="mb-16">
//           <h2 className="text-4xl lg:text-5xl font-light tracking-wide uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//             List Your Product
//           </h2>
//           <p className="text-[#777777] tracking-wider text-xs uppercase mt-4 max-w-xl leading-relaxed">
//             Curate your premium item for the Snitch collection. precision and detail are paramount.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          
//           {/* Left column: form */}
//           <form className="flex-1 space-y-12" onSubmit={submit}>
            
//             <div className="relative group">
//               <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
//                 Product Title
//               </label>
//               <input
//                 required
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g. MONOLITHIC OVERCOAT"
//                 className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
//               />
//             </div>

//             <div className="relative group">
//               <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
//                 Description
//               </label>
//               <textarea
//                 required
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe the materials, silhouette, and origin..."
//                 rows={4}
//                 className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] resize-none leading-relaxed"
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row gap-8 sm:items-end">
//               <div className="flex-1 relative group">
//                 <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
//                   Price
//                 </label>
//                 <input
//                   required
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   placeholder="0.00"
//                   type="number"
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
//                 />
//               </div>

//               <div className="w-full sm:w-48 relative group">
//                 <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
//                   Currency
//                 </label>
//                 <select 
//                   value={currency} 
//                   onChange={(e) => setCurrency(e.target.value)} 
//                   className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] appearance-none rounded-none cursor-pointer"
//                 >
//                   <option>INR</option>
//                   <option>USD</option>
//                   <option>EUR</option>
//                   <option>GBP</option>
//                 </select>
//                 {/* Custom dropdown arrow */}
//                 <svg className="w-4 h-4 text-[#1b1b1b] absolute right-2 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7"/></svg>
//               </div>
//             </div>

//             <div className="pt-8">
//               <button 
//                 type="submit"
//                 className="w-full md:w-auto px-12 py-5 bg-black text-[#e2e2e2] text-xs font-bold tracking-widest uppercase border border-black hover:bg-transparent hover:text-black transition-all duration-500"
//               >
//                 List Product
//               </button>
//             </div>
//           </form>

//           {/* Right column: images */}
//           <div className="w-full lg:w-5/12 xl:w-1/3">
//             <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-8 uppercase">
//               Product Visuals (Max 7)
//             </label>

//             <div
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={handleDrop}
//               onClick={() => fileInputRef.current?.click()}
//               className="border border-[#c6c6c6] h-64 flex flex-col items-center justify-center bg-white mb-6 relative cursor-pointer group hover:border-black transition-colors duration-300"
//             >
//               <div className="text-center p-6 flex flex-col items-center">
//                 <svg className="w-8 h-8 text-[#adabaa] group-hover:text-black mb-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" />
//                 </svg>
//                 <div className="text-xs font-bold tracking-widest uppercase text-[#1b1b1b] mb-2">Upload Files</div>
//                 <div className="text-[10px] tracking-widest uppercase text-[#777777]">Drag & Drop or browse</div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                   onChange={(e) => onFilesAdded(e.target.files)}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               {files.length === 0 && (
//                 <>
//                   <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
//                   </div>
//                   <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
//                   </div>
//                   <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
//                   </div>
//                 </>
//               )}

//               {files.map((f, idx) => (
//                 <div key={idx} className="relative aspect-[3/4] overflow-hidden border border-[#e8e8e8] group bg-[#f3f3f3]">
//                   <img src={f.preview || (typeof f === 'string' ? f : '')} alt={`img-${idx}`} className="object-cover w-full h-full" />
                  
//                   {/* Overlay for actions */}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
//                      <div className="flex justify-end">
//                        <button 
//                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }} 
//                          className="p-1.5 bg-white text-black hover:bg-black hover:text-white transition-colors"
//                        >
//                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
//                        </button>
//                      </div>
//                      <button 
//                        onClick={(e) => { e.stopPropagation(); handleSelectPrimary(idx); }} 
//                        className="w-full py-1.5 bg-white text-black text-[9px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
//                      >
//                        Primary
//                      </button>
//                   </div>
                  
//                   {/* Primary Badge */}
//                   {idx === 0 && (
//                      <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5">
//                        1st
//                      </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export default CreateProduct




import React, { useRef, useState } from 'react'
import {useProduct} from '../hooks/useProduct'


const CreateProduct=()=>{
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const {handleCreateProduct}=useProduct()

  const onFilesAdded = (newFiles) => {
    const arr = Array.from(newFiles)
    const combined = [...files, ...arr].slice(0, 7) // limit to 7
    const withPreviews = combined.map((f) => {
      if (typeof f === 'string') return f
      return Object.assign(f, { preview: URL.createObjectURL(f) })
    })
    setFiles(withPreviews)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer?.files) onFilesAdded(e.dataTransfer.files)
  }

  const handleSelectPrimary = (index) => {
    const copy = [...files]
    const [sel] = copy.splice(index, 1)
    copy.unshift(sel)
    setFiles(copy)
  }

  const removeImage = (index) => {
    const copy = [...files]
    const removed = copy.splice(index, 1)[0]
    if (removed && removed.preview) URL.revokeObjectURL(removed.preview)
    setFiles(copy)
  }

  const submit = async (e) => {
    e.preventDefault()
    // Basic client-side payload; replace with your API call
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    // backend validator expects `priceAmount` and `priceCurrency`
    formData.append('priceAmount', Number(price))
    formData.append('priceCurrency', currency)
    files.forEach((f) => {
      if (f instanceof File) formData.append('images', f)
    })
console.log(formData)
    try {
      // placeholder; update URL to your backend endpoint
      await handleCreateProduct(formData) // Implement this function to call your API
      alert('Product created (mock)')
    } catch (err) {
      console.error(err)
      alert('Submit failed')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f9f9f9] text-[#1b1b1b]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      
      {/* Header */}
      <header className="border-b border-[#c6c6c6] bg-white p-6 sm:px-12 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          FAB_MENS
        </h1>
        <p className="text-[10px] tracking-widest text-[#777777] uppercase">Seller Portal / Create Listing</p>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-24">
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-light tracking-wide uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            List Your Product
          </h2>
          <p className="text-[#777777] tracking-wider text-xs uppercase mt-4 max-w-xl leading-relaxed">
            Curate your premium item for the FAB collection. precision and detail are paramount.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* Left column: form */}
          <form className="flex-1 space-y-12" onSubmit={submit}>
            
            <div className="relative group">
              <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
                Product Title
              </label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MONOLITHIC OVERCOAT"
                className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
              />
            </div>

            <div className="relative group">
              <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the materials, silhouette, and origin..."
                rows={4}
                className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa] resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:items-end">
              <div className="flex-1 relative group">
                <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
                  Price
                </label>
                <input
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
                />
              </div>

              <div className="w-full sm:w-48 relative group">
                <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-4 uppercase">
                  Currency
                </label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)} 
                  className="w-full bg-transparent border-b border-[#c6c6c6] pb-3 pt-2 text-lg text-[#1b1b1b] transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] appearance-none rounded-none cursor-pointer"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
                {/* Custom dropdown arrow */}
                <svg className="w-4 h-4 text-[#1b1b1b] absolute right-2 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                className="w-full md:w-auto px-12 py-5 bg-black text-[#e2e2e2] text-xs font-bold tracking-widest uppercase border border-black hover:bg-transparent hover:text-black transition-all duration-500"
              >
                List Product
              </button>
            </div>
          </form>

          {/* Right column: images */}
          <div className="w-full lg:w-5/12 xl:w-1/3">
            <label className="block text-xs font-semibold tracking-widest text-[#1b1b1b] mb-8 uppercase">
              Product Visuals (Max 7)
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border border-[#c6c6c6] h-64 flex flex-col items-center justify-center bg-white mb-6 relative cursor-pointer group hover:border-black transition-colors duration-300"
            >
              <div className="text-center p-6 flex flex-col items-center">
                <svg className="w-8 h-8 text-[#adabaa] group-hover:text-black mb-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" />
                </svg>
                <div className="text-xs font-bold tracking-widest uppercase text-[#1b1b1b] mb-2">Upload Files</div>
                <div className="text-[10px] tracking-widest uppercase text-[#777777]">Drag & Drop or browse</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onFilesAdded(e.target.files)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {files.length === 0 && (
                <>
                  <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <div className="aspect-[3/4] border border-[#eeeeee] bg-white flex items-center justify-center text-[#eeeeee]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </>
              )}

              {files.map((f, idx) => (
                <div key={idx} className="relative aspect-[3/4] overflow-hidden border border-[#e8e8e8] group bg-[#f3f3f3]">
                  <img src={f.preview || (typeof f === 'string' ? f : '')} alt={`img-${idx}`} className="object-cover w-full h-full" />
                  
                  {/* Overlay for actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                     <div className="flex justify-end">
                       <button 
                         onClick={(e) => { e.stopPropagation(); removeImage(idx); }} 
                         className="p-1.5 bg-white text-black hover:bg-black hover:text-white transition-colors"
                       >
                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
                       </button>
                     </div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); handleSelectPrimary(idx); }} 
                       className="w-full py-1.5 bg-white text-black text-[9px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                     >
                       Primary
                     </button>
                  </div>
                  
                  {/* Primary Badge */}
                  {idx === 0 && (
                     <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5">
                       1st
                     </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateProduct