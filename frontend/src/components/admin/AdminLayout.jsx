import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

const AdminLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false)

  return (

    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="md:ml-64">
        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="mt-16 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
    
  )
}

export default AdminLayout