import { useHistory, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditEmployee = () => {

    const history = useHistory()
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const [emploeeName, setEmployeeName] = useState('')
    const [formData, setFormData] = useState({
        department: "",
        designation: "",
        salary: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        fetchEmployee()
        // eslint-disable-next-line
    }, [])

    //fetch employee
    const fetchEmployee = () => {
        axios.get(`http://localhost:5000/api/employee/get-single/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {

                const emp = res.data.data
                setEmployeeName(emp.userId.name)
                setFormData({
                    department: emp.department,
                    designation: emp.designation,
                    salary: emp.salary
                })
                // console.log(res.data.data)
            })

            .catch((error) => {
                 toast.error(error.response?.data?.message || error.message)
            })
    }

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.patch(`http://localhost:5000/api/employee/update/${id}`, formData, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                toast.success("Updated Successfully")
                setTimeout(() => {
                    history.push('/employees')
                }, 1000)
                // console.log(res.data.data)
            })
            .catch((error) => {
               toast.error(error.response?.data?.message || error.message)
                // console.log(error.response.message)
            })
    }

    //handleCancle
    const handleCancle = () => {
        history.push('/employees')
    }

    return (
        <AdminLayout>
            <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    Edit Employee
                </h1>

                <p className="text-gray-500 mt-2">
                    Update employee details
                </p>

                <div className="mt-6 bg-white rounded-3xl shadow-lg border border-gray-100 px-8 py-5">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                        Employee Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Employee Name */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Employee
                            </label>

                            <input
                                type="text"
                                value={emploeeName}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Department */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Department
                                </label>

                                <select
                                    value={formData.department}
                                    name="department"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                >
                                    <option>HR</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                    <option>Marketing</option>
                                </select>
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Designation
                                </label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    placeholder="Manager / Developer"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                />
                            </div>

                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Salary
                            </label>

                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Enter salary"
                                className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">

                            <button
                                onClick={handleCancle}
                                type="button"
                                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
                            >
                                Update Employee
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditEmployee;