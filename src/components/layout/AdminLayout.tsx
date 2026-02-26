"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context";
import { menuOptions } from "../../utils/";
import { LogoutButton } from "../button/LogoutButton";

interface MenuOption {
  id: string;
  label: string;
  icon: string;
  href?: string;
  subOptions?: MenuOption[];
}

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [activeOption, setActiveOption] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const findActiveOption = (options: MenuOption[]): void => {
      for (const option of options) {
        if (option.href === location.pathname) {
          setActiveOption(option.id);
          return;
        }
        if (option.subOptions) {
          for (const subOption of option.subOptions) {
            if (subOption.href === location.pathname) {
              setActiveOption(subOption.id);
              if (!expandedMenus.includes(option.id)) {
                setExpandedMenus((prev) => [...prev, option.id]);
              }
              return;
            }
          }
        }
      }
    };
    findActiveOption(menuOptions);
  }, [location.pathname]);

  const toggleSubmenu = (optionId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleOptionClick = (option: MenuOption) => {
    if (option.subOptions && option.subOptions.length > 0) {
      toggleSubmenu(option.id);
    } else {
      setActiveOption(option.id);
      setSidebarOpen(false);
      if (option.href) navigate(option.href);
    }
  };

  // Theme-aware color tokens
  const pageBg = isDark ? "bg-gray-950" : "bg-slate-50";
  const headerBg = isDark
    ? "bg-gray-900/80 backdrop-blur-md border-gray-800"
    : "bg-white/80 backdrop-blur-md border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const iconHover = isDark
    ? "hover:text-white text-gray-400"
    : "hover:text-gray-900 text-gray-500";

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        :root {
          --grad-start: #4ade80;   /* green-400  */
          --grad-mid:   #22d3ee;   /* cyan-400   */
          --grad-end:   #38bdf8;   /* sky-400    */
          --sidebar-w:  260px;
        }

        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ── Sidebar gradient ── */
        .admin-sidebar {
          background: linear-gradient(170deg, #0f172a 0%, #0c2340 40%, #053d38 100%);
          box-shadow: 4px 0 24px rgba(0,0,0,0.3);
        }

        /* ── Logo area ── */
        .admin-logo-area {
          background: linear-gradient(135deg, rgba(74,222,128,0.15), rgba(56,189,248,0.15));
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* ── Nav pill active ── */
        .nav-item-active {
          background: linear-gradient(90deg, rgba(74,222,128,0.25), rgba(56,189,248,0.18));
          border-left: 3px solid #4ade80;
          color: #fff !important;
          box-shadow: 0 2px 12px rgba(74,222,128,0.15);
        }

        /* ── Nav pill hover ── */
        .nav-item:hover:not(.nav-item-active) {
          background: rgba(255,255,255,0.06);
          border-left-color: transparent;
        }

        /* ── Submenu active ── */
        .sub-item-active {
          background: linear-gradient(90deg, rgba(34,211,238,0.25), rgba(56,189,248,0.12));
          border-left: 2px solid #22d3ee;
          color: #fff !important;
        }

        /* ── Gradient badge on logo text ── */
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          background: linear-gradient(90deg, var(--grad-start), var(--grad-end));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Header gradient border bottom ── */
        .header-gradient-border::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--grad-start), var(--grad-mid), var(--grad-end));
          opacity: 0.6;
        }

        /* ── Icon button circle ── */
        .icon-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .icon-btn:hover { transform: scale(1.08); }

        /* ── Avatar pill ── */
        .avatar-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 12px 4px 4px;
          border-radius: 999px;
          transition: background 0.2s;
          cursor: pointer;
        }

        /* ── Scrollbar inside sidebar ── */
        .admin-sidebar::-webkit-scrollbar { width: 4px; }
        .admin-sidebar::-webkit-scrollbar-track { background: transparent; }
        .admin-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        /* ── Main content scrollbar ── */
        .main-scroll::-webkit-scrollbar { width: 6px; }
        .main-scroll::-webkit-scrollbar-track { background: transparent; }
        .main-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }

        /* ── Fade-in animation ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-enter { animation: fadeSlideUp 0.35s ease both; }

        /* ── Submenu expand animation ── */
        @keyframes expandDown {
          from { opacity: 0; transform: scaleY(0.85); transform-origin: top; }
          to   { opacity: 1; transform: scaleY(1); }
        }
        .submenu-enter { animation: expandDown 0.2s ease both; }

        /* ── Section label in sidebar ── */
        .nav-section-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          padding: 18px 16px 6px;
          font-weight: 600;
        }
      `}</style>

      <div className={`min-h-screen flex ${pageBg}`}>
        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ════════════════════════════════
            SIDEBAR
        ════════════════════════════════ */}
        <aside
          className={`admin-sidebar fixed z-50 flex flex-col h-screen overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "var(--sidebar-w)", minWidth: "var(--sidebar-w)" }}
        >
          {/* Logo */}
          <button
            className="admin-logo-area flex items-center gap-3 px-5 py-4 w-full text-left transition-opacity hover:opacity-90"
            onClick={() => {
              navigate("/admin/");
              setActiveOption("dashboard");
            }}
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#4ade80,#38bdf8)",
                padding: "2px",
              }}
            >
              {/* Logo image — falls back to gradient initial if missing */}
              <img
                src="/src/assets/icons/logo.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-[10px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="logo-text text-lg leading-tight">
              Chatbot Business
            </span>
          </button>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            <p className="nav-section-label">Menú principal</p>

            {menuOptions.map((option) => (
              <div key={option.id}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`nav-item w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl border-l-3 border-transparent transition-all duration-200 ${
                    activeOption === option.id
                      ? "nav-item-active"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-base transition-all ${
                        activeOption === option.id
                          ? "text-green-300"
                          : "text-slate-400"
                      }`}
                    >
                      <i className={`bi ${option.icon}`}></i>
                    </span>
                    <span>{option.label}</span>
                  </div>
                  {option.subOptions?.length ? (
                    <i
                      className={`bi bi-chevron-${expandedMenus.includes(option.id) ? "up" : "down"} text-xs text-slate-500 transition-transform duration-200`}
                    ></i>
                  ) : null}
                </button>

                {/* Submenu */}
                {option.subOptions && expandedMenus.includes(option.id) && (
                  <div className="submenu-enter ml-3 mt-0.5 pl-3 border-l border-white/10 space-y-0.5 pb-1">
                    {option.subOptions.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveOption(sub.id);
                          setSidebarOpen(false);
                          navigate(sub.href ?? "/admin/settings/business");
                        }}
                        className={`nav-item w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg border-l-2 border-transparent transition-all duration-200 ${
                          activeOption === sub.id
                            ? "sub-item-active"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <i className={`bi ${sub.icon} text-sm`}></i>
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 pb-4 border-t border-white/08 pt-3">
            <LogoutButton />
          </div>
        </aside>

        {/* ════════════════════════════════
            MAIN CONTENT
        ════════════════════════════════ */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* ── Top header ── */}
          <header
            className={`relative header-gradient-border flex-shrink-0 flex items-center gap-4 px-6 h-16 border-b ${headerBg} transition-colors duration-300`}
          >
            {/* Mobile hamburger */}
            <button
              type="button"
              className={`lg:hidden icon-btn ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"} ${textMuted}`}
              onClick={() => setSidebarOpen(true)}
            >
              <i className="bi bi-list text-xl"></i>
            </button>

            {/* Breadcrumb / Page title area (optional slot) */}
            <div className="flex-1" />

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={isDark ? "Modo claro" : "Modo oscuro"}
                className={`icon-btn ${isDark ? "hover:bg-white/10 text-yellow-300" : "hover:bg-slate-100 text-slate-500"}`}
              >
                <i
                  className={`bi ${isDark ? "bi-brightness-high-fill" : "bi-moon-stars-fill"} text-base`}
                ></i>
              </button>

              {/* Notifications */}
              <button
                className={`relative icon-btn ${isDark ? "hover:bg-white/10" : "hover:bg-slate-100"} ${iconHover}`}
              >
                <i className="bi bi-bell-fill text-base"></i>
                {/* Badge */}
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg,#4ade80,#22d3ee)",
                  }}
                />
              </button>

              {/* Divider */}
              <div
                className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-gray-200"} mx-1`}
              />

              {/* User avatar */}
              <div
                className={`avatar-pill ${isDark ? "hover:bg-white/08" : "hover:bg-slate-100"}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#4ade80,#38bdf8)",
                  }}
                >
                  U
                </div>
                <span
                  className={`text-sm font-medium ${textPrimary} hidden sm:block`}
                >
                  Usuario
                </span>
                <i className={`bi bi-chevron-down text-xs ${textMuted}`}></i>
              </div>
            </div>
          </header>

          {/* ── Page content ── */}
          <main className={`main-scroll flex-1 overflow-y-auto ${pageBg}`}>
            <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
