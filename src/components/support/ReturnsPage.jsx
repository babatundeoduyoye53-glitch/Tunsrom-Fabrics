import SupportHero from './SupportHero';
import SupportPageLayout from './SupportPageLayout';

const policies = [
  'Please review fabrics, colors, and order details carefully before payment because fabric orders often involve cut lengths and limited stock.',
  'If there is a confirmed issue from our side, such as wrong item dispatch or a major quality mismatch, contact us as soon as possible after delivery.',
  'Eligible concerns should be reported within 24 hours of receiving the order with clear photos and order details.',
  'Used, altered, cut, or damaged items caused after delivery are not eligible for return or exchange.',
  'Approved exchange support depends on product condition and stock availability at the time of review.',
];

function ReturnsPage() {
  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="Returns"
        title="Clear return and exchange guidance for fabric buyers"
        description="Because many fabric orders are selected for events, tailoring, and custom needs, return handling must be careful and transparent. This page explains how we review issues and when an exchange may be possible."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-black/5 bg-white p-8 shadow-sm shadow-black/5 sm:p-10">
          <h2 className="font-display text-3xl text-[#1A1208]">Return and exchange policy</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#6B6456]">
            {policies.map((policy) => (
              <p key={policy}>{policy}</p>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="rounded-[28px] bg-cream p-6">
            <h3 className="font-display text-2xl text-[#1A1208]">To request help</h3>
            <p className="mt-4 text-sm leading-7 text-[#6B6456]">
              Share your order reference, issue summary, and clear product photos through WhatsApp or email so we can review quickly.
            </p>
          </article>
          <article className="rounded-[28px] bg-cream p-6">
            <h3 className="font-display text-2xl text-[#1A1208]">Before you buy</h3>
            <p className="mt-4 text-sm leading-7 text-[#6B6456]">
              If you are unsure about texture, occasion fit, or quantity, contact us before placing the order and we will help reduce mistakes.
            </p>
          </article>
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default ReturnsPage;
