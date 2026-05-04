import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryOptions } from '../constants';

function ProductDetailsPage({ products, onDelete, onSave }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => products.find((item) => String(item.id) === productId),
    [products, productId],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: product?.name ?? '',
    brand: product?.brand ?? '',
    category: product?.category ?? 'lace',
    price: product?.price ?? '',
    oldPrice: product?.oldPrice ?? '',
    image: product?.image ?? '',
    isNew: product?.isNew ?? false,
    isSale: product?.isSale ?? false,
  }));
  const [imagePreview, setImagePreview] = useState(product?.image ?? '');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setForm((current) => ({ ...current, image: '' }));
      setImagePreview('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
        <div className="rounded-3xl border border-white/10 bg-[#161b22] p-8 text-center text-white/70">
          <h1 className="text-2xl font-semibold text-white">Product not found</h1>
          <p className="mt-3 text-sm text-white/40">The product may have been removed or the link is incorrect.</p>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="mt-8 rounded-2xl bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566]"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...product,
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image.trim(),
      isNew: form.isNew,
      isSale: form.isSale,
    };

    onSave(updatedProduct);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this product permanently?')) {
      onDelete(product.id);
      navigate('/admin/products');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#9ca3af]">Products</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f0ece4]">Product details</h1>
          <p className="text-white/50 max-w-xl">Review and update this product or return to the catalog.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#f0ece4] transition hover:border-[#C9A84C]"
          >
            Back to list
          </button>
          <button
            type="button"
            onClick={() => setIsEditing((current) => !current)}
            className="rounded-full bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566]"
          >
            {isEditing ? 'Cancel edit' : 'Edit product'}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-[#161b22] p-8 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">{product.brand}</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#f0ece4]">{product.name}</h2>
              <p className="mt-3 text-white/50">Category: {categoryOptions.find(([value]) => value === product.category)?.[1] ?? product.category}</p>
            </div>
            <div className="rounded-3xl bg-white/5 px-5 py-4 text-center text-[#f0ece4]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Price</p>
              <p className="mt-2 text-2xl font-semibold text-[#C9A84C]">₦{product.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0d1117] p-5 space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Status</p>
              <div className="flex flex-wrap gap-2">
                {product.isNew && <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">New</span>}
                {product.isSale && <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-300">Sale</span>}
                {!product.isNew && !product.isSale && <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/60">Standard</span>}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0d1117] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Item code</p>
              <p className="mt-2 text-lg font-semibold text-[#f0ece4]">{product.id}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-3xl bg-red-500/20 px-5 py-4 text-sm font-semibold text-red-200 transition hover:bg-red-500/25"
          >
            Delete product
          </button>
          <div className="rounded-3xl border border-white/10 bg-[#161b22] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Image preview</p>
            <img
              src={product.image}
              alt={product.name}
              className="mt-4 h-56 w-full rounded-3xl object-cover border border-white/10"
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#161b22] p-8">
          <h3 className="text-xl font-semibold text-[#f0ece4]">Update information</h3>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-[#f0ece4]">Product name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[#f0ece4]">Brand</span>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
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
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#C9A84C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0f0f0f] focus:border-[#C9A84C]"
              />
            </label>

            {imagePreview && (
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
                <p className="text-sm font-medium text-[#f0ece4]">Preview</p>
                <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-full rounded-3xl object-cover" />
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

            <button
              type="submit"
              className="rounded-2xl bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566]"
            >
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
