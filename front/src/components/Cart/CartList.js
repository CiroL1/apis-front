"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CartList;
var CartItem_1 = require("./CartItem");
function CartList(_a) {
    var items = _a.items, onQuantityChange = _a.onQuantityChange;
    return (<div className="divide-y divide-subtle-light dark:divide-subtle-dark rounded-lg border border-subtle-light dark:border-subtle-dark">
      {items.map(function (item) { return (<CartItem_1.default key={item.id} product={item} onQuantityChange={onQuantityChange}/>); })}
    </div>);
}
