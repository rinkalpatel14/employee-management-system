import { useState } from "react";
import loginImage from "../../assets/login.jpg";
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()  // Prevent page refresh

        // console.log(email)
        // console.log(password)

        axios.post('https://employee-management-system-1-mj50.onrender.com/api/auth/login', {
            email,
            password
        })
            .then((res) => {
                toast.success('Successfully Login')
                // console.log(res.data.data)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.data))
                if (res.data.data.role === "admin") {
                    history.push('/admin-dashboard')
                } else {
                    history.push('/employee-dashboard')
                }

            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || error.message
                )
                // console.log(error.response.data)
            })

    }

    return (
        <div className="h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 overflow-hidden" >

            <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden">

                <div className="grid md:grid-cols-[1.1fr_0.9fr]">

                    {/* left side */}
                    <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-12 flex flex-col justify-center">

                        <h1 className="text-4xl font-bold text-slate-900 leading-tight">Employee <br /> Management System</h1>

                        <p className="text-gray-600 mt-4 text-base leading-7"> Manage your employees efficiently with a modern
                            employee management platform.</p>

                        <div className="flex justify-center mt-8">
                            <img src={loginImage} alt="" />
                        </div>
                    </div>

                    {/* right side */}
                    <div className="bg-white flex items-center justify-center p-10">
                        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Welcome Back 👋
                            </h2>

                            <p className="text-gray-500 mt-2 mb-8">
                                Login to your account
                            </p>
                            <form action="" onSubmit={handleSubmit} >
                                {/* Email */}
                                <div className="mb-5">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input type="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                                </div>
                                {/* Password */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Remember Me */}
                                <div className="flex justify-between items-center mb-6">

                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-blue-600"
                                        />
                                        Remember me
                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                                >
                                    Login
                                </button>

                                {/* Register */}
                                <p className="text-center text-sm text-gray-500 mt-6">
                                    Don't have an account?
                                    <span className="text-blue-600 font-medium ml-1 cursor-pointer hover:underline">
                                        <Link to="/register">
                                            Register
                                        </Link>
                                    </span>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login