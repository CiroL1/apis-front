import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from 'next/navigation'
import { useSession } from "@/components/Context/SessionContext"; // Assuming this path is correct
import toast from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate(); // Changed from useRouter
  const { login } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // Register user
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        let errorMsg = "Error al registrarse";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // Save token and log in automatically
      login(data.token);

      toast.success("Usuario registrado correctamente");

      // Redirect based on role
      if (data.type === "ADMIN") {
        navigate("/admin"); // Changed from router.push
      } else {
        navigate("/user"); // Changed from router.push
      }
    } catch (err) {
      toast.error(err.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark disabled:opacity-50"
      >
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </button>
    </form>
  );
}