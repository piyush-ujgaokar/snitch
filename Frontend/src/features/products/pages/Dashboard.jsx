// import React, { useEffect, useMemo, useState } from 'react'
// import { useProduct } from '../hooks/useProduct'
// import { useSelector } from 'react-redux'

// const Dashboard = () => {
//   const {handleGetSellerProduct}=useProduct()
//   const sellerProducts=useSelector(state=>state.product.sellerProducts)

//   const [search, setSearch] = useState('')
//   const [imageIndex, setImageIndex] = useState({})

//   useEffect(()=>{
//     handleGetSellerProduct()
//   },[])

//   // filtered products by search (title or description)
//   const filtered = useMemo(()=>{
//     if(!sellerProducts) return []
//     const q = search.trim().toLowerCase()
//     if(!q) return sellerProducts
//     return sellerProducts.filter(p=>{
//       return (p.title || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
//     })
//   },[search, sellerProducts])

//   function prevImage(id, length){
//     setImageIndex(prev=>{
//       const cur = prev[id] ?? 0
//       return {...prev, [id]: (cur - 1 + length) % length}
//     })
//   }

//   function nextImage(id, length){
//     setImageIndex(prev=>{
//       const cur = prev[id] ?? 0
//       return {...prev, [id]: (cur + 1) % length}
//     })
//   }

//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="min-h-screen w-full bg-[#f9f9f9] flex text-[#1b1b1b]" style={{ fontFamily: 'Manrope, sans-serif' }}>
//       {/* Sidebar - Desktop */}
//       <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-[#c6c6c6] transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
//         <div className="p-8 border-b border-[#eeeeee]">
//           <h1 className="text-2xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//             SNITCH
//           </h1>
//           <p className="text-[10px] tracking-widest text-[#777777] mt-1 uppercase">Seller Portal</p>
//         </div>
        
//         <nav className="flex-1 px-8 pt-8 space-y-6">
//           <div>
//             <button className="text-sm font-semibold tracking-widest uppercase text-black flex items-center group w-full text-left">
//               <span className="w-8 h-[1px] bg-black mr-4 transition-all duration-300 group-hover:w-12"></span>
//               Inventory
//             </button>
//           </div>
//           <div>
//             <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
//               Sales
//             </button>
//           </div>
//           <div>
//             <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
//               Insights
//             </button>
//           </div>
//           <div>
//             <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
//               Account
//             </button>
//           </div>
//         </nav>
        
//         <div className="p-8">
//           <button className="text-xs font-semibold tracking-widest uppercase text-[#1b1b1b] border-b border-[#1b1b1b] pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors duration-300">
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={()=>setSidebarOpen(false)}></div>}

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col p-6 sm:p-8 lg:p-16 overflow-y-auto">
        
//         {/* Mobile Header */}
//         <div className="flex items-center justify-between md:hidden mb-8 pb-4 border-b border-[#eeeeee]">
//           <button onClick={()=>setSidebarOpen(v=>!v)} className="p-2 border border-[#c6c6c6] hover:bg-[#eeeeee] transition-colors">
//             <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
//           </button>
//           <div className="text-xl font-bold tracking-widest uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>SNITCH</div>
//           <div className="w-9"></div> {/* Spacer to center title */}
//         </div>

//         <header className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 border-b border-[#c6c6c6] pb-6 gap-6">
//           <div>
//             <h2 className="text-3xl lg:text-4xl font-light tracking-wide uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
//               Your Inventory
//             </h2>
//             <p className="text-[#777777] tracking-wider text-xs uppercase mt-2">
//               Viewing {filtered?.length || 0} Products
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//             <div className="relative group">
//               <input
//                 value={search}
//                 onChange={e=>setSearch(e.target.value)}
//                 placeholder="SEARCH INVENTORY..."
//                 className="w-full sm:w-72 bg-transparent border-b border-[#c6c6c6] pb-2 pt-1 text-[#1b1b1b] text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
//               />
//               <svg className="w-4 h-4 text-[#adabaa] absolute right-2 top-1 pointer-events-none group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"></path></svg>
//             </div>
//             <button className="px-8 py-3 bg-black text-[#e2e2e2] text-xs font-semibold tracking-widest uppercase border border-black hover:bg-[#5e5e5e] transition-colors duration-300">
//               NEW LISTING
//             </button>
//           </div>
//         </header>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 pb-12">
//           {filtered && filtered.length > 0 ? (
//             filtered.map(product => {
//               const imgs = product.images || []
//               const idx = imageIndex[product._id] ?? 0
//               const active = imgs[idx]
              
//               return (
//                 <article key={product._id} className="group cursor-pointer">
//                   {/* Image Container */}
//                   <div className="w-full aspect-[3/4] bg-[#eeeeee] relative overflow-hidden mb-4">
//                     <img 
//                       src={active?.url || (imgs[0]?.url) || '/placeholder.png'} 
//                       alt={product.title} 
//                       className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
//                     />
                    
//                     {/* Hover overlay actions */}
//                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
//                         <div className="flex justify-end gap-2">
//                            <button className="p-2 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-colors duration-300" aria-label="delete">
//                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4l1 4H9l1-4z"/></svg>
//                            </button>
//                         </div>
//                         <div className="flex gap-2">
//                             <button className="flex-1 py-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase border border-white hover:bg-transparent hover:text-white transition-colors duration-300">
//                                 Edit
//                             </button>
//                         </div>
//                     </div>

//                     {/* image arrows */}
//                     {imgs.length > 1 && (
//                       <>
//                         <button onClick={(e)=>{e.stopPropagation(); prevImage(product._id, imgs.length)}}
//                           className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border border-transparent hover:border-black transition-all opacity-0 group-hover:opacity-100">
//                           <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M15 19l-7-7 7-7"/></svg>
//                         </button>
//                         <button onClick={(e)=>{e.stopPropagation(); nextImage(product._id, imgs.length)}}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border border-transparent hover:border-black transition-all opacity-0 group-hover:opacity-100">
//                           <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
//                         </button>
//                       </>
//                     )}
//                   </div>
                  
//                   {/* Product Details */}
//                   <div className="space-y-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-sm font-semibold tracking-widest uppercase text-[#1b1b1b]">
//                         {(product.title || '').replace(/_/g, ' ')}
//                       </h3>
//                       <span className="text-sm font-bold text-[#1b1b1b]">
//                         {product.price?.currency || 'INR'} {product.price?.amount?.toLocaleString('en-IN') || '0'}
//                       </span>
//                     </div>
//                     <p className="text-xs text-[#777777] line-clamp-1 opacity-80 uppercase tracking-widest">
//                       {product.description}
//                     </p>
//                   </div>
//                 </article>
//               )
//             })
//           ) : (
//             <div className="col-span-full py-20 text-center flex flex-col items-center border border-[#e8e8e8]">
//                <p className="text-[#1b1b1b] tracking-widest uppercase text-sm font-semibold">Gallery Empty</p>
//                <p className="text-[#777777] text-xs mt-2 uppercase tracking-wide">No items match your criteria.</p>
//             </div>
//           )}
//         </div>

//         {/* pagination */}
//         {filtered && filtered.length > 0 && (
//           <footer className="mt-auto border-t border-[#c6c6c6] pt-6 flex justify-center items-center gap-4">
//             <button className="text-xs uppercase tracking-widest text-[#777777] hover:text-black transition-colors">PREV</button>
//             <span className="text-xs font-bold font-['Epilogue',sans-serif]">1 / 1</span>
//             <button className="text-xs uppercase tracking-widest text-[#777777] hover:text-black transition-colors">NEXT</button>
//           </footer>
//         )}

//       </main>
//     </div>
//   )
// }

// export default Dashboard



import React, { useEffect, useMemo, useState } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const {handleGetSellerProduct}=useProduct()
  const sellerProducts=useSelector(state=>state.product.sellerProducts)

  const [search, setSearch] = useState('')
  const [imageIndex, setImageIndex] = useState({})

  useEffect(()=>{
    handleGetSellerProduct()
  },[])

  // filtered products by search (title or description)
  const filtered = useMemo(()=>{
    if(!sellerProducts) return []
    const q = search.trim().toLowerCase()
    if(!q) return sellerProducts
    return sellerProducts.filter(p=>{
      return (p.title || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
    })
  },[search, sellerProducts])

  function prevImage(id, length){
    setImageIndex(prev=>{
      const cur = prev[id] ?? 0
      return {...prev, [id]: (cur - 1 + length) % length}
    })
  }

  function nextImage(id, length){
    setImageIndex(prev=>{
      const cur = prev[id] ?? 0
      return {...prev, [id]: (cur + 1) % length}
    })
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#f9f9f9] flex text-[#1b1b1b]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-[#c6c6c6] transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
        <div className="p-8 border-b border-[#eeeeee]">
          <h1 className="text-2xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            SNITCH
          </h1>
          <p className="text-[10px] tracking-widest text-[#777777] mt-1 uppercase">Seller Portal</p>
        </div>
        
        <nav className="flex-1 px-8 pt-8 space-y-6">
          <div>
            <button className="text-sm font-semibold tracking-widest uppercase text-black flex items-center group w-full text-left">
              <span className="w-8 h-[1px] bg-black mr-4 transition-all duration-300 group-hover:w-12"></span>
              Inventory
            </button>
          </div>
          <div>
            <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
              Sales
            </button>
          </div>
          <div>
            <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
              Insights
            </button>
          </div>
          <div>
            <button className="text-sm font-medium tracking-widest uppercase text-[#777777] hover:text-black transition-colors duration-300 w-full text-left">
              Account
            </button>
          </div>
        </nav>
        
        <div className="p-8">
          <button className="text-xs font-semibold tracking-widest uppercase text-[#1b1b1b] border-b border-[#1b1b1b] pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors duration-300">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={()=>setSidebarOpen(false)}></div>}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 sm:p-8 lg:p-16 overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden mb-8 pb-4 border-b border-[#eeeeee]">
          <button onClick={()=>setSidebarOpen(v=>!v)} className="p-2 border border-[#c6c6c6] hover:bg-[#eeeeee] transition-colors">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="text-xl font-bold tracking-widest uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>SNITCH</div>
          <div className="w-9"></div> {/* Spacer to center title */}
        </div>

        <header className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 border-b border-[#c6c6c6] pb-6 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide uppercase text-black" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Your Inventory
            </h2>
            <p className="text-[#777777] tracking-wider text-xs uppercase mt-2">
              Viewing {filtered?.length || 0} Products
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative group">
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="SEARCH INVENTORY..."
                className="w-full sm:w-72 bg-transparent border-b border-[#c6c6c6] pb-2 pt-1 text-[#1b1b1b] text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus:border-black hover:border-[#777777] placeholder-[#adabaa]"
              />
              <svg className="w-4 h-4 text-[#adabaa] absolute right-2 top-1 pointer-events-none group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"></path></svg>
            </div>
            <button className="px-8 py-3 bg-black text-[#e2e2e2] text-xs font-semibold tracking-widest uppercase border border-black hover:bg-[#5e5e5e] transition-colors duration-300">
              NEW LISTING
            </button>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 pb-12">
          {filtered && filtered.length > 0 ? (
            filtered.map(product => {
              const imgs = product.images || []
              const idx = imageIndex[product._id] ?? 0
              const active = imgs[idx]
              
              return (
                <article key={product._id} className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="w-full aspect-[3/4] bg-[#eeeeee] relative overflow-hidden mb-4">
                    <img 
                      src={active?.url || (imgs[0]?.url) || '/placeholder.png'} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                    />
                    
                    {/* Hover overlay actions */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex justify-end gap-2">
                           <button className="p-2 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-colors duration-300" aria-label="delete">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4l1 4H9l1-4z"/></svg>
                           </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase border border-white hover:bg-transparent hover:text-white transition-colors duration-300">
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* image arrows */}
                    {imgs.length > 1 && (
                      <>
                        <button onClick={(e)=>{e.stopPropagation(); prevImage(product._id, imgs.length)}}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border border-transparent hover:border-black transition-all opacity-0 group-hover:opacity-100">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <button onClick={(e)=>{e.stopPropagation(); nextImage(product._id, imgs.length)}}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border border-transparent hover:border-black transition-all opacity-0 group-hover:opacity-100">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-[#1b1b1b]">
                        {(product.title || '').replace(/_/g, ' ')}
                      </h3>
                      <span className="text-sm font-bold text-[#1b1b1b]">
                        {product.price?.currency || 'INR'} {product.price?.amount?.toLocaleString('en-IN') || '0'}
                      </span>
                    </div>
                    <p className="text-xs text-[#777777] line-clamp-1 opacity-80 uppercase tracking-widest">
                      {product.description}
                    </p>
                  </div>
                </article>
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center border border-[#e8e8e8]">
               <p className="text-[#1b1b1b] tracking-widest uppercase text-sm font-semibold">Gallery Empty</p>
               <p className="text-[#777777] text-xs mt-2 uppercase tracking-wide">No items match your criteria.</p>
            </div>
          )}
        </div>

        {/* pagination */}
        {filtered && filtered.length > 0 && (
          <footer className="mt-auto border-t border-[#c6c6c6] pt-6 flex justify-center items-center gap-4">
            <button className="text-xs uppercase tracking-widest text-[#777777] hover:text-black transition-colors">PREV</button>
            <span className="text-xs font-bold font-['Epilogue',sans-serif]">1 / 1</span>
            <button className="text-xs uppercase tracking-widest text-[#777777] hover:text-black transition-colors">NEXT</button>
          </footer>
        )}

      </main>
    </div>
  )
}

export default Dashboard
