import React from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from "react-toastify";
import axios from 'axios';

const AddDoctor = () => {
    const [docImg, setDocImg] = React.useState(null);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [experience, setExperience] = React.useState('1 Year');
    const [fees, setFees] = React.useState('');
    const [speciality, setSpeciality] = React.useState('General Physician');
    const [about, setAbout] = React.useState('');
    const [degree, setDegree] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');

    const { adminToken } = React.useContext(AdminContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const onsSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error("Image not selected!");
            }
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { token: adminToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setDocImg(null);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 Year');
                setFees('');
                setSpeciality('General Physician');
                setAbout('');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto mt-6 space-y-6" onSubmit={onsSubmitHandler}>
            <p className="text-2xl font-semibold text-gray-700 border-b pb-2">Add Doctor</p>

            {/* Upload Section */}
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Upload"
                            className="w-28 h-28 object-cover border rounded-full p-2 hover:opacity-80"
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Upload Doctor <br /> Picture
                    </p>
                </div>
            </div>

            {/* Two Column Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <p className="font-medium text-gray-600">Your name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Name"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Doctor Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Doctor Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Experience</p>
                        <select
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        >
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="6 Years">6 Years</option>
                            <option value="7 Years">7 Years</option>
                            <option value="8 Years">8 Years</option>
                            <option value="9 Years">9 Years</option>
                            <option value="10 Years">10 Years</option>
                        </select>
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Fees</p>
                        <input
                            onChange={(e) => setFees(e.target.value)}
                            value={fees}
                            type="number"
                            placeholder="Fees"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                {/* Second Column */}
                <div className="space-y-4">
                    <div>
                        <p className="font-medium text-gray-600">Speciality</p>
                        <select
                            onChange={(e) => setSpeciality(e.target.value)}
                            value={speciality}
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        >
                            <option value="General Physician">General Physician</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Education</p>
                        <input
                            onChange={(e) => setDegree(e.target.value)}
                            value={degree}
                            type="text"
                            placeholder="Education"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="font-medium text-gray-600">Address</p>
                        <input
                            onChange={(e) => setAddress1(e.target.value)}
                            value={address1}
                            type="text"
                            placeholder="Address 1"
                            required
                            className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring focus:ring-blue-300"
                        />
                        <input
                            onChange={(e) => setAddress2(e.target.value)}
                            value={address2}
                            type="text"
                            placeholder="Address 2"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
            </div>

            {/* About Doctor */}
            <div>
                <p className="font-medium text-gray-600">About Doctor</p>
                <textarea
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    placeholder="Write about doctor"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor;
