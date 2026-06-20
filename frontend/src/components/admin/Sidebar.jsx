import { Link, useLocation, useHistory } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {

  const location = useLocation();
  const history = useHistory();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      name: "Add Employee",
      path: "/add-employee",
      icon: <FaUserPlus />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          flex
          flex-col
          z-50
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="px-5 py-5 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
              E
            </div>

            <div>
              <h1 className="text-xl font-bold">
                EMS
              </h1>

              <p className="text-xs text-slate-400">
                Employee Management
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-xl">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl
                    ${location.pathname === item.path
                      ? "bg-blue-600"
                      : "hover:bg-slate-800"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              A
            </div>

            <div>
              <h3>Admin</h3>
              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar