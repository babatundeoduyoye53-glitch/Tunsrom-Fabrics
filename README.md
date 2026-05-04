# Tunsrom Fabrics - Premium Fabric Store Homepage

A modern, responsive ecommerce homepage for a premium fabric store built with React, Tailwind CSS, and Vite.

## Features

- **Premium Design**: Elegant fabric store homepage with gold and burgundy color scheme
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Product Catalog**: 16 fabric products across 4 categories (Lace, Jacquard, Wool, Caps)
- **Interactive Components**:
  - Auto-advancing hero slider with pause on hover
  - Product filtering by category
  - Wishlist functionality with localStorage persistence
  - Shopping cart drawer
  - Customer testimonials slider
  - Newsletter subscription
- **Modern Tech Stack**: React 19, Tailwind CSS v4, Vite, Lucide React icons

## Tech Stack

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS v4 with custom color palette
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)

## Color Palette

- Background: `#FAF8F5` (cream)
- Primary: `#8B6914` (gold)
- Secondary: `#6B1A2A` (burgundy)
- Text: `#1A1208` (dark)

## Project Structure

```
src/
├── components/
│   ├── TopBar.jsx
│   ├── Header.jsx
│   ├── HeroSlider.jsx
│   ├── WhatsNew.jsx
│   ├── ShopSection.jsx
│   ├── ProductCard.jsx
│   ├── FeatureBanner.jsx
│   ├── ProductGallery.jsx
│   ├── LatestCollections.jsx
│   ├── NewArrivals.jsx
│   ├── BlogSection.jsx
│   ├── Testimonials.jsx
│   ├── Newsletter.jsx
│   ├── Footer.jsx
│   └── CartDrawer.jsx
├── context/
│   └── WishlistContext.jsx
├── data/
│   ├── products.js
│   ├── blogs.js
│   └── testimonials.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Admin Panel

The application includes a completely separate admin panel for internal operations management.

### Admin Access

- **URL**: `/admin/login`
- **Credentials**: 
  - Email: `admin@tunsromfabrics.com`
  - Password: `tunsrom@admin2025`
- **Authentication**: Frontend-only using localStorage (will be replaced with backend auth when ready)

### Admin Features

- **Dashboard**: Overview with stats cards, revenue charts, sales analytics, and top products table
- **Products Management**: Add, edit, delete products with full catalog management
- **Navigation**: Sidebar with collapsible mobile menu
- **Design**: Dark theme with luxury fabric aesthetic using DM Serif Display and DM Mono fonts

### Admin Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with analytics
- `/admin/products` - Product catalog management
- `/admin/*` - Protected routes (redirects to login if not authenticated)

### Admin Tech Stack

- **Routing**: React Router with protected routes
- **Charts**: Recharts for data visualization
- **Storage**: localStorage for product data (will be replaced with API)
- **Styling**: Tailwind CSS with custom admin color palette
- **Fonts**: DM Serif Display (headings), DM Mono (data/tables)

## Product Categories

- **Lace**: Premium French and Swiss lace fabrics
- **Jacquard**: Intricate woven patterns
- **Wool**: Natural wool materials
- **Caps**: Stylish headwear

## Features Implemented

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product filtering and search
- ✅ Wishlist with persistence
- ✅ Shopping cart drawer
- ✅ Hero slider with auto-advance
- ✅ Customer testimonials
- ✅ Newsletter signup
- ✅ Blog section
- ✅ Social media links
- ✅ Contact information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. All rights reserved.
