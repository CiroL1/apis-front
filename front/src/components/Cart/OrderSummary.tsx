interface OrderSummaryProps {
  subtotal: number;
  isDisabled?: boolean;
}

export default function OrderSummary({ subtotal, isDisabled = false }: OrderSummaryProps) {
  return (
    <div className="rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-subtle-dark/20 p-6">
      <h2 className="text-lg font-bold">Order Summary</h2>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-sm text-muted-light dark:text-muted-dark">Subtotal</p>
          <p className="text-sm font-medium">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-light dark:text-muted-dark">Shipping</p>
          <p className="text-sm font-medium">Free</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-light dark:text-muted-dark">Taxes</p>
          <p className="text-sm font-medium">Calculated at checkout</p>
        </div>
      </div>
      <div className="mt-6 border-t border-subtle-light dark:border-subtle-dark pt-4">
        <div className="flex justify-between">
          <p className="font-bold">Total</p>
          <p className="font-bold">${subtotal.toFixed(2)}</p>
        </div>
      </div>
      <button
        disabled={isDisabled}
        className={`mt-6 flex w-full h-12 items-center justify-center rounded-lg bg-primary px-5 text-base font-bold text-white shadow-sm transition
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"}`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
