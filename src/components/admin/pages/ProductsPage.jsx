import { ArrowRight, Eye, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { categoryOptions } from '../constants';

function ProductsPage({ products, onDelete }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const pageCount = Math.max(1, Math.ceil(products.length / productsPerPage));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const currentProducts = useMemo(
    () => products.slice((page - 1) * productsPerPage, page * productsPerPage),
    [page, products],
  );

  const labelFor = (value) => categoryOptions.find(([key]) => key === value)?.[1] ?? value;

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#9ca3af]">Products</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f0ece4]">Product catalog</h1>
          <p className="max-w-2xl text-white/50">Choose between viewing the full inventory or adding a new product from a dedicated page.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `rounded-full border px-5 py-3 text-sm font-medium transition ${
                isActive ? 'border-[#C9A84C] bg-[#C9A84C]/15 text-[#f0ece4]' : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-[#C9A84C] hover:text-[#f0ece4]'
              }`
            }
          >
            View products
          </NavLink>
          <NavLink
            to="/admin/products/add"
            className={({ isActive }) =>
              `rounded-full border px-5 py-3 text-sm font-medium transition ${
                isActive ? 'border-[#C9A84C] bg-[#C9A84C]/20 text-[#f0ece4]' : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-[#C9A84C] hover:text-[#f0ece4]'
              }`
            }
          >
            Add product
          </NavLink>
        </div>
      </div>

      <div className="grid gap-6">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#161b22] p-10 text-center">
            <p className="text-[#f0ece4] text-lg font-semibold">No items in the catalog yet.</p>
            <p className="mt-3 text-white/50">Start by adding a new product to keep the inventory workflow simple.</p>
            <button
              type="button"
              onClick={() => navigate('/admin/products/add')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0f0f0f] transition hover:bg-[#d4b566]"
            >
              Add product
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <article key={product._id ?? product.id} className="rounded-3xl border border-white/10 bg-[#161b22] p-4 shadow-sm shadow-black/10 transition hover:border-[#C9A84C]/20">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 rounded-3xl object-cover border border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold text-[#f0ece4] truncate">{product.name}</h2>
                      <p className="mt-1 text-sm text-white/50 truncate">{product.brand}</p>
                      <p className="mt-2 text-sm text-[#C9A84C]">{labelFor(product.category)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-3 py-2 text-sm text-[#f0ece4]">₦{product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                      <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/50 line-through">₦{product.oldPrice.toLocaleString()}</span>
                    )}
                    <span className="rounded-full bg-[#C9A84C]/15 px-3 py-2 text-sm text-[#C9A84C]">{product.isSale ? 'Sale' : product.isNew ? 'New' : 'Standard'}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/products/${product._id ?? product.id}`)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-[#f0ece4] transition hover:border-[#C9A84C] hover:text-[#f0ece4]"
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product._id ?? product.id, product.name)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {pageCount > 1 && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/50">
                  Showing {currentProducts.length} of {products.length} products — page {page} of {pageCount}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#f0ece4] transition disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: pageCount }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPage(index + 1)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        page === index + 1 ? 'bg-[#C9A84C] text-[#0f0f0f]' : 'border border-white/10 bg-white/5 text-[#f0ece4] hover:bg-[#C9A84C]/10'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={page === pageCount}
                    onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#f0ece4] transition disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
