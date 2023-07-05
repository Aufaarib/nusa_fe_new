import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const RESEND_URL = "/api/email/verification-notification";
const PAYMENT_AGREEMENT_URL = "/api/pmb/parent-agreement-education-fee";
const DAFTAR_ULANG_AGREEMENT_URL = "/api/pmb/parent-agreement-re-registration";
const STEPS_PMB_URL = "/api/pmb/info";
const STUDENTS_URL = "/api/pmb/students";
const PARENTS_URL = "/api/pmb/parents";
const DOCUMENTS_URL = "/api/pmb/documents";
const FORM_CHECK_URL = "/api/pmb/form-check";
const NOTIFICATIONS = "/api/notifications";
const BROADCAST_AUTH = "/api/broadcasting/auth";
const GET_USER = "/api/user";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const token = localStorage.getItem("TOKEN");
  const location = useLocation();

  const { auth, setAuth } = useAuth();

  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#8F0D1E");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [successMsgSendVerify, setSuccessMsgSendVerify] = useState("");
  const [errMsgSendVerify, setErrMsgSendVerify] = useState("");
  const [currentPendaftaranId, setCurrentPendaftaranId] = useState(undefined);
  const [errStep, setErrStep] = useState("");
  const [openForm, setOpenForm] = useState("");
  const [formCheck, setFormCheck] = useState({
    form_murid: false,
    form_ortu_identitas: false,
    form_ortu_pernyataan: false,
    form_berkas: false,
  });
  const [notifications, setNotifications] = useState([
    {
      id: "",
      type: "",
      notifiable_type: "",
      notifiable_id: "",
      data: {
        title: "",
      },
      read_at: "",
    },
  ]);
  const [notificationNew, setNotificationNew] = useState(false);
  const [notificationUnreadLength, setNotificationUnreadLength] = useState(0);
  const [stepsPMB, setStepsPMB] = useState({
    register: {
      status: "Berhasil",
      details: {
        message: "",
        verified: false,
      },
    },
    register_payment: {
      status: "",
      details: {
        message: "",
        nama_lengkap: "",
        status_pembayaran: "Berhasil",
        jumlah_anak: null,
        tagihan: null,
        total_tagihan: null,
        whatsapp_admin: [
          {
            nama_lengkap: "",
            nomor_ponsel: "",
          },
        ],
        banks: [
          {
            nama_bank: "",
            nama_pemilik: "",
            nomor_rekening: "",
          },
          {
            nama_bank: "",
            nama_pemilik: "",
            nomor_rekening: "",
          },
        ],
      },
    },
    fill_form: {
      status: "",
      details: { message: "" },
    },
    test: { status: "", details: { message: "" } },
    payment_education: { status: "", details: { message: "" } },
  });
  const [students, setStudents] = useState([
    {
      id: "",
      nama_depan: "",
      nama_tengah: "",
      nama_belakang: "",
      status_anak: "",
      anak_ke: "",
      tinggi_badan_anak: "",
      tinggal_bersama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      golongan_darah: "",
      hobby_anak: "",
      berat_badan_anak: "",
      nomor_kartu_keluarga: "",
      jarak_rumah_ke_sekolah: "",
      transportasi_ke_sekolah: "",
      kelas_saat_mendaftar: "",
      asal_sekolah: "",
      sifat_dominan_anak: "",
      penyakit_pernah_diderita: "",
      nomor_akta_lahir_anak: "",
    },
  ]);
  const [parents, setParents] = useState([
    {
      id: "",
      step: 1,
      ayah: {
        nama_lengkap: "",
        nomor_ponsel: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_tempat_bekerja: "",
        posisi_jabatan: "",
        penghasilan_per_bulan: "",
      },
      ibu: {
        nama_lengkap: "",
        nomor_ponsel: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_tempat_bekerja: "",
        posisi_jabatan: "",
        penghasilan_per_bulan: "",
      },
      wali: {
        nama_lengkap: "",
        nomor_ponsel: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_tempat_bekerja: "",
        posisi_jabatan: "",
        penghasilan_per_bulan: "",
      },
      question: {
        wakaf: "",
        nominal_wakaf: "",
        komitmen_infak: "",
        nominal_infak: "",
        harapan_ayah_ibu: "",
        potensi_ayah_ibu: "",
      },
    },
  ]);
  const [documents, setDocuments] = useState([]);

  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    setErrMsg("");
  }, [students, location]);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  // GET STEPS PMB DATA
  const getStepsPMBData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(STEPS_PMB_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const stepsPMB = response?.data?.steps;
      setStepsPMB(stepsPMB);
      // setAuth({...auth, verified: stepsPMB.register.details.verified })
      localStorage.setItem("VERIFIED", stepsPMB.register.details.verified);
      // console.log("INFO TAHAPAN PMB ==== " + JSON.stringify(stepsPMB));
      // console.log("AUTH ==== " + JSON.stringify(auth));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrStep(errors);
      setIsLoading(false);
    }
  };

  // GET DATA STUDENTS
  const getStudentsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(STUDENTS_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data?.students;
      setStudents(data);
      console.log("GET STUDENTS DATA CONTEXT ==== ", JSON.stringify(data));
      console.log("AUTH ==== ", JSON.stringify(auth));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrStep(errors);
      setIsLoading(false);
    }
  };

  // GET DATA PARENTS
  const getParentsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(PARENTS_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data?.students;
      setParents(data);
      // console.log("GET PARENTS DATA CONTEXT ==== ", JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrStep(errors);
      setIsLoading(false);
    }
  };

  // GET DATA BERKAS DOCUMENTS
  const getDocumentsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(DOCUMENTS_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data?.students;
      setDocuments(data);
      console.log("GET DOCUMENTS DATA CONTEXT ==== ", data);
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrStep(errors);
      setIsLoading(false);
    }
  };

  // RESEND EMAIL VERIFICATION LINK
  const resendEmailVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        RESEND_URL,
        {
          current_route: "pmb/tahapan-pmb",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsgSendVerify(
        "Link verifikasi berhasil terkirim. Cek email Anda!"
      );
      setIsLoading(false);
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors);
      const errMsg = err?.response?.data.errors;
      setErrMsgSendVerify(errMsg);
      setIsLoading(false);
    }
  };

  // DAFTAR ULANG
  const daftarUlangAgreement = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(DAFTAR_ULANG_AGREEMENT_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsgSendVerify("Persetujuan berhasil dikirim.");
      setIsLoading(false);
      getStepsPMBData();
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors);
      const errMsg = err?.response?.data.errors;
      setErrMsgSendVerify(errMsg);
      setIsLoading(false);
    }
  };

  // PAYMENT AGREEMENT
  const paymentAgreement = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(PAYMENT_AGREEMENT_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("RES ==== " + JSON.stringify(response?.data));
      setSuccessMsgSendVerify("Persetujuan berhasil dikirim.");
      setIsLoading(false);
      getStepsPMBData();
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors);
      const errMsg = err?.response?.data.errors;
      setErrMsgSendVerify(errMsg);
      setIsLoading(false);
    }
  };

  // GET FORM CHECK
  const getFormCheck = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(FORM_CHECK_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      setFormCheck(data);
      // console.log("GET FORM CHECK DATA CONTEXT ==== ", data);
      setIsLoading(false);

      if (stepsPMB.fill_form.status == "Dalam Proses") {
        setOpenForm("form_murid");
      }
      if (data.form_murid) {
        setOpenForm("form_ortu_identitas");
      }
      if (data.form_ortu_identitas) {
        setOpenForm("form_ortu_pernyataan");
      }
      if (data.form_ortu_pernyataan) {
        setOpenForm("form_berkas");
      }
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  };

  // GET NOTIFICATIONS
  const getNotifications = async (markUnread) => {
    markUnread = markUnread !== 1 ? 0 : 1;
    setIsLoading(true);
    try {
      const response = await axios.get(NOTIFICATIONS, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          mark_all_read: markUnread,
        },
      });
      const data = response?.data;
      setNotifications(data.data);
      const notifUnread = data.data.filter(
        (notification) => notification.read_at === null
      );
      // console.log("GET NOTIFICATIONS DATA CONTEXT ==== ", notifUnread);
      setNotificationNew(notifUnread.length ? true : false);
      setNotificationUnreadLength(notifUnread.length ? notifUnread.length : 0);
      setIsLoading(false);
    } catch (err) {
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  };

  // LISTEN BROADCAST
  const listenBroadcast = async () => {
    try {
      const response = await axios.get(GET_USER, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;

      window.Pusher = Pusher;

      window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.REACT_APP_PUSHER_KEY,
        cluster: "ap1",
        forceTLS: true,
        authEndpoint: process.env.REACT_APP_BASE_URL + BROADCAST_AUTH,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      window.Echo.private("App.Models.User." + data.id).notification(
        (notification) => {
          getNotifications();
        }
      );
    } catch (err) {
      console.error("ERROR === ", err);
      const errors = err?.response?.data.message;
      console.error("ERROR === ", errors);
      setErrMsg(errMsg);
      setIsLoading(false);
    }
  };

  return (
    <StateContext.Provider
      value={{
        daftarUlangAgreement,
        openForm,
        setOpenForm,
        formCheck,
        setFormCheck,
        getFormCheck,
        successMsgSendVerify,
        setSuccessMsgSendVerify,
        errMsgSendVerify,
        setErrMsgSendVerify,
        resendEmailVerification,
        paymentAgreement,
        errStep,
        setErrStep,
        stepsPMB,
        setStepsPMB,
        getStepsPMBData,
        documents,
        setDocuments,
        getDocumentsData,
        successMsg,
        setSuccessMsg,
        errMsg,
        setErrMsg,
        parents,
        setParents,
        getParentsData,
        students,
        setStudents,
        getStudentsData,
        currentPendaftaranId,
        setCurrentPendaftaranId,
        isLoading,
        setIsLoading,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        notifications,
        getNotifications,
        notificationNew,
        setNotificationNew,
        notificationUnreadLength,
        setNotificationUnreadLength,
        listenBroadcast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
