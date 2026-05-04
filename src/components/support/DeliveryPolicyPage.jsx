import SupportHero from './SupportHero';
import SupportPageLayout from './SupportPageLayout';

const sections = [
  {
    title: 'Order processing',
    points: [
      'Orders are reviewed and confirmed within business hours after payment or deposit confirmation.',
      'Custom sourcing, bulk orders, and special requests may need extra confirmation time before dispatch.',
      'Customers are contacted quickly if a selected fabric or accessory needs a stock update before shipment.',
    ],
  },
  {
    title: 'Delivery coverage',
    points: [
      'We support delivery across Lagos, Ogun State, Abuja, Port Harcourt, Ibadan, and other Nigerian cities through trusted dispatch partners.',
      'Pickup and local delivery arrangements can be discussed for nearby orders around Ijebu Ode.',
      'Interstate timelines depend on destination, courier availability, and order size.',
    ],
  },
  {
    title: 'Estimated timelines',
    points: [
      'Lagos and nearby destinations: usually 1 to 3 working days after confirmation.',
      'Major interstate cities: usually 2 to 5 working days after confirmation.',
      'Bulk or custom-handled orders: timeline will be communicated before dispatch.',
    ],
  },
];

function DeliveryPolicyPage() {
  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="Delivery Policy"
        title="Reliable delivery support for premium fabric orders across Nigeria"
        description="We want customers to know what to expect before checkout. This page covers how we process, dispatch, and communicate delivery for fabrics, headwear, and special orders."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm shadow-black/5">
              <h2 className="font-display text-2xl text-[#1A1208]">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6B6456]">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-6xl rounded-[30px] bg-cream p-8">
          <h3 className="font-display text-3xl text-[#1A1208]">Need a delivery estimate before ordering?</h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6B6456]">
            Send us your preferred fabric, quantity, and destination on WhatsApp or by email and we will guide you before you place the order.
          </p>
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default DeliveryPolicyPage;
