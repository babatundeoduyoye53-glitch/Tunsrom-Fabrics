import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryOptions } from '../constants';

function AddProductPage({ onSave }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: 'lace',
    price: '',
    oldPrice: '',
    image: '',
    isNew: false,
    isSale: false,
  });
  const [preview, setPreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setForm((current) => ({ ...current, image: '' }));
      setPreview('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      id: Date.now(),
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image.trim(),
      isNew: form.isNew,
      isSale: form.isSale,
    };

    onSave(product);
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#9ca3af]">Products</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f0ece4]">Add New Product</h1>
          <p className="text-white/50 max-w-xl">Add an item to the catalog from a clean product form. This page is intentionally separate for clarity and focus.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#f0ece4] transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
        >
          Back to products
        </button>
      </div>

      <div className="max-w-3xl rounded-3xl border border-white/10 bg-[#161b22] p-8 shadow-lg shadow-black/20">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Product name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Brand</span>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                placeholder="Brand or label"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
              >
                {categoryOptions.map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Price</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="0"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Old price</span>
              <input
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-[#f0ece4]">Upload image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#C9A84C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0f0f0f] focus:border-[#C9A84C]"
            />
          </label>

          {preview && (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
              <p className="text-sm font-medium text-[#f0ece4]">Preview</p>
              <img src={preview} alt="Preview" className="mt-4 h-48 w-full rounded-3xl object-cover" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4]">
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
                className="h-5 w-5 rounded accent-[#C9A84C]"
              />
              <span className="text-sm">Mark as new</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4]">
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
                className="h-5 w-5 rounded accent-[#C9A84C]"
              />
              <span className="text-sm">Mark as sale</span>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-2xl bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566]"
            >
              Save product
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-[#f0ece4] transition hover:border-[#C9A84C]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
