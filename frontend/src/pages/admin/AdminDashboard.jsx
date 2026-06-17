import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FaUsers,
    FaBuilding,
    FaUserCheck,
    FaMoneyBillWave,
} from "react-icons/fa";
import axios from 'axios'
import { toast } from "react-toastify";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartment: 0,
        totalSalary: 0
    })

    const token = localStorage.getItem('token')
    console.log(token)

    useEffect(() => {
        fetchDashboardStats()
        // eslint-disable-next-line
    }, [])

    //fetch Dashboard Satas
    function fetchDashboardStats() {
        axios.get('http://localhost:5000/api/employee/dashboard-stats',
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log("API Response:", res.data)
                setStats(res.data.data)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || error.message)
            })
    }

    return (
        <AdminLayout>
            <div>
                <h1 className="text-4xl font-bold mb-2">
                    Welcome Admin
                </h1>

                <p className="text-gray-500 mb-8">
                    Admin Dashboard
                </p>

                {/* Dashboard Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-2xl shadow p-8 min-h-[140px] ">

                    {/* Total Employees */}

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500">
                                    Total Employees
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    {stats.totalEmployees}
                                </h2>
                            </div>

                            <FaUsers
                                size={40}
                                className="text-blue-500"
                            />
                        </div>
                    </div>

                    {/* Departments */}

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500">
                                    Departments
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    {stats.totalDepartment}
                                </h2>
                            </div>

                            <FaBuilding
                                size={40}
                                className="text-green-500"
                            />
                        </div>
                    </div>

                    {/* Active Employees */}

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500">
                                    Active Employees
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    20
                                </h2>
                            </div>

                            <FaUserCheck
                                size={40}
                                className="text-purple-500"
                            />
                        </div>
                    </div>

                    {/* Total Salary */}

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500">
                                    Total Salary
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    ₹{stats.totalSalary.toLocaleString()}
                                </h2>
                            </div>

                            <FaMoneyBillWave
                                size={40}
                                className="text-orange-500"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;