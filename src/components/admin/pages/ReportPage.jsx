import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const revenueData = [
  { month: 'Jan', value: 42000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 62000 },
  { month: 'May', value: 74000 },
  { month: 'Jun', value: 83000 },
];

const channelBreakdown = [
  { name: 'Lace', value: 38, color: '#C9A84C' },
  { name: 'Jacquard', value: 26, color: '#8B1A1A' },
  { name: 'Wool', value: 20, color: '#D4B566' },
  { name: 'Caps', value: 16, color: '#7C9C54' },
];

const metrics = [
  { title: 'Revenue', value: '₦83.4M', change: '+18.2%', positive: true },
  { title: 'Orders', value: '1,540', change: '+9.6%', positive: true },
  { title: 'Conversion', value: '3.8%', change: '+1.4%', positive: true },
  { title: 'Retention', value: '72%', change: '+4.1%', positive: true },
];

function AdminReportPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#f0ece4]">Reports</h1>
        <p className="text-white/50">Visual summaries of store performance and product demand.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-4 mb-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="rounded-3xl border border-white/10 bg-[#161b22] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">{metric.title}</p>
            <p className="mt-4 text-3xl font-semibold text-[#f0ece4]">{metric.value}</p>
            <p className={`mt-3 flex items-center gap-2 text-sm ${metric.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {metric.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {metric.change} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr] mb-8">
        <div className="rounded-3xl border border-white/10 bg-[#161b22] p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Revenue</p>
              <h2 className="mt-2 text-xl font-semibold text-[#f0ece4]">Weekly income trend</h2>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(201,168,76,0.25)' }}
                  labelStyle={{ color: '#f0ece4' }}
                  itemStyle={{ color: '#f0ece4' }}
                />
                <Legend wrapperStyle={{ color: '#f0ece4' }} />
                <Line type="monotone" dataKey="value" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#C9A84C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#161b22] p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Product mix</p>
            <h2 className="mt-2 text-xl font-semibold text-[#f0ece4]">Sales by category</h2>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelBreakdown}
                  dataKey="value"
                  innerRadius={54}
                  outerRadius={100}
                  stroke="none"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelBreakdown.map((slice) => (
                    <Cell key={slice.name} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(201,168,76,0.25)' }}
                  labelStyle={{ color: '#f0ece4' }}
                  itemStyle={{ color: '#f0ece4' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#f0ece4', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReportPage;
