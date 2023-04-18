import React from 'react'
import TextInput from '../../../components/TextInput'
import { getKelas } from '../../../api/Kelas';
import { getMapel } from '../../../api/MataPelajaran';
import { postJadwalMapel } from '../../../api/JadwalMataPelajaran';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ModalEmpty, ModalStatusTambah } from '../../../components/ModalPopUp';
import { Header } from '../../../components';
import { DropdownJenisTransaksi } from '../../../components/Dropdown';

const moment = require('moment-timezone');

export default function TambahJadwalMataPelajaran() {

const [class_id, setClassId] = useState('');
const [course_id, setCourseId] = useState('');
const [day, setDay] = useState('');
const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');

const [classData, setClassData] = useState([]);
const [courseData, setCourseData] = useState([]);

const [isOpenStatus, setisOpenStatus] = useState(false);
const [isOpenEmpty, setisOpenEmpty] = useState(false);
const [sts, setSts] = useState(undefined);
const created_by = localStorage.getItem("NAMA")
const date = moment(new Date()).format("yyyy-MM-DD");

// fetch function
const fetchCourse = async () => {
    getMapel(setCourseData, setSts)
  };
const fetchClass = async () => {
    getKelas(setClassData, setSts)
};

useEffect(() => {
    fetchClass();
    fetchCourse();
}, []);

const postData = (e) => {
    e.preventDefault();

    const jakartaTimezone = 'Asia/Jakarta';
    const start = moment.tz(startTime, 'HH:mm:ss', jakartaTimezone);
    const end = moment.tz(endTime, 'HH:mm:ss', jakartaTimezone);

    const displayStartTime = start.format('HH:mm:ss');
    const displayEndTime = end.format('HH:mm:ss');

    const start_time = date + "T" + displayStartTime + ".594Z"
    const end_time = date + "T" + displayEndTime + ".594Z"

    if (course_id.length === 0 || course_id.length === 0 || day.length === 0 || start_time.length === 0 || end_time.length === 0) {

        setisOpenEmpty(true);
    }
    else {
        postJadwalMapel(setSts, class_id, course_id, day, start_time, end_time, created_by);      setisOpenStatus(true)
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

const navigateSemester = () => {
    navigate('/admin/list-jadwal-mata-pelajaran');
};

const courseOptions = courseData.map((c) => ({
    label: c.course_name + " - " + c.status,
    value: c.id,
}));

const classOptions = classData.map((c) => ({
    label: c.name,
    value: c.id,
}));

return (    
    <div>
        <div style={{ marginBottom : "50px" }}>
            <Header category="Admin KBM / Jadwal Mata Pelajaran / Tambah Jadwal Mata Pelajaran" title="Tambah Jadwal Mata Pelajaran" />
        </div>
        <div style={{ marginLeft : "60px" }}>
        <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Form Tambah Jadwal Mata Pelajaran</p>
            <article>
                <DropdownJenisTransaksi
                    label="Kelas"
                    required={true}
                    defaultValue={class_id}
                    isClearable={false}
                    options={classOptions}
                    isSearchable={false}
                    onChange={(e) => setClassId(e.value)}
                />
                <DropdownJenisTransaksi
                    label="Mata Pelajaran"
                    required={true}
                    defaultValue={course_id}
                    isClearable={false}
                    options={courseOptions}
                    isSearchable={false}
                    onChange={(e) => setCourseId(e.value)}
                />
                <TextInput
                    label="Hari"
                    type="text"
                    id="group"
                    name="code"
                    onChange={(e) => setDay(e.target.value)}
                    required={true}
                />

                <TextInput
                    label="Jam Mulai"
                    type="text"
                    id="group"
                    name="code"
                    placeholder="00:00:00"
                    defaultValue={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required={true}
                />
                <TextInput
                    label="Jam Selesai"
                    type="text"
                    id="group"
                    name="code"
                    placeholder="00:00:00"
                    defaultValue={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required={true}
                />

                <div className='btn-form'>
                    <button type="button" className="w-20 btn-hijau flex justify-center mb-5" onClick={postData}>
                        Tambah
                    </button>
                    <button type="button" className="w-20 btn-merah flex justify-center mb-5"
                    onClick={navigateSemester}>
                        Batal
                    </button>
                </div>
                <ModalStatusTambah 
                    isOpenStatus={isOpenStatus}
                    closeModalStatus={closeModalStatus}
                    status={sts}
                    navigate={navigateSemester}
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