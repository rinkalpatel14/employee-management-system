import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login.jpg";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const history = useHistory()

    const handleChange = (e) => {
        if (e.target.name === "profileImage") {
            setFormData({
                ...formData,
                profileImage: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        const data = new FormData();

        data.append("name", formData.name)
        data.append("email", formData.email)
        data.append("password", formData.password)
        data.append("profileImage", formData.profileImage)

        //api call
        axios.post('http://localhost:5000/api/auth/register', data)
            .then((res) => {
                toast.success('Register Successfully')
                history.push('/')
                // console.log(res.data.data)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || error.message)
            })
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-12">

                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                        Employee
                        <br />
                        Management System
                    </h1>

                    <p className="mt-5 text-lg text-gray-600 leading-8">
                        Manage your employees efficiently with a modern
                        employee management platform.
                    </p>

                    <div className="flex justify-center mt-10">
                        <img
                            src={loginImage}
                            alt="Employee Management"
                            className="w-80"
                        />
                    </div>

                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-4 lg:px-9 lg:py-8">

                    <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-slate-900">
                            Create Account 🚀
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Register your account
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Full Name"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-dashed border-gray-300 rounded-xl bg-gray-50"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                            >
                                Create Account
                            </button>

                        </form>

                        <p className="text-center mt-4 text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;