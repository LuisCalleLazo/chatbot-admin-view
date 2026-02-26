import { useNavigate } from "react-router-dom"
import { useAuth, useTheme } from "../../context"

export const LogoutButton = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <button
      onClick={handleLogout}
      className={`
        w-full flex items-center justify-center gap-2
        px-4 py-2 mx-2 mb-4 mt-2
        text-sm font-medium rounded-md
        transition-colors duration-200
        ${isDark
          ? 'bg-red-700 hover:bg-red-600 text-white'
          : 'bg-red-600 hover:bg-red-500 text-white'
        }
      `}
    >
      <i className="bi bi-box-arrow-right text-base" />
      <span>Cerrar sesión</span>
    </button>
  )
}