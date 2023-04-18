import React from 'react'
import TextInput from '../../../components/TextInput';
import { DropdownJenisTransaksi } from '../../../components/Dropdown';
import { getKelompokMapel } from '../../../api/KelompokMataPelajaran';
import { updateMapel } from '../../../api/MataPelajaran';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../../../components';


export default function UbahMataPelajaran() {

const [code, setCode] = useState('');
const [course_name, setCourseName] = useState('');
const [group_course_id, setGroupCourseId] = useState('');
const [description, setDescription] = useState('');
const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [sts, setSts] = useState(undefined);
const location = useLocation();

const [groupcourseData, setGroupCourseData] = useState([]);


// fetch function
const fetchGroupCourse = async () => {
    getKelompokMapel(setGroupCourseData, setSts)
  };

useEffect(() => {
    fetchGroupCourse();
}, []);


const postData = (e) => {
    e.preventDefault();
    const id = location.state.id

    if (code.trim().length === 0 || course_name.trim().length === 0 || description.trim().length === 0 || group_course_id.length === 0) {
        setisOpenEmpty(true);
    }
    else {
        updateMapel(setSts, code, course_name, description, group_course_id, id)
        setisOpenStatus(true);
    }
}

const closeModalEmpty = () => {
    setisOpenEmpty(false);
}

const closeModalStatus = () => {
    setisOpenStatus(false);
    setSts('');
}

const navigate = useNavigate();

const navigateMapel = () => {
    navigate('/admin/list-mata-pelajaran');
};

const groupCourseOptions = groupcourseData.map((c) => ({
    label: c.name + " - " + c.status,
    value: c.id,
}));

return (
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Mata Pelajaran / Ubah Mata Pelajaran" title="Ubah Mata Pelajaran" />
        </div>
        <div style={{ marginLeft : "60px" }}>
            <p className="text-3xl mb-16 mt-5 font-bold">Form Ubah Mata Pelajaran</p>
            <article>
                {/* COL 1 */}
                <section>
                    <TextInput
                        label="Code"
                        type="text"
                        placeholder={location.state.code}
                        onChange={(e) => setCode(e.target.value)}
                        required={true}
                    />
                    <TextInput
                        label="Nama Mata Pelajaran"
                        type="text"
                        placeholder={location.state.course_name}
                        onChange={(e) => setCourseName(e.target.value)}
                        required={true}
                    />
                    <DropdownJenisTransaksi
                        label="Kelompok Mata Pelajaran"
                        required={true}
                        defaultValue={group_course_id}
                        isClearable={false}
                        options={groupCourseOptions}
                        isSearchable={false}
                        onChange={(e) => setGroupCourseId(e.value)}
                    />
                    <TextInput
                        label="Deskripsi"
                        type="text"
                        placeholder={location.state.description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                    />
                </section>

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Ubah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateMapel}>
                        Batal
                    </button>
                </div>

                <ModalStatusTambah
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={sts}
                    navigate={navigateMapel}
                />

                <ModalEmpty
                    isOpenEmpty={isOpenEmpty}
                    closeModalEmpty={closeModalEmpty}
                    onRequestCloseEmpty={closeModalEmpty}
                />
            </article>
        </div>
    </div>
)
}