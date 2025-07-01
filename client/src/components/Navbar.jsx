import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import UserIcon from "../assets/icons/user (1).svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Función para obtener el usuario actual
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  }

  // Actualizar usuario al montar y al cambiar de ruta
  useEffect(() => {
    setUser(getCurrentUser())
  }, [location])

  // Escuchar cambios en localStorage (por ejemplo, en otras pestañas)
  useEffect(() => {
    const handleStorage = () => {
      setUser(getCurrentUser())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setDropdownOpen(false)
    navigate('/login')
  }

  const handleProfile = () => {
    setDropdownOpen(false)
    navigate('/dashboard')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-stone-800">LANDING</span>
            <span className="text-xs font-light tracking-wider text-stone-600">PHOTOGRAPHY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-stone-700 hover:text-stone-900 font-medium">
              Home
            </Link>
            <a href="#about" className="text-stone-700 hover:text-stone-900 font-medium">
              About
            </a>
            <a href="#portfolio" className="text-stone-700 hover:text-stone-900 font-medium">
              Portfolio
            </a>
            <a href="#contact-us" className="text-stone-700 hover:text-stone-900 font-medium">
              Contact us
            </a>
            {user && user.role === 'admin' && (
              <Link to="/config" className="text-stone-700 hover:text-stone-900 font-medium">
                Configuración
              </Link>
            )}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img src={UserIcon} alt="User" className="w-7 h-7" />
                </button>
                <span className="ml-2 text-stone-700 font-medium max-w-[120px] truncate">{user.firstName}</span>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border">
                    {user.role === 'admin' ? (
                      <button
                        className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                        onClick={() => { setDropdownOpen(false); navigate('/dashboard?view=admin') }}
                      >
                        Ver usuarios
                      </button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                        onClick={handleProfile}
                      >
                        Ver perfil
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-stone-700 hover:text-stone-900">
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Home
            </Link>
            <a href="#about" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              About
            </a>
            <a href="#portfolio" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Portfolio
            </a>
            <a href="#contact-us" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Contact us
            </a>
            {user && user.role === 'admin' && (
              <Link to="/config" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
                Configuración
              </Link>
            )}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img src={UserIcon} alt="User" className="w-7 h-7" />
                </button>
                <span className="ml-2 text-stone-700 font-medium max-w-[120px] truncate">{user.firstName}</span>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border">
                    {user.role === 'admin' ? (
                      <button
                        className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                        onClick={() => { setDropdownOpen(false); navigate('/dashboard?view=admin'); closeMenu(); }}
                      >
                        Ver usuarios
                      </button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                        onClick={() => { handleProfile(); closeMenu(); }}
                      >
                        Ver perfil
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                      onClick={() => { handleLogout(); closeMenu(); }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors w-fit"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
