import { useState } from 'react';
import SupportHero from './SupportHero';
import SupportPageLayout from './SupportPageLayout';

const faqs = [
  {
    question: 'Do you sell in bulk for events or asoebi groups?',
    answer: 'Yes. We can support bulk fabric inquiries for weddings, celebrations, and custom group orders depending on stock availability.',
  },
  {
    question: 'Can I ask for fabric recommendations before ordering?',
    answer: 'Yes. You can contact us with the event, preferred colors, and quantity you need, and we will guide you toward suitable options.',
  },
  {
    question: 'How do I know if an item is still available?',
    answer: 'You can reach out before payment if you want live stock confirmation, especially for high-demand or limited collections.',
  },
  {
    question: 'Do you deliver outside Ogun State?',
    answer: 'Yes. We support interstate delivery across Nigeria through dispatch and courier partners.',
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes. Once dispatch details are available, we can share tracking or movement updates through our support channels.',
  },
];

function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="FAQs"
        title="Answers to common questions from fabric buyers"
        description="These quick answers cover delivery, sourcing, bulk requests, and how we support customers before and after an order."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.question} className="overflow-hidden rounded-[26px] border border-black/5 bg-white shadow-sm shadow-black/5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-2xl text-[#1A1208]">{item.question}</span>
                  <span className="text-2xl text-gold">{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-black/5 px-6 py-5 text-sm leading-7 text-[#6B6456]">
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default FAQsPage;
