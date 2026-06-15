import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();

    const getTitle = () => {

        switch (location.pathname) {

            case "/admin-dashboard":
                return "Dashboard";

            case "/employees":
                return "Employees";

            case "/add-employee":
                return "Add Employee";

            case "/profile":
                return "Profile";

            default:
                return "Dashboard";
        }
    };

    return (
        <div
            className={`
                fixed
                top-0
                right-0
                ${isOpen ? "left-64" : "left-20"}
                h-16
                bg-white
                border-b
                border-gray-200
                flex
                items-center
                justify-between
                px-6
                z-50
                transition-all
                duration-300
            `}
        >

            {/* Left Side */}

            <div className="flex items-center gap-4">

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-600 text-xl hover:text-blue-600"
                >
                    <FaBars />
                </button>

                <h2 className="text-lg font-semibold text-gray-800">
                    {getTitle()}
                </h2>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium text-gray-700">
                    {user?.name}
                </span>

            </div>

        </div>
    );
};

export default Navbar;