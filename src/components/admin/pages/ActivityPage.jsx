import { formatPrice } from '../../../utils/formatters';

function ActivityPage({ recentActivity, recentTransactions }) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-[28px] border border-[#eadcc0] bg-white p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b6914]">Recent activity</p>
        <h3 className="mt-3 font-display text-2xl text-[#1A1208]">Store movement</h3>
        <div className="mt-6 space-y-4">
          {recentActivity.map((entry) => (
            <div className="rounded-[24px] border border-[#f0e6d3] bg-[#fffaf2] p-5" key={entry.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#1A1208]">{entry.title}</p>
                <span className="text-xs text-[#8f866f]">{entry.time}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6B6456]">{entry.detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[28px] border border-[#eadcc0] bg-white p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b6914]">Recent transactions</p>
        <h3 className="mt-3 font-display text-2xl text-[#1A1208]">Payments and order flow</h3>
        <div className="mt-6 space-y-4">
          {recentTransactions.map((transaction) => (
            <div className="rounded-[24px] border border-[#f0e6d3] bg-[#fffaf2] p-5" key={transaction.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#1A1208]">{transaction.customer}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8b6914]">{transaction.id}</p>
                  <p className="mt-3 text-sm text-[#6B6456]">{transaction.item}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6b1a2a]">{transaction.status}</span>
                  <p className="mt-3 text-base font-semibold text-[#1A1208]">{formatPrice(transaction.amount)}</p>
                  <p className="mt-1 text-xs text-[#8f866f]">{transaction.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export default ActivityPage;
