import {
  MdDashboard,
  MdInventory2,
  MdSell,
  MdShoppingCart,
  MdSettings,
} from "react-icons/md";

export default function Sidebar({ currentSection, setSection }) {
  return (
    <aside className="w-64 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Admin Panel
        </h1>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        <NavItem
          icon={<MdDashboard />}
          label="Dashboard"
          active={currentSection === "dashboard"}
          onClick={() => setSection("dashboard")}
        />
        <NavItem
          icon={<MdInventory2 />}
          label="Products"
          active={currentSection === "products"}
          onClick={() => setSection("products")}
        />
        <NavItem
          icon={<MdSell />}
          label="Categories"
          active={currentSection === "categories"}
          onClick={() => setSection("categories")}
        />
        <NavItem
          icon={<MdShoppingCart />}
          label="Orders"
          active={currentSection === "orders"}
          onClick={() => setSection("orders")}
        />
        <NavItem
          icon={<MdSettings />}
          label="Settings"
          active={currentSection === "settings"}
          onClick={() => setSection("settings")}
        />
      </nav>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded transition-colors ${
        active
          ? "bg-primary/10 dark:bg-primary/20 text-primary"
          : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}