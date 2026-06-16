import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {

    const [user, setUser] = useState({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        axios.get("http://localhost:5000/api/auth/profile", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <AdminLayout>

            <div>

                {/* Header */}
                <div className="mb-3">
                    <h1 className="text-4xl font-bold text-gray-800">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage your profile information
                    </p>
                </div>

                {/* Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Card */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

                        <div className="flex flex-col items-center">

                            <img
                                src={
                                    user.profileImage &&
                                        user.profileImage !== "undefined"
                                        ? `http://localhost:5000/images/${user.profileImage}`
                                        : `https://ui-avatars.com/api/?name=${user.name || "User"}&background=2563eb&color=fff`
                                }
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            />

                            <h2 className="mt-5 text-3xl font-bold text-gray-800 capitalize">
                                {user.name}
                            </h2>

                            <p className="text-gray-500 mt-2 capitalize">
                                {user.role}
                            </p>

                            <span className="mt-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Active
                            </span>

                            <button
                                className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition"
                            >
                                <FaEdit />
                                <Link to="/update-profile">
                                    Edit Profile
                                </Link>
                            </button>

                        </div>

                    </div>

                    {/* Right Card */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-8">
                            Account Information
                        </h2>

                        <div className="space-y-6">

                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="text-gray-500">
                                    Full Name
                                </span>

                                <span className="font-semibold text-lg capitalize">
                                    {user.name}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="text-gray-500">
                                    Email Address
                                </span>

                                <span className="font-semibold text-lg">
                                    {user.email}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="text-gray-500">
                                    Role
                                </span>

                                <span className="font-semibold text-lg capitalize">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="text-gray-500">
                                    Status
                                </span>

                                <span className="font-semibold text-green-600">
                                    Active
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="text-gray-500">
                                    Created Date
                                </span>

                                <span className="font-semibold">
                                    {
                                        user.createdAt
                                            ? new Date(user.createdAt).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )
                                            : "-"
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">
                                    Last Updated
                                </span>

                                <span className="font-semibold">
                                    {
                                        user.updatedAt
                                            ? new Date(user.updatedAt).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )
                                            : "-"
                                    }
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Profile;