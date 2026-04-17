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
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <h2 className="text-gray-600 text-lg font-medium">List Your Product</h2>
      <p className="text-gray-400 mt-1 mb-8">List your premium item in the FAB_MENS collection. Every detail matters.</p>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:gap-12">
        {/* Left column: form */}
        <form className="flex-1" onSubmit={submit}>
          <label className="block text-xs font-semibold text-gray-500 mb-2">PRODUCT TITLE</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Signature Cashmere Overshirt"
            className="w-full bg-gray-100 rounded-xl p-4 placeholder-gray-400 mb-6"
          />

          <label className="block text-xs font-semibold text-gray-500 mb-2">DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the materials, fit, and origin..."
            rows={6}
            className="w-full bg-gray-100 rounded-xl p-4 placeholder-gray-400 mb-6 resize-none"
          />

          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:gap-6">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-2">PRICE</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                type="number"
                className="w-full bg-gray-100 rounded-xl p-4 placeholder-gray-400"
              />
            </div>

            <div className="w-full md:w-40">
              <label className="block text-xs font-semibold text-gray-500 mb-2">CURRENCY</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-gray-100 rounded-xl p-4">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          <button className="bg-gradient-to-r cursor-pointer from-violet-600 to-violet-500 text-white px-8 py-3 rounded-full shadow-lg hover:opacity-95">List Product</button>
        </form>

        {/* Right column: images */}
        <div className="w-full md:w-1/3">
          <label className="block text-xs font-semibold text-gray-500 mb-4">PRODUCT VISUALS</label>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 rounded-xl h-48 md:h-64 flex items-center justify-center bg-white mb-4 relative"
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-violet-100 mx-auto flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4M17 8v8M17 8l4 4m-4-4-4 4" />
                </svg>
              </div>
              <div className="text-sm font-medium">Upload primary image</div>
              <div className="text-xs text-gray-400">Drag and drop or tap to browse</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => onFilesAdded(e.target.files)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {files.length === 0 && (
              <>
                <div className="h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">+</div>
                <div className="h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">+</div>
                <div className="h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">+</div>
              </>
            )}

            {files.map((f, idx) => (
              <div key={idx} className="relative h-28 rounded-lg overflow-hidden border">
                <img src={f.preview || (typeof f === 'string' ? f : '')} alt={`img-${idx}`} className="object-cover w-full h-full" />
                <div className="absolute top-1 right-1 flex gap-1">
                  <button onClick={() => handleSelectPrimary(idx)} title="Set primary" className="bg-white bg-opacity-60 rounded-full p-1 text-xs">P</button>
                  <button onClick={() => removeImage(idx)} title="Remove" className="bg-white bg-opacity-60 rounded-full p-1 text-xs">×</button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3">You can upload up to 7 images. Click 'P' to mark primary.</p>
        </div>
      </div>
    </div>
  )
}


export default CreateProduct