//import model
const EMP = require('../model/employeeModel')
const USER = require('../model/userModel')

//create employee api
exports.createEmployee = async (req, res) => {
    try {

        const data = req.body

        //validation
        if (!data.userId || !data.department || !data.designation || !data.salary) {
            return res.status(400).json({
                status: 'Fail',
                message: 'All Fields are required',
            })
        }

        //check user exists
        const user = await USER.findById(data.userId)

        if (!user) {
            return res.status(400).json({
                status: 'Fail',
                message: 'User Not Found',
            })
        }

        if (user.role !== "employee") {
            return res.status(400).json({
                status: "Fail",
                message: "Selected user is not an employee"
            })
        }

        //check employee alredy exists
        const ExistEmp = await EMP.findOne({ userId: data.userId })
        if (ExistEmp) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Employee Alredy Exists',
            })
        }

        //generate employee id
        const lastEmployee = await EMP.findOne().sort({ employeeId: -1 })

        let employeeId = "EMP001"

        if (lastEmployee) {
            const lastNumber = parseInt(lastEmployee.employeeId.replace("EMP", "")) //002
            employeeId = "EMP" + String(lastNumber + 1).padStart(3, "0") //002+1 = 003 = EMP003 
        }
        data.employeeId = employeeId //EMP003

        //create employee
        const createEmp = await EMP.create(data)

        res.status(201).json({
            status: 'Success',
            message: 'Employee Created Successfully',
            data: createEmp
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//getAll Employee api
exports.getAllEmployee = async (req, res) => {
    try {

        const employees = await EMP.find().populate('userId', '-password')

        res.status(200).json({
            status: 'Success',
            message: 'Data Fetch Successfully',
            total: employees.length,
            data: employees
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//getSingle Employee
exports.getSingleEmployee = async (req, res) => {
    try {

        const singleId = req.params.id
        const singleEmployee = await EMP.findById(singleId).populate('userId')

        if (!singleEmployee) {
            return res.status(400).json({
                status: "Fail",
                message: "Employee not found"
            })
        }

        res.status(201).json({
            status: 'Success',
            message: 'Single Data Fetch Successfully',
            data: singleEmployee
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}


//updateEmployee
exports.updateEmployee = async (req, res) => {
    try {

        const editId = req.params.id

        const updatedEmployee = await EMP.findByIdAndUpdate(editId, req.body, { new: true })

        if (!updatedEmployee) {
            return res.status(404).json({
                status: "Fail",
                message: "Employee not found"
            })
        }

        res.status(200).json({
            status: 'Success',
            message: 'Employee Updated Successfully',
            data: updatedEmployee
        })

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}


//delete employee api
exports.deleteEmployee = async (req, res) => {
    try {

        const deleteId = req.params.id
        const deletedEmployee = await EMP.findByIdAndDelete(deleteId)

        if (!deletedEmployee) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Employee Not Found'
            })
        }

        res.status(200).json({
            status: 'Success',
            message: 'Employee Deleted Successfully',
            data: deletedEmployee
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

//dashboard-stats api
exports.dashboardCheck = async (req, res) => {
    try {

        const employees = await EMP.find()
        
        //Total Employee
        const totalEmployees = employees.length

        //Total Salary
        let totalSalary = 0

        employees.forEach((emp)=>{
            totalSalary += Number(emp.salary)
        })

        //Total Departments
        let departments = [];

        employees.forEach((emp)=>{
            if(!departments.includes(emp.department)){
                departments.push(emp.department)
            }
        })

        const totalDepartment = departments.length

        return res.status(200).json({
            status: 'Success',
            message: 'Success',
            data : {
                totalEmployees,
                totalDepartment,
                totalSalary
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}