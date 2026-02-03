'use client';

import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../context'
import { menuOptions } from '../../utils/'

interface MenuOption {
  id: string
  label: string
  icon: string
  href?: string
  subOptions?: MenuOption[]
}

interface AdminLayoutProps {
  children?: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isDark, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [activeOption, setActiveOption] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const findActiveOption = (options: MenuOption[]): void => {
      for (const option of options) {
        if (option.href === location.pathname) {
          setActiveOption(option.id)
          return
        }
        if (option.subOptions) {
          for (const subOption of option.subOptions) {
            if (subOption.href === location.pathname) {
              setActiveOption(subOption.id)
              if (!expandedMenus.includes(option.id)) {
                setExpandedMenus((prev) => [...prev, option.id])
              }
              return
            }
          }
        }
      }
    }
    findActiveOption(menuOptions)
  }, [location.pathname])

  const toggleSubmenu = (optionId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    )
  }

  const handleOptionClick = (option: MenuOption) => {
    if (option.subOptions && option.subOptions.length > 0) {
      toggleSubmenu(option.id)
    } else {
      setActiveOption(option.id)
      setSidebarOpen(false)

      if (option.href) {
        navigate(option.href)
      }
    }
  }

  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-100'
  const sidebarBg = isDark ? 'bg-blue-900' : 'bg-blue-800'
  const sidebarBgDark = isDark ? 'bg-blue-950' : 'bg-blue-900'
  const headerBg = isDark ? 'bg-gray-800' : 'bg-white'
  const textColor = isDark ? 'text-gray-100' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200'
  const hoverBg = isDark ? 'hover:bg-blue-700' : 'hover:bg-blue-700'
  const activeMenuBg = isDark ? 'bg-blue-700' : 'bg-blue-700'
  const submenuActiveBg = isDark ? 'bg-blue-600' : 'bg-blue-600'

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex justify-between">
        {/* Sidebar */}
        <div
          className={`fixed z-50 w-[20%] h-[100vh] overflow-auto ${sidebarBg} transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button 
            className={`flex items-center justify-center h-16 ${sidebarBgDark} w-full hover:opacity-80 transition-opacity duration-200 cursor-pointer`} 
            onClick={() => {
              navigate('/admin/')
              setActiveOption('dashboard')
            }}
          >
            <h1 className="text-white text-xl font-bold">Chatbot Business</h1>
          </button>

          <nav className="mt-5 px-2">
            {menuOptions.map((option) => (
              <div key={option.id} className="mb-1">
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeOption === option.id
                      ? `${activeMenuBg} text-white`
                      : 'text-blue-100 hover:text-white'
                  } ${hoverBg}`}
                >
                  <div className="flex items-center">
                    <i className={`bi ${option.icon} mr-3 text-lg`}></i>
                    <span>{option.label}</span>
                  </div>
                  {option.subOptions && option.subOptions.length > 0 && (
                    <i
                      className={`bi bi-chevron-${expandedMenus.includes(option.id) ? 'up' : 'down'} text-xs`}
                    ></i>
                  )}
                </button>

                {/* Submenu */}
                {option.subOptions && expandedMenus.includes(option.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {option.subOptions.map((subOption) => (
                      <button
                        key={subOption.id}
                        onClick={() => {
                          setActiveOption(subOption.id)
                          setSidebarOpen(false)
                          navigate(subOption.href ?? '/admin/settings/business')
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                          activeOption === subOption.id
                            ? `${submenuActiveBg} text-white`
                            : 'text-blue-200 hover:text-white'
                        } ${hoverBg}`}
                      >
                        <i className={`bi ${subOption.icon} mr-3 text-base`}></i>
                        <span>{subOption.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="w-[80%] relative overflow-auto h-[100vh]">
          {/* Top navigation */}
          <div
            className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b ${borderColor} ${headerBg} px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8`}
          >
            <button
              type="button"
              className={`-m-2.5 p-2.5 ${isDark ? 'text-gray-300' : 'text-gray-700'} lg:hidden`}
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <i className="bi bi-list text-xl"></i>
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

              <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
                {/* User menu */}
                <div className="flex items-center gap-x-4">
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-x-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200`}
                    title={isDark ? 'Modo claro' : 'Modo oscuro'}
                  >
                    <i className={`bi ${isDark ? 'bi-brightness-high' : 'bi-moon'} text-lg`}></i>
                  </button>
                  <button className={`flex items-center gap-x-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <i className="bi bi-bell text-lg"></i>
                  </button>
                  <button className={`flex items-center gap-x-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <i className="bi bi-person-circle text-lg"></i>
                    <span>Usuario</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
