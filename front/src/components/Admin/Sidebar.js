"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
var md_1 = require("react-icons/md");
function Sidebar(_a) {
    var currentSection = _a.currentSection, setSection = _a.setSection;
    return (<aside className="w-64 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        <NavItem icon={<md_1.MdDashboard />} label="Dashboard" active={currentSection === "dashboard"} onClick={function () { return setSection("dashboard"); }}/>
        <NavItem icon={<md_1.MdInventory2 />} label="Products" active={currentSection === "products"} onClick={function () { return setSection("products"); }}/>
        <NavItem icon={<md_1.MdSell />} label="Categories" active={currentSection === "categories"} onClick={function () { return setSection("categories"); }}/>
        <NavItem icon={<md_1.MdShoppingCart />} label="Orders" active={currentSection === "orders"} onClick={function () { return setSection("orders"); }}/>
        <NavItem icon={<md_1.MdSettings />} label="Settings" active={currentSection === "settings"} onClick={function () { return setSection("settings"); }}/>
      </nav>
    </aside>);
}
function NavItem(_a) {
    var icon = _a.icon, label = _a.label, active = _a.active, onClick = _a.onClick;
    return (<button onClick={onClick} className={"flex items-center gap-3 px-4 py-2 w-full text-left rounded transition-colors ".concat(active
            ? "bg-primary/10 dark:bg-primary/20 text-primary"
            : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary")}>
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>);
}
