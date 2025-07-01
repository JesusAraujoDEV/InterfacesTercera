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
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{ background: 'var(--color-secondary)', color: 'var(--color-text)', backdropFilter: 'blur(4px)', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-paragraph)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-sm font-bold tracking-wider" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-title)', fontSize: 'var(--font-size-headline)' }}>LANDING</span>
            <span className="text-xs font-light tracking-wider" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-title)', fontSize: 'var(--font-size-subtitle)' }}>PHOTOGRAPHY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:underline" style={{ color: 'var(--color-text)' }}>
              Home
            </Link>
            <a href="#about" className="font-medium hover:underline" style={{ color: 'var(--color-text)' }}>
              About
            </a>
            <a href="#portfolio" className="font-medium hover:underline" style={{ color: 'var(--color-text)' }}>
              Portfolio
            </a>
            <a href="#contact-us" className="font-medium hover:underline" style={{ color: 'var(--color-text)' }}>
              Contact us
            </a>
            {user && user.role === 'admin' && (
              <Link to="/config" className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
                Configuración
              </Link>
            )}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                  style={{ background: 'var(--color-neutral)' }}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img src={UserIcon} alt="User" className="w-7 h-7" />
                </button>
                <span className="ml-2 font-medium max-w-[120px] truncate" style={{ color: 'var(--color-primary)' }}>{user.firstName}</span>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border" style={{ background: 'var(--color-secondary)' }}>
                    {user.role === 'admin' ? (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => { setDropdownOpen(false); navigate('/dashboard?view=admin') }}
                      >
                        Ver usuarios
                      </button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={handleProfile}
                      >
                        Ver perfil
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                      style={{ color: 'var(--color-accent)' }}
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
                className="px-4 py-2 rounded transition-colors"
                style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)' }}
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
            <Link to="/" className="block font-medium hover:underline" style={{ color: 'var(--color-text)' }} onClick={closeMenu}>
              Home
            </Link>
            <a href="#about" className="block font-medium hover:underline" style={{ color: 'var(--color-text)' }} onClick={closeMenu}>
              About
            </a>
            <a href="#portfolio" className="block font-medium hover:underline" style={{ color: 'var(--color-text)' }} onClick={closeMenu}>
              Portfolio
            </a>
            <a href="#contact-us" className="block font-medium hover:underline" style={{ color: 'var(--color-text)' }} onClick={closeMenu}>
              Contact us
            </a>
            {user && user.role === 'admin' && (
              <Link to="/config" className="block font-medium hover:underline" style={{ color: 'var(--color-primary)' }} onClick={closeMenu}>
                Configuración
              </Link>
            )}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200 focus:outline-none"
                  style={{ background: 'var(--color-neutral)' }}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img src={UserIcon} alt="User" className="w-7 h-7" />
                </button>
                <span className="ml-2 font-medium max-w-[120px] truncate" style={{ color: 'var(--color-primary)' }}>{user.firstName}</span>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border" style={{ background: 'var(--color-secondary)' }}>
                    {user.role === 'admin' ? (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => { setDropdownOpen(false); navigate('/dashboard?view=admin'); closeMenu(); }}
                      >
                        Ver usuarios
                      </button>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => { handleProfile(); closeMenu(); }}
                      >
                        Ver perfil
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-stone-100"
                      style={{ color: 'var(--color-accent)' }}
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
                className="block px-4 py-2 rounded transition-colors w-fit"
                style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)' }}
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
