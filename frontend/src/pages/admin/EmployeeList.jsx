import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const token = localStorage.getItem('token')

    //total department
    const totalDepartments = new Set(
        employees.map(emp => emp.department)
    ).size

    useEffect(() => {
        fetchEmployees()
         // eslint-disable-next-line
    }, [])

    //fetchEmployee
    const fetchEmployees = () => {

        axios.get('http://localhost:5000/api/employee/get-all',
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then((res) => {
                console.log(res.data.data)
                setEmployees(res.data.data)
            })
            .catch((error) => {
                 toast.error(error.response?.data?.message || error.message)
            })
    }

    //deleteEmployee
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee ?")

        if (!confirmDelete) return

        axios.delete(`http://localhost:5000/api/employee/delete/${id}`, {
            headers: {
                Authorization: token
            }
        }
        )
            .then((res) => {
                toast.success("Employee Deleted Successfully")
                console.log(res.data.data)
                fetchEmployees() //table refresh
            })
            .catch((error) => {
               toast.error(error.response?.data?.message || error.message)
            })
    }

    return (
        <AdminLayout>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="text-gray-500">
                            Total Employees
                        </h3>

                        <h1 className="text-3xl font-bold mt-2">
                            {employees.length}
                        </h1>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="text-gray-500">
                            Departments
                        </h3>

                        <h1 className="text-3xl font-bold mt-2">
                            {totalDepartments}
                        </h1>
                    </div>

                    <div className="bg-green-50 border border-green-100 p-5 rounded-xl shadow">
                        <h3 className="text-green-700">
                            Total Salary
                        </h3>

                        <h1 className="text-3xl font-bold mt-2 text-green-600">
                            ₹{
                                employees
                                    .reduce((acc, item) => acc + item.salary, 0)
                                    .toLocaleString("en-IN")
                            }
                        </h1>
                    </div>

                </div>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            Employees
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage all employees from here
                        </p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow transition">
                        <Link to="/add-employee">
                            + Add Employee
                        </Link>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    #
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Employee ID
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Employee
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Designation
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Salary
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((emp, index) => (
                                <tr
                                    key={emp._id}
                                    className="border-b hover:bg-blue-50 transition duration-200"
                                >
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {emp.employeeId}
                                    </td>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                            {emp.userId?.name?.charAt(0).toUpperCase()}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {emp.userId?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {emp.userId?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                            {emp.department}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {emp.designation}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        ₹{emp.salary?.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/edit-employee/${emp._id}`}>
                                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg">
                                                    <FaEdit />
                                                </button>
                                            </Link>

                                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                                                <FaTrash
                                                    onClick={() => handleDelete(emp._id)}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {employees.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No Employees Found
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default EmployeeList