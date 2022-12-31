export function getFaq(faqItems) {
  const mainEntity = faqItems.map((faqItem) => {
    const item = {
      '@type': 'Question',
      name: faqItem.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqItem.reponse,
      },
    };
    return item;
  });

  const faq = {
    "@context": "https://schema.org",
    '@type': 'FAQPage',
    mainEntity: mainEntity,
  };
  return faq;
}