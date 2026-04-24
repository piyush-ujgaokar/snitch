import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'


const Home = () => {
  const { handleGetAllProducts } = useProduct()
  const products = useSelector((state) => state.product.products || [])
  const user = useSelector((state) => state.auth.user)

  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    handleGetAllProducts()
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    if (!query) return products
    return products.filter((p) =>
      (p.title || p.name || '')
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
  }, [products, query])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="w-full bg-transparent py-6 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            FAB_MENS
          </div>
        </div>

        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-xl">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, styles or brands..."
                className="w-full bg-white border border-gray-200 rounded-full py-3 px-4 pl-12 shadow-sm focus:ring-2 focus:ring-purple-300 transition duration-200"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right mr-2">
            <span className="text-sm">{user?.fullname || user?.name || 'Guest'}</span>
            {/* <span className="text-xs text-gray-500">Member</span> */}
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold shadow-lg">
            {user?.fullname ? user.fullname.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 pb-12">
        <section className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6 p-8 md:p-12">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider opacity-80">New arrivals 2024</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">New Season
                <span className="block text-4xl md:text-6xl">Collection</span>
              </h1>
              <p className="mt-4 max-w-md opacity-90">Experience the intersection of traditional tailoring and modern ethereal aesthetics.</p>
              <button className="mt-6 bg-white text-purple-700 font-semibold px-5 py-2 rounded-full shadow hover:translate-y-[-2px] transform transition">Shop the look</button>
            </div>
            <div className="flex-1 hidden md:block">
              <div className="w-full h-48 md:h-56 rounded-xl bg-[url('/banner-placeholder.jpg')] bg-cover bg-right opacity-40"></div>
            </div>
          </div>
        </section>


        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">The Fab Collection's</h3>
            <div className="text-sm text-gray-500">Showing {filtered.length} items</div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mounted && filtered.length === 0 ? (
              // simple empty state
              <div className="col-span-full py-12 text-center text-gray-500">No products yet.</div>
            ) : (
              filtered.map((p) => (
                <article key={p._id || p.id || p.name} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition duration-300 flex flex-col h-full">
                  <div className="w-full cursor-pointer h-88 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img src={p.images?.[0]?.url || p.image || '/product-placeholder.png'} alt={p.title || p.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm">{p.title || p.name}</h4>
                      <p className="text-xs text-gray-500">{p.brand || p.category || ''}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-600 font-bold">₹{p.price?.amount || p.cost || '—'}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 overflow-hidden" style={{ maxHeight: '3rem' }}>{p.description || p.desc || p.shortDescription || ''}</p>
                </article>
              ))
            )}
          </div>
        </section>

        {/* <section className="mt-12 bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="font-semibold">The Curator's Letter</h4>
            <p className="text-sm text-gray-500">Join our inner circle for early access to limited drops and exclusive styling guides.</p>
          </div>
          <div className="flex items-center gap-2">
            <input className="border border-gray-200 rounded-full py-2 px-4" placeholder="Your email address" />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Subscribe</button>
          </div>
        </section> */}
      </main>
    </div>
  )
}

export default Home
