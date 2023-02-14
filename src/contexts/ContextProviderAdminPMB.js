import React, { createContext, useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import axios from '../api/axios';

const ADMIN_PMB_URL = '/api/pmb/admin';
const CRUD_TAHUN_AJARAN_URL = '/api/pmb/tahun-ajaran';
const CRUD_GELOMBANG_URL = '/api/pmb/gelombang';
const CRUD_INITIAL_GELOMBANG_URL = '/api/pmb/gelombang-kosong';
const CRUD_BIAYA_URL = '/api/pmb/biaya';
const ADMIN_PUBLISH_URL = '/api/pmb/admin-publish';
const ADMIN_ARCHIVE_URL = '/api/pmb/admin-archive';
const PAYMENT_REGISTER_URL = '/api/pmb/payment-register/all';
const PAYMENT_UPLOAD_URL = '/api/pmb/payment-register';
const PAYMENT_DOWNLOAD_URL = '/api/pmb/payment-register-download';
const HASIL_TEST_URL = '/api/pmb/test-results'
const PUBLISH_HASIL_TEST_URL = '/api/pmb/test-result-publish'

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

export const ContextProviderAdminPMB = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('TOKEN'));
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [indexGelombang, setIndexGelombang] = useState(0);
  const [addTahunAjaran, setAddTahunAjaran] = useState("");
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState({})
  const [allTahunAjaran, setAllTahunAjaran] = useState([
    {
      id: null,
      tahun_ajaran: "",
      publish: false,
      pengarsipan: false,
      archived_at: "",
    }
  ]);
  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [tahunAjaranById, setTahunAjaranById] = useState([{
    id: null,
    tahun_ajaran: "",
    publish: false,
    pengarsipan: false,
    archived_at: "",
    groups: [
      {
        id: null,
        tahun_ajaran_id: null,
        nama: "",
        step_register_start: "",
        step_register_end: "",
        step_payment_registration_start: "",
        step_payment_registration_end: "",
        step_eform_start: "",
        step_eform_end: "",
        step_test_start: "",
        step_test_end: "",
        step_payment_education_start: "",
        step_payment_education_end: "",
        syarat_dokumen: [
          {
            nama: "Akte Kelahiran",
            wajib: true
          },
          {
            nama: "Kartu Keluarga",
            wajib: true
          },
          {
            nama: "Rapor",
            wajib: true
          },
          {
            nama: "Foto",
            wajib: true
          },
        ],
        fees: [
          {
            id: null,
            tahun_ajaran_id: null,
            nama: "",
            kelas: null,
            biaya: null,
            untuk_registrasi: false,
            is_enabled: false
          }
        ],
      }
    ]
  }]);
  const [currentTahunAjaran, setCurrentTahunAjaran] = useImmer({
    id: null,
    tahun_ajaran: "",
    publish: false,
    pengarsipan: false,
    archived_at: "",
    groups: [
      {
        id: null,
        tahun_ajaran_id: null,
        nama: "",
        step_register_start: "",
        step_register_end: "",
        step_payment_registration_start: "",
        step_payment_registration_end: "",
        step_eform_start: "",
        step_eform_end: "",
        step_test_start: "",
        step_test_end: "",
        step_payment_education_start: "",
        step_payment_education_end: "",
        syarat_dokumen: [
          {
            nama: "Akte Kelahiran",
            wajib: true
          },
          {
            nama: "Kartu Keluarga",
            wajib: true
          },
          {
            nama: "Rapor",
            wajib: true
          },
          {
            nama: "Foto",
            wajib: true
          },
        ],
        fees: [
          {
            id: null,
            tahun_ajaran_id: null,
            nama: "",
            kelas: null,
            biaya: null,
            untuk_registrasi: false,
            is_enabled: false
          }
        ],
      }
    ]
  });
  const [allPaymentRegister, setAllPaymentRegister] = useState([
    {
      id: null,
      nama_lengkap: "",
      email: "",
      nomor_ponsel: "",
      jumlah_daftar_anak: null,
      status_pembayaran: {
          id: null,
          bukti: "",
          tgl_bayar: "",
          jenis_bayar: "",
          total: null,
          status_bukti: "",
          jumlah_anak: null,
          published: null,
          user_id: null
      },            
      students: [
          {
              id: null,
              nama_lengkap_anak: "",
              nomor_akta_lahir_anak: "",
              nama_ayah: "",
              alamat_ayah: "",
              nama_ibu: "",
              alamat_ibu: "",
              nama_wali: "",
              alamat_wali: "",
          },
      ]
  },
  ])
  const [postTahunAjaran, setPostTahunAjaran] = useImmer(
    {
      tahun_ajaran: "",
      groups: [
        {
          syarat_dokumen: [],
          fees: [],
        }
      ]
    }
  )
  const [biaya, setBiaya] = useState([])

  const [gelombang, setGelombang] = useImmer([])
  const [gridFeesData, setGridFeesData] = useImmer([])
  const [gridDocsData, setGridDocsData] = useImmer([])

  const [postGelombang, setPostGelombang] = useImmer({})

  const [allHasilTest, setAllHasilTest] = useState([])


  // GET ALL TAHUN AJARAN
  const getAllTahunAjaran = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(CRUD_TAHUN_AJARAN_URL,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data.data;
      setAllTahunAjaran(data);
      setTahunAjaran(data);
      // console.log("ALL TAHUN AJARAN ==== " + JSON.stringify(allTahunAjaran));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }
  

  // GET TAHUN AJARAN BY ID
  const getTahunAjaranById = async (id) => {
    // console.log("ID === ", id)
    setIsLoading(true);
    try {
      const response = await axios.get(ADMIN_PMB_URL+"/"+id,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data;
      console.log("CONTEXT TAHUN AJARAN BY ID ==== " + JSON.stringify(data));
      setTahunAjaranById(data);
      setCurrentTahunAjaran(data);
      getGelombangById(selectedTahunAjaran.id);
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  // TAMBAH TAHUN AJARN
  const tambahTahunAjaran = async (tahun_ajaran) => {
    setIsLoading(true);
    try {
      const response = await axios.post(CRUD_TAHUN_AJARAN_URL, 
        { 
          'tahun_ajaran': tahun_ajaran, 
        },
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      // console.log("RES ==== " + JSON.stringify(response?.data));
      getAllTahunAjaran();
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // HAPUS TAHUN AJARAN
  const hapusTahunAjaran = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(CRUD_TAHUN_AJARAN_URL+"/"+id,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      console.log("RES ==== " + JSON.stringify(response?.data));
      getAllTahunAjaran();
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // CREATE TAHUN AJARAN
  const createTahunAjaran = async (tahun_ajaran) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ADMIN_PMB_URL, 
        { 
          tahun_ajaran, 
        },
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // GET TAHUN AJARAN BY PUBLISH
  const getTahunAjaranByPublish = async (status) => {
    // console.log("getTahunAjaranByPublish === ", status)
    setIsLoading(true);
    try {
      const response = await axios.get(ADMIN_PMB_URL,
        {
          params: {publish: status}, 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data.data;
      setCurrentTahunAjaran(data);
      // console.log("TAHUN AJARAN PUBLISH ==== " + JSON.stringify(tahunAjaranPublish));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  // UPDATE TAHUN AJARAN
  const updateTahunAjaran = async (id) => {
    setIsLoading(true)
    const body = postTahunAjaran;
    try {
      const response = await axios.put(ADMIN_PMB_URL+"/"+id,
        body,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      // console.log("RES UPDATE TAHUN AJARAN ==== " + JSON.stringify(response?.data));
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // PUBLISH TAHUN AJARAN
  const publishTahunAjaran = async (id_tahun_ajaran) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ADMIN_PUBLISH_URL+"/"+id_tahun_ajaran, null,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsg("Publish Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.message)
      const errMsg = err?.response?.data.message;
      alert(errMsg)
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // ARSIP TAHUN AJARAN
  const archiveTahunAjaran = async (id_tahun_ajaran) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ADMIN_ARCHIVE_URL+"/"+id_tahun_ajaran, null,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsg("Arsip Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }


  // ==================
  // GELOMBANG
  // ==================

  const createInitialGelombang = async (tahun_ajaran_id, nama) => {
    setIsLoading(true)
    const body = {tahun_ajaran_id}
    try {
      const response = await axios.post(CRUD_INITIAL_GELOMBANG_URL,
        body,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      // console.log("CREATE INITIAL GELOMBANG ==== " + JSON.stringify(response?.data));
      getTahunAjaranById(tahun_ajaran_id);
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // GET GELOMBANG BY ID
  const getGelombangById = async (id) => {
    // console.log("ID === ", id)
    setIsLoading(true);
    try {
      const response = await axios.get(CRUD_GELOMBANG_URL,
        {
          params: {
            id_tahun_ajaran: id
          }, 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data.data;
      setGelombang(data);
      console.log("CONTEXT GELOMBANG BY ID ==== " + JSON.stringify(data));
      console.log("CONTEXT GELOMBANG ID ==== " + JSON.stringify(data[0].id));

      // getBiayaById(data[0].id);
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  // UPDATE GELOMBANG
  const updateGelombang = async (id) => {
    setIsLoading(true)
    const body = postGelombang;
    try {
      const response = await axios.put(CRUD_GELOMBANG_URL+"/"+id,
        body,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      // console.log("RES UPDATE TAHUN AJARAN ==== " + JSON.stringify(response?.data));
      getGelombangById(selectedTahunAjaran.id);
      //RESET DATA POST GELOMBANG
      setPostGelombang({});
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // GET BIAYA BY ID
  const getBiayaById = async (id) => {
    // console.log("ID === ", id)
    setIsLoading(true);
    try {
      const response = await axios.get(CRUD_BIAYA_URL,
        {
          params: {
            id_group: id
          }, 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data.data;
      console.log("BIAYA BY ID ==== " + JSON.stringify(data));
      setBiaya(data);
      // console.log("BIAYA ==== " + JSON.stringify(biaya));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  // GET BIAYA BY ID
  const updateBiayaById = async (body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(CRUD_BIAYA_URL,
        body,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("UPDATE BIAYA BERHASIL ==== " + JSON.stringify(response?.data));
      setSuccessMsg("Berhasil");
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors)
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  }

  // ==================
  // PAYMENT
  // ==================

  // GET ALL PAYMENT REGISTER
  const getAllPaymentRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(PAYMENT_REGISTER_URL,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const allPaymentRegister = response?.data.data;
      setAllPaymentRegister(allPaymentRegister);
      console.log("ALL PAYMENT REGISTER CONTEXT ==== " + JSON.stringify(allPaymentRegister));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  // PAYMENT UPLOAD
  const paymentUpload = async (id_user, body) => {
    setIsLoading(true);
    try {
      const response = await axios.post(PAYMENT_UPLOAD_URL+"/"+id_user,
        body,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = response?.data.data;
      console.log("BERHASIL ", JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }


  // ==================
  // HASIL TEST
  // ==================

  // GET ALL HASIL TEST
  const getAllHasilTest = async (id_tahun_ajaran, id_gelombang, paginate) => {
    setIsLoading(true);
    try {
      const response = await axios.get(HASIL_TEST_URL,
        {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          // params: {
          //   id_tahun_ajaran,
          //   id_gelombang,
          //   paginate
          // }
        }
      )
      const data = response?.data.students;
      console.log("GET ALL HASIL TEST DATA CONTEXT ==== ", data);
      setAllHasilTest(data);
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }

  const publishHasilTest = async (body) => {
    setIsLoading(true);
    try {
      const response = await axios.post(PUBLISH_HASIL_TEST_URL,
        body,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      )
      const data = response?.data.students;
      console.log("GET ALL HASIL TEST DATA CONTEXT ==== ", data);
      getAllHasilTest();
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message
      console.error("ERROR === ", errors)
      setErrMsg(errors);
      setIsLoading(false);
    }
  }



  return (
    <StateContext.Provider value={{ publishHasilTest, allHasilTest, setAllHasilTest, getAllHasilTest, archiveTahunAjaran, publishTahunAjaran, updateBiayaById, createInitialGelombang, getBiayaById, gelombang, setGelombang, postGelombang, setPostGelombang, getGelombangById, updateGelombang, selectedTahunAjaran, setSelectedTahunAjaran, hapusTahunAjaran, tambahTahunAjaran, addTahunAjaran, setAddTahunAjaran, addTahunAjaran, paymentUpload, indexGelombang, setIndexGelombang, gridFeesData, setGridFeesData, gridDocsData, setGridDocsData, postTahunAjaran, setPostTahunAjaran, currentTahunAjaran, setCurrentTahunAjaran, tahunAjaran, setTahunAjaran, getTahunAjaranByPublish, currentTahunAjaran, setCurrentTahunAjaran, allPaymentRegister, setAllPaymentRegister, getAllPaymentRegister, tahunAjaranById, setTahunAjaranById, getTahunAjaranById, createTahunAjaran, getAllTahunAjaran, updateTahunAjaran, allTahunAjaran, setAllTahunAjaran, successMsg, setSuccessMsg, errMsg, setErrMsg, isLoading, setIsLoading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
