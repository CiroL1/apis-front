import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function UserProfileButton() {
  const { user, isLoggedIn, logout } = useSession();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    if (!user) return;
    if (user.type === "ADMIN") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full p-2 text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10 focus:outline-none"
      >
        <FaUserCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-background-dark shadow-lg border border-black/10 dark:border-white/10 z-50">
          {!isLoggedIn ? (
            <ul className="flex flex-col">
              <li>
                <button
                  className="block px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 w-full text-left"
                  onClick={() => { navigate("/login"); setIsOpen(false); }}
                >
                  Log In / Sign Up
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => { handleDashboardClick(); setIsOpen(false); }}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => { logout(); setIsOpen(false); navigate("/"); }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
