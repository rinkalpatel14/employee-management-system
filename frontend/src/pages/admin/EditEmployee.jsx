import { useHistory, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditEmployee = () => {

    const history = useHistory()
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const [employeeName, setEmployeeName] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [salary, setSalary] = useState('')

    const designationMap = {
        HR: ["HR Executive", "Recruiter", "HR Manager"],
        Development: [
            "Junior Developer",
            "Software Developer",
            "Senior Developer",
            "Team Lead"
        ],
        QA: ["QA Engineer", "Senior QA Engineer", "Test Lead"],
        Finance: ["Accountant", "Finance Executive", "Finance Manager"],
        Sales: ["Sales Executive", "Sales Manager"],
        Marketing: ["Marketing Executive", "Marketing Manager"],
        Support: ["Support Executive", "Technical Support Engineer"],
        DevOps: ["DevOps Engineer", "Cloud Engineer"],
        "UI/UX": ["UI Designer", "UI/UX Designer"] //using slash then "UI/UX" means ""
    }


    useEffect(() => {
        fetchEmployee()
        // eslint-disable-next-line
    }, [])

    //fetch employee
    const fetchEmployee = () => {
        axios.get(`https://employee-management-system-1-mj50.onrender.com/api/employee/get-single/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {

                const emp = res.data.data
                setEmployeeName(emp.userId.name)
                setDepartment(emp.department)
                setDesignation(emp.designation)
                setSalary(emp.salary)
                // console.log(res.data.data)
            })

            .catch((error) => {
                toast.error(error.response?.data?.message || error.message)
            })
    }

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {department,designation,salary}

        axios.patch(`https://employee-management-system-1-mj50.onrender.com/api/employee/update/${id}`, data, {
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
            <div className="overflow-x-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
                    Edit Employee
                </h1>

                <p className="text-gray-500 mt-2">
                    Update employee details
                </p>

                <div className="mt-6 bg-white rounded-3xl shadow-lg border border-gray-100 px-4 sm:px-8 py-5">
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
                                value={employeeName}
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
                                    value={department}
                                    name="department"
                                    onChange={(e) => { setDepartment(e.target.value); setDesignation("") }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                >
                                    <option value="">Select Department</option>
                                    <option value="HR">HR</option>
                                    <option value="Development">Development</option>
                                    <option value="QA">QA</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Support">Support</option>
                                </select>
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    Designation
                                </label>

                                <select
                                    name="designation"
                                    disabled={!department}
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                >
                                    <option value="">
                                        {department ? "Select Designation" : "First Select Department"}
                                    </option>
                                    {designationMap[department]?.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
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
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Enter salary"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">

                            <button
                                onClick={handleCancle}
                                type="button"
                                className=" w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
                            >
                                Update Employee
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditEmployee;