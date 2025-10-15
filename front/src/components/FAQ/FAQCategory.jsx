import FAQItem from "./FAQItem";

export default function FAQCategory({ title, items }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-black dark:text-white">{title}</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <FAQItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}
