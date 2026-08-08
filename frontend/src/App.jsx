import "./App.css";

import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Database,
  ShieldCheck,
  TriangleAlert,
  Wrench,
  Settings,
} from "lucide-react";

import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Requirements from "./pages/Requirements";
import Evidence from "./pages/Evidence";
import Compliance from "./pages/Compliance";
import Risks from "./pages/Risks";
import Remediation from "./pages/Remediation";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    label: "Requirements",
    path: "/requirements",
    icon: ListChecks,
  },
  {
    label: "Evidence",
    path: "/evidence",
    icon: Database,
  },
  {
    label: "Compliance",
    path: "/compliance",
    icon: ShieldCheck,
  },
  {
    label: "Risks",
    path: "/risks",
    icon: TriangleAlert,
  },
  {
    label: "Remediation",
    path: "/remediation",
    icon: Wrench,
  },
];

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-logo">T</div>

            <div>
              <strong>TrustLens</strong>
              <span>AI Compliance</span>
            </div>
          </div>

          <nav className="navigation">
            <p className="nav-label">Workspace</p>

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="sidebar-bottom">
            <button className="nav-item">
              <Settings size={19} />
              <span>Settings</span>
            </button>

            <div className="user-card">
              <div className="avatar">S</div>

              <div>
                <strong>Compliance Team</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="main-area">
          <header className="topbar">
            <span className="topbar-title">TrustLens AI</span>

            <div className="topbar-status">
              <span className="status-dot" />
              System operational
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/remediation" element={<Remediation />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;