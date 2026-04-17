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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-100 shadow-lg transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 flex items-center gap-3 border-b border-gray-100">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">FM</div>
            <div>
              <div className="text-lg font-semibold">FAB_MENS</div>
              <div className="text-xs text-gray-400">OWN YOUR STYLE</div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left bg-gradient-to-r from-purple-50 to-white shadow-sm transform hover:translate-x-1 transition">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
              <span className="font-medium text-purple-700">Inventory</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18"/></svg>
              <span className="text-gray-700">Sales</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5h6m-6 7h6M5 5h.01M5 12h.01"/></svg>
              <span className="text-gray-700">Insights</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span className="text-gray-700">Account</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={()=>setSidebarOpen(false)}></div>}

      {/* Main content area */}
      <main className="flex-1">
        <div className="p-4 md:p-10">
          {/* topbar for mobile */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button onClick={()=>setSidebarOpen(v=>!v)} className="p-2 rounded-md bg-white border shadow-sm">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="text-lg font-semibold">FAB_MENS</div>
            <div />
          </div>

      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Inventory Overview</h1>
          <p className="text-sm text-slate-500">Monitor stock levels, pricing, and editorial content.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-64 md:w-80 pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"></path></svg>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Total: <span className="font-medium text-slate-900">{filtered?.length ?? 0}</span></div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full shadow hover:bg-purple-700 transition">+ New Listing</button>
          </div>
        </div>
      </header>

      <section className="flex flex-wrap -m-4">
        {filtered && filtered.length>0 ? (
          filtered.map(product=> {
            const imgs = product.images || []
            const idx = imageIndex[product._id] ?? 0
            const active = imgs[idx]
            return (
              <article key={product._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition">
                  <div className="relative h-80 bg-gray-100">
                    <img src={active?.url || (imgs[0]?.url)} alt={product.title}
                      className="w-full h-full object-cover" />

                    {/* arrows for multiple images */}
                    {imgs.length > 1 && (
                      <>
                        <button onClick={()=>prevImage(product._id, imgs.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-2 rounded-full shadow-md">
                          <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                        </button>

                        <button onClick={()=>nextImage(product._id, imgs.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-2 rounded-full shadow-md">
                          <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </button>
                      </>
                    )}

                    <div className="absolute top-3 right-3 bg-white/90 text-xs text-slate-800 px-3 py-1 rounded-full shadow">IN STOCK</div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-slate-900">{product.title} <span className="text-purple-600 ml-2 font-bold">{product.price?.currency} {product.price?.amount}</span></h2>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{product.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <button className="px-6 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition">Edit</button>
                      <button className="w-10 h-10 inline-flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm hover:bg-red-50 transition" aria-label="delete">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4l1 4H9l1-4z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })
        ) : (
          <div className="p-6 text-center w-full text-slate-500">No products found.</div>
        )}
      </section>

      {/* simple pagination placeholder */}
      <footer className="mt-8 flex justify-center items-center gap-2">
        <button className="px-3 py-1 bg-white border rounded">‹</button>
        <button className="px-3 py-1 bg-purple-600 text-white rounded">1</button>
        <button className="px-3 py-1 bg-white border rounded">2</button>
        <button className="px-3 py-1 bg-white border rounded">3</button>
        <button className="px-3 py-1 bg-white border rounded">›</button>
      </footer>
      </div>
    </main>
    </div>
  )
}

export default Dashboard