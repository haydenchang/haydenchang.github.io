import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/work", label: "work" },
  { to: "/projects", label: "projects" },
  { to: "/about", label: "about" }
] as const;

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-link heat-target">
          Hayden Chang
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-item heat-target active" : "nav-item heat-target"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
