"use client";

import { HiChevronRight } from "react-icons/hi"; // Heroicons

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group rounded-lg bg-white p-6 dark:bg-background-dark/50">
      <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-black dark:text-white">
        {question}
        <HiChevronRight className="w-6 h-6 ml-2 transform transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <p className="mt-4 text-black/60 dark:text-white/60">{answer}</p>
    </details>
  );
}
