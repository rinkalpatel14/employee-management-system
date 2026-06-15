import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useState } from 'react';

const AdminLayout = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex min-h-screen">

            <Sidebar isOpen={isOpen}
                setIsOpen={setIsOpen} />

            <div className="flex-1 bg-gray-100">

                <Navbar isOpen={isOpen}
                    setIsOpen={setIsOpen} />

                <div className="ml-64 mt-16 p-8">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AdminLayout