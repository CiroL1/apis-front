import React from "react";

type Props = {
  name: string;
  setName: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
};

export default function ProductBasicInfo({ name, setName, price, setPrice }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-1 block w-full border rounded-lg p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="mt-1 block w-full border rounded-lg p-2"
          required
        />
      </div>
    </div>
  );
}
