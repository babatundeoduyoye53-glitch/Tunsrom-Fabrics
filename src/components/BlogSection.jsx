import { blogs } from '../data/blogs';

function BlogSection() {
  return (
    <section id="blog" className="px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Stories and styling notes</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">From Our Blog</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 sm:rounded-[30px]">
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover transition duration-500 hover:scale-105 sm:h-56"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#6B6456]">
                  <span>{blog.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[#c6bfb2]" />
                  <span>{blog.author}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#1A1208] sm:text-2xl">{blog.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#6B6456] line-clamp-3">{blog.excerpt}</p>
                <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition hover:gap-3">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>   
      </div>
    </section>
  );
}

export default BlogSection; 

