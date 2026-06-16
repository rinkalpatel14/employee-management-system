import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { FaCamera, FaSave, FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [profileImage, setprofileImage] = useState("")

    const history = useHistory()
    const token = localStorage.getItem('token')

    //handleImage
    const handleImage = (e) => {
        const file = e.target.files[0]

        if (file) {
            setprofileImage(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    //getProfile
    const getProfile = () => {
        axios.get('http://localhost:5000/api/auth/profile', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                const user = res.data.data
                setName(user.name)
                setEmail(user.email)

                if (user.profileImage) {
                    setprofileImage(
                        `http://localhost:5000/images/${user.profileImage}`
                    )
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.patch('http://localhost:5000/api/auth/update-profile',
            {
                name: name
            },
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res.data)
                toast.success(res.data.message)
                history.push("/profile")
            })
            .catch((error) => {
                console.log(error.response)
            })

    }

    return (
        <AdminLayout>

            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="mb-4">
                    <h1 className="text-5xl font-bold text-gray-900">
                        Edit Profile
                    </h1>

                    <p className="text-gray-500 mt-1 text-lg">
                        Update your profile details
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left Card */}
                    <div className="bg-white rounded-3xl shadow-md p-6">

                        <div className="flex flex-col items-center">

                            <div className="relative">

                                <img
                                    src={
                                        profileImage
                                            ? profileImage
                                            : `https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff&size=200`
                                    }
                                    alt="Profile"
                                    className=" w-40 h-40 rounded-full border-4 border-blue-500 object-cover" />

                                <label className="absolute bottom-1 right-2 bg-white shadow-lg rounded-full p-3 cursor-pointer " >
                                    <FaCamera className="text-blue-600" />
                                    <input
                                        type="file"
                                        onChange={handleImage}
                                        className="hidden"
                                    />
                                </label>

                            </div>

                            <h2 className="mt-4 text-4xl font-bold text-gray-800">
                                {name}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Administrator
                            </p>

                            <span
                                className=" mt-1 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                                Active
                            </span>

                            <div
                                className=" mt-5 w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center ">
                                <p className="text-blue-700 text-sm">
                                    JPG, PNG or GIF. Max size 2MB
                                </p>

                                <label
                                    className=" inline-block mt-4 px-6 py-3 border border-blue-500 text-blue-600 rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white  transitio "
                                >
                                    Change Photo

                                    <input
                                        type="file"
                                        onChange={handleImage}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                        </div>

                    </div>

                    {/* Right Card */}
                    <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                        <div className="p-6 border-b">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Profile Information
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="p-6 space-y-8">

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="
                                        w-full
                                        px-5
                                        py-4
                                        border
                                        border-gray-300
                                        rounded-xl
                                        focus:ring-2
                                        focus:ring-blue-500
                                        outline-none
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        //    onChange={(e)=>setEmail(e.target.value)}
                                        className="
                                        w-full
                                        px-5
                                        py-4
                                        bg-gray-100
                                        border
                                        border-gray-300
                                        rounded-xl
                                    "
                                    />

                                    <p className="text-gray-500 text-sm mt-2">
                                        Email address cannot be changed.
                                    </p>
                                </div>

                            </div>

                            <div className="border-t p-6 flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={() => history.push("/profile")}
                                    className="
                                    px-8
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    hover:bg-gray-100
                                "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="
                                    px-8
                                    py-3
                                    bg-blue-600
                                    text-white
                                    rounded-xl
                                    hover:bg-blue-700
                                    flex
                                    items-center
                                    gap-2
                                "
                                >
                                    <FaSave />
                                    Update Profile
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
};

export default EditProfile
