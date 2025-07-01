import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import UsersList from "../components/admin/UsersList"
import UserDetails from "../components/admin/UserDetails"
import UserProfile from "../components/user/UserProfile"

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [userStatus, setUserStatus] = useState(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [statusError, setStatusError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log(token); 
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error('No autorizado');
        }
        const data = await res.json();
        console.log(data); 
        setCurrentUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch {
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!currentUser || !currentUser.id) return;
      setStatusLoading(true);
      setStatusError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/block/status/${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!res.ok) throw new Error('No se pudo obtener el estado');
        const data = await res.json();
        setUserStatus(data.status);
      } catch {
        setStatusError('Error al obtener el estado');
      } finally {
        setStatusLoading(false);
      }
    };
    fetchStatus();
  }, [currentUser]);

  // Detectar si el admin quiere ver la vista de admin
  const params = new URLSearchParams(location.search)
  const isAdminView = params.get('view') === 'admin'

  if (!currentUser || !currentUser.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser && currentUser.role === "admin" && isAdminView ? "Panel de Administrador" : "Mi Perfil"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                Bienvenido, {((currentUser.firstName || '') + ' ' + (currentUser.lastName || '')).trim() || currentUser.email}
                {/* Badge de estado */}
                {statusLoading ? (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-xs">Cargando...</span>
                ) : userStatus === 'active' ? (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Activo</span>
                ) : userStatus === 'inactive' ? (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Inactivo</span>
                ) : statusError ? (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">{statusError}</span>
                ) : null}
              </span>
              <div className="flex space-x-2">
                <span
                  className={`px-4 py-0 flex items-center justify-center rounded-full text-xs font-medium ${
                    currentUser.role === "admin" && isAdminView ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {currentUser.role === "admin" && isAdminView ? "Administrador" : "Usuario"}
                </span>
                <button
                  onClick={() => navigate("/")}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentUser.role === "admin" && isAdminView ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de usuarios */}
            <div className="lg:col-span-2">
              <UsersList onSelectUser={setSelectedUser} />
            </div>

            {/* Panel de detalles */}
            <div className="lg:col-span-1">
              <UserDetails user={selectedUser} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <UserProfile user={currentUser} status={userStatus} />
          </div>
        )}
      </main>
    </div>
  )
}
