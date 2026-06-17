import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddEmployee = () => {

    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        userId: "",
        department: "",
        designation: "",
        salary: ""
    })
    const history = useHistory()

    useEffect(() => {
        getEmployeeUsers()
    }, [])

    //getEmployee Users
    const getEmployeeUsers = () => {

        axios.get('https://employee-management-system-dwvi.onrender.com/api/auth/employee-users')
            .then((res) => {
                console.log(res.data.data)
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error.response)
            })

    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //cancle button
    const handleCancle = () =>{
        history.push('/employees')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formData)

        const token = localStorage.getItem('token')
        //api call

        axios.post('https://employee-management-system-dwvi.onrender.com/api/employee/create', formData, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                toast.success("Employee Created Successfully")
                history.push('/employees')
                console.log(res.data.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })

    }

    return (
        <AdminLayout>

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="mb-5">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Add Employee
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill employee details and create account
                    </p>
                </div>

                {/* Form Card */}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5">

                    <form onSubmit={handleSubmit}>

                        {/* Employment Information */}

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-3">
                                Employment Information
                            </h2>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Employee
                            </label>

                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl"
                            >

                                <option value="">
                                    Select Employee
                                </option>

                                {users.map((user) => (
                                    <option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {user.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Department */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    <option value="HR">
                                        HR
                                    </option>

                                    <option value="IT">
                                        IT
                                    </option>

                                    <option value="Finance">
                                        Finance
                                    </option>

                                    <option value="Marketing">
                                        Marketing
                                    </option>
                                </select>
                            </div>

                            {/* Designation */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Designation
                                </label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    placeholder="Manager / Developer"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Salary */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="Enter salary"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Buttons */}

                        <div className="flex gap-4 mt-10">

                            <button
                                type="button"
                                onClick={handleCancle}
                                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition"
                            >
                                Create Employee
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
};

export default AddEmployee;