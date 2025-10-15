import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function ProductSpecifications({ specifications, setSpecifications }) {
  // Convertimos specs a array con id interno
  const [specList, setSpecList] = useState(
    Object.entries(specifications).map(([k, v]) => ({ id: k, key: k, value: v }))
  );

  const syncToParent = (list) => {
    const newSpecs = {};
    list.forEach(s => { newSpecs[s.key] = s.value; });
    setSpecifications(newSpecs);
  };

  const updateValue = (id, value) => {
    const newList = specList.map(s => (s.id === id ? { ...s, value } : s));
    setSpecList(newList);
    syncToParent(newList);
  };

  const updateKey = (id, newKey) => {
    const trimmed = newKey.trim();
    if (!trimmed) return;
    const newList = specList.map(s => (s.id === id ? { ...s, key: trimmed } : s));
    setSpecList(newList);
    syncToParent(newList);
  };

  const removeSpec = (id) => {
    const newList = specList.filter(s => s.id !== id);
    setSpecList(newList);
    syncToParent(newList);
  };

  const addSpec = () => {
    const id = `spec-${Date.now()}`;
    const newList = [...specList, { id, key: id, value: "" }];
    setSpecList(newList);
    syncToParent(newList);
  };

  return (
    <div>
      <label className="block text-sm font-medium">Specifications</label>

      {specList.map(spec => (
        <div key={spec.id} className="flex gap-2 mt-1">
          <input
            type="text"
            value={spec.key}
            onChange={e => updateKey(spec.id, e.target.value)}
            className="border rounded-lg p-2 flex-1"
            placeholder="Specification name"
          />
          <input
            type="text"
            value={spec.value}
            onChange={e => updateValue(spec.id, e.target.value)}
            className="border rounded-lg p-2 flex-1"
            placeholder="Specification value"
          />
          <button type="button" onClick={() => removeSpec(spec.id)} className="text-red-500">
            <FiTrash />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSpec}
        className="mt-2 text-primary flex items-center gap-1"
      >
        <FiPlus /> Add Spec
      </button>
    </div>
  );
}