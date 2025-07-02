import { useState } from "react"

export default function UserCreateModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!open) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Generar username a partir del email
      let username = formData.email;
      if (username.endsWith('@gmail.com')) {
        username = username.replace('@gmail.com', '');
      } else if (username.includes('@')) {
        username = username.split('@')[0];
      }
      const payload = {
        email: formData.email,
        password: formData.password,
        username,
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Registration failed')
      }
      setSuccess("¡Cuenta creada exitosamente!")
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
        window.location.reload();
      }, 1200)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-12 max-md:w-[80%] relative animate-fade-in">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-stone-800">LANDING</h1>
          <p className="text-2xl font-light uppercase tracking-widest text-stone-600">PHOTOGRAPHY</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-stone-800">Crear Usuario</h2>
            <p className="text-sm text-stone-500">Completa los datos para crear un usuario</p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-stone-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-700 text-white py-3 rounded hover:bg-stone-800 transition transform hover:-translate-y-0.5 shadow-md px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creando..." : "Crear Usuario"}
          </button>
        </form>
      </div>
    </div>
  )
} 