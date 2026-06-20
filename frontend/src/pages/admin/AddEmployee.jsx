import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddEmployee = () => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState("")
    const [department, setDepartment] = useState("")
    const [designation, setDesignation] = useState("")
    const [salary, setSalary] = useState("")

    const history = useHistory()

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
        getEmployeeUsers()
        // eslint-disable-next-line
    }, [])

    //getEmployee Users
    const getEmployeeUsers = () => {

        axios.get('https://employee-management-system-1-mj50.onrender.com/api/auth/employee-users')
            .then((res) => {
                // console.log(res.data.data)
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error.response)
            })

    }

    //cancle button
    const handleCancle = () => {
        history.push('/employees')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const employeeData = { userId, department, designation, salary }
        const token = localStorage.getItem('token')
        //api call

        axios.post('https://employee-management-system-1-mj50.onrender.com/api/employee/create', employeeData, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                toast.success("Employee Created Successfully")
                history.push('/employees')
                // console.log(res.data.data)
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || error.message)
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
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
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
                                    value={department}
                                    onChange={(e) => { setDepartment(e.target.value); setDesignation("") }}
                                    // onChange={(e) => {setDepartment(e.target.value);setDesignation("")}}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">
                                        Select Department
                                    </option>
                                    <option value="HR">
                                        HR
                                    </option>
                                    <option value="Development">
                                        Development
                                    </option>
                                    <option value="QA">
                                        QA
                                    </option>
                                    <option value="UI/UX">
                                        UI/UX
                                    </option>
                                    <option value="DevOps">
                                        DevOps
                                    </option>
                                    <option value="Sales">
                                        Sales
                                    </option>
                                    <option value="Marketing">
                                        Marketing
                                    </option>
                                    <option value="Finance">
                                        Finance
                                    </option>
                                    <option value="Support">
                                        Support
                                    </option>
                                </select>
                            </div>

                            {/* Designation */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Designation
                                </label>

                                <select
                                    name="designation"
                                    value={designation}
                                    disabled={!department}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <label className="block mt-5 mb-2 text-sm font-semibold text-gray-700">
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

                        <div className="flex flex-col sm:flex-row gap-4 mt-10">

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

            </div >

        </AdminLayout >
    )
}

export default AddEmployee