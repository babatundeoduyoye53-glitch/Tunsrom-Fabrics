import {
  BarChart3,
  Boxes,
  Cog,
  LayoutDashboard,
  ShoppingCart,
} from 'lucide-react';

export const categoryLabels = {
  lace: 'Lace',
  jacquard: 'Jacquard',
  wool: 'Wool',
  caps: 'Caps',
  ankara: 'Ankara',
  cord: 'Cord',
};

export const categoryOptions = Object.entries(categoryLabels);

export const recentTransactions = [
  {
    id: 'TX-2041',
    customer: 'Adebisi Couture',
    amount: 185000,
    status: 'Paid',
    item: 'Cashmere Touch Wool x 1',
    time: '10 mins ago',
    method: 'Transfer',
    location: 'Lagos',
  },
  {
    id: 'TX-2038',
    customer: 'Bridal by Kemi',
    amount: 132000,
    status: 'Pending',
    item: 'Premium French Lace x 2',
    time: '28 mins ago',
    method: 'Card',
    location: 'Abuja',
  },
  {
    id: 'TX-2034',
    customer: 'Urban Tailor NG',
    amount: 92000,
    status: 'Paid',
    item: 'Midnight Floral Jacquard x 1',
    time: '52 mins ago',
    method: 'Transfer',
    location: 'Port Harcourt',
  },
  {
    id: 'TX-2029',
    customer: 'The Cap Studio',
    amount: 48000,
    status: 'Processing',
    item: 'Velvet Trim Cap x 2',
    time: '1 hr ago',
    method: 'Cash deposit',
    location: 'Ibadan',
  },
];

export function buildNavItems(productCount) {
  return [
    { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, count: 4 },
    { id: 'products', path: '/admin/products', label: 'Products', icon: Boxes, count: productCount },
    { id: 'orders', path: '/admin/orders', label: 'Orders', icon: ShoppingCart, count: recentTransactions.length },
    { id: 'report', path: '/admin/report', label: 'Reports', icon: BarChart3, count: 5 },
    { id: 'settings', path: '/admin/settings', label: 'Settings', icon: Cog, count: 0 },
  ];
}
