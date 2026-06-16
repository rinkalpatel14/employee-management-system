import { Link, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaUserPlus,
    FaUserCircle,
    FaSignOutAlt,
    FaBuilding
} from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Sidebar = ({ isOpen }) => {

    const location = useLocation();
    const history = useHistory()

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin-dashboard",
            icon: <FaTachometerAlt />
        },
        {
            name: "Employees",
            path: "/employees",
            icon: <FaUsers />
        },
        {
            name: "Add Employee",
            path: "/add-employee",
            icon: <FaUserPlus />
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUserCircle />
        }
    ];


    //logout button
    const handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        history.push('/')
    }

    return (
        <div
            className={`
    bg-[#020B2D]
    text-white
    h-screen
    fixed
    left-0
    top-0
    flex
    flex-col
    ${isOpen ? "w-64" : "w-20"}
  `} >
            {/* Logo */}

            <div className="px-5 py-5 border-b border-slate-800">

                <div className="flex items-center gap-3">

                    <div className="
            w-10
            h-10
            rounded-xl
            bg-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg
        ">
                        E
                    </div>

                    {isOpen && (
                        <div>

                            <h1 className="text-xl font-bold text-white">
                                EMS
                            </h1>

                            <p className="text-xs text-slate-400">
                                Employee Management
                            </p>

                        </div>
                    )}

                </div>

            </div>
            {/* Menu */}

            <div className="flex-1 p-4">

                <ul className="space-y-2">

                    {menuItems.map((item) => (

                        <li key={item.path}>

                            <Link
                                to={item.path}
                                className={`
                                    flex items-center
                                    ${isOpen
                                        ? "gap-3 px-4"
                                        : "justify-center"}
                                    py-3
                                    rounded-xl
                                    transition-all
                                    duration-200
                                    ${location.pathname === item.path
                                        ? "bg-blue-600 shadow-lg"
                                        : "hover:bg-slate-800"}
                                `}
                            >

                                <span className="text-lg">
                                    {item.icon}
                                </span>

                                {isOpen && (
                                    <span>
                                        {item.name}
                                    </span>
                                )}

                            </Link>

                        </li>

                    ))}

                </ul>

            </div>

            {/* Bottom User */}

            <div className="border-t border-slate-800 p-4">

                <div
                    className={`flex items-center ${isOpen
                        ? "gap-3 mb-4"
                        : "justify-center mb-4"
                        }`}
                >

                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                        A
                    </div>

                    {isOpen && (
                        <div>

                            <h3 className="text-sm font-medium">
                                Admin
                            </h3>

                            <p className="text-xs text-slate-400">
                                Administrator
                            </p>

                        </div>
                    )}

                </div>

                <button
                    onClick={handleLogout}
                    className={`
                        w-full
                        flex items-center
                        ${isOpen
                            ? "gap-3 px-4"
                            : "justify-center"
                        }
                        py-3
                        rounded-xl
                        hover:bg-red-600
                        transition-all
                    `}
                >

                    <FaSignOutAlt />

                    {isOpen && "Logout"}

                </button>

            </div>

        </div>
    );
};

export default Sidebar;