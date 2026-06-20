import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const location = useLocation()

  const getTitle = () => {

    if (location.pathname.startsWith("/edit-employee")) {
      return "Edit Employee";
    }

    switch (location.pathname) {
      case "/admin-dashboard":
        return "Dashboard"

      case "/employees":
        return "Employees"

      case "/add-employee":
        return "Add Employee"

      case "/edit-employee":
        return "Edit Employee"

      case "/profile":
        return "Profile"

      default:
        return "Dashboard"
    }
  }

  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        md:left-64
        h-16
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-4 md:px-6
        z-40
      "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        <h2 className="text-lg font-semibold">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <span className="hidden sm:block">
          {user?.name}
        </span>
      </div>
    </header>
  )
}

export default Navbar