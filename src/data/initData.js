import React from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaWpforms, FaChild, FaFileSignature } from 'react-icons/fa'
import { AiOutlineBarChart, AiFillFileText, AiOutlineSchedule } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { BsCardText, BsMailbox, BsPerson } from 'react-icons/bs'
import { RiParentFill } from 'react-icons/ri'
import { BsCurrencyDollar, BsShield, BsBarChartSteps } from 'react-icons/bs';
import product1 from './product1.jpg';
import product2 from './product2.jpg';
import product3 from './product3.jpg';
import product4 from './product4.jpg';

export const sidebarMenus = [
  // {
  //   title: 'Dashboard',
  //   path:`dashboard`,
  //   icon: <MdOutlineDashboard />,
  //   links: [],
  // },

  // {
  //   title: 'PMB',
  //   path:`pmb`,
  //   icon: <FaWpforms />,
  //   links: [
  //     {
  //       name: 'Tahapan PMB',
  //       path:`pmb/tahapan-pmb`,
  //       icon: <FaWpforms />,
  //       step: "register_payment"
  //     },
  //     {
  //       name: 'Form Data Murid',
  //       path:`pmb/form-data-murid`,
  //       icon: <FaWpforms />,
  //       step: "form_murid"
  //     },
  //     {
  //       name: 'Form Data Orang Tua',
  //       path:`pmb/form-data-orang-tua`,
  //       icon: <FaWpforms />,
  //       step: "form_ortu_identitas"
  //     },
  //     {
  //       name: 'Form Pernyataan',
  //       path:`pmb/form-pernyataan`,
  //       icon: <FaWpforms />,
  //       step: "form_ortu_pernyataan"
  //     },
  //     {
  //       name: 'Berkas Pendaftaran',
  //       path:`pmb/berkas-pendaftaran`,
  //       icon: <FaWpforms />,
  //       step: "form_berkas"
  //     },
  //   ],
  // },
  {
    title: 'Tahapan PMB',
    path:`pmb/tahapan-pmb`,
    icon: <BsBarChartSteps />,
    step: "register_payment",
    links: []
  },
  {
    title: 'Form Data Murid',
    path:`pmb/form-data-murid`,
    icon: <FaChild />,
    step: "form_murid",
    links: []
  },
  {
    title: 'Form Data Orang Tua',
    path:`pmb/form-data-orang-tua`,
    icon: <RiParentFill />,
    step: "form_ortu_identitas",
    links: []
  },
  {
    title: 'Form Pernyataan',
    path:`pmb/form-pernyataan`,
    icon: <FaFileSignature />,
    step: "form_ortu_pernyataan",
    links: []
  },
  {
    title: 'Berkas Pendaftaran',
    path:`pmb/berkas-pendaftaran`,
    icon: <AiFillFileText />,
    step: "form_berkas",
    links: []
  },

  // {
  //   title: 'Keuangan',
  //   path:`keuangan`,
  //   icon: <AiOutlineBarChart />,
  //   links: [
  //     {
  //       name: 'Submenu 1',
  //       path:`keuangan-1`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 2',
  //       path:`keuangan-2`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 3',
  //       path:`keuangan-3`,
  //       icon: <FaWpforms />,
  //     },
  //   ],
  // },

  // {
  //   title: 'KBM',
  //   path:`kbm`,
  //   icon: <AiOutlineSchedule />,
  //   links: [
  //     {
  //       name: 'Submenu 1',
  //       path:`kbm-1`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 2',
  //       path:`kbm-2`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 3',
  //       path:`kbm-3`,
  //       icon: <FaWpforms />,
  //     },
  //   ],
  // },

  // {
  //   title: 'Administrasi',
  //   path:`administrasi`,
  //   icon: <CgUserList />,
  //   links: [
  //     {
  //       name: 'Submenu 1',
  //       path:`administrasi-1`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 2',
  //       path:`administrasi-2`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 3',
  //       path:`administrasi-3`,
  //       icon: <FaWpforms />,
  //     },
  //   ],
  // },

  // {
  //   title: 'Syarat',
  //   path:`syarat`,
  //   icon: <BsCardText />,
  //   links: [
  //     {
  //       name: 'Submenu 1',
  //       path:`syarat-1`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 2',
  //       path:`syarat-2`,
  //       icon: <FaWpforms />,
  //     },
  //     {
  //       name: 'Submenu 3',
  //       path:`syarat-3`,
  //       icon: <FaWpforms />,
  //     },
  //   ],
  // },
];

export const sidebarMenusAdmin = [
  {
    title: 'Dashboard',
    path: `dashboard`,
    icon: <AiOutlineBarChart />,
    links: []
  },
  {
    title: 'Admin PMB',
    path: `admin/pmb`,
    icon: <AiOutlineBarChart />,
    links: [
      {
        name: 'Setup PMB',
        path: `admin/setup-pmb`,
        icon: <FaWpforms />,
      },
      {
        name: 'Konfirmasi Pembayaran',
        path: `admin/konfirmasi-pembayaran`,
        icon: <FaWpforms />,
      },
      {
        name: 'Hasil Tes',
        path: `admin/hasil-tes`,
        icon: <FaWpforms />,
      },
      // {
      //   name: 'Preview',
      //   path: `admin/preview`,
      //   icon: <FaWpforms />,
      // },
    ],
  },
  {
    title: 'Admin Keuangan',
    path: `admin/keuangan`,
    icon: <AiOutlineBarChart />,
    links: [
      {
        name: 'Cost Center',
        path: `admin/list-cost-center`,
        icon: <FaWpforms />,
      },
      {
        name: 'Tipe Transaksi',
        path: `admin/list-tipe-transaksi`,
        icon: <FaWpforms />,
      },
      {
        name: 'Bank',
        path: `admin/list-bank`,
        icon: <FaWpforms />,
      },
      {
        name: 'Biaya Pendidikan',
        path: `admin/list-biaya-pendidikan`,
        icon: <FaWpforms />,
      },
      {
        name: 'Biaya Operasional',
        path: `admin/list-biaya-operasional`,
        icon: <FaWpforms />,
      },
    ],
  },
  {
    title: 'Admin KBM',
    path: `admin/kbm`,
    icon: <AiOutlineBarChart />,
    links: [
      {
        name: 'Kelompok Mapel',
        path: `admin/list-kelompok-mapel`,
        icon: <FaWpforms />,
      },
      {
        name: 'Kelas',
        path: `admin/list-kelas`,
        icon: <FaWpforms />,
      },
      {
        name: 'Semester',
        path: `admin/list-semester`,
        icon: <FaWpforms />,
      },
      {
        name: 'Kurikulum',
        path: `admin/list-kurikulum`,
        icon: <FaWpforms />,
      },
      {
        name: 'Mata Pelajaran',
        path: `admin/list-mata-pelajaran`,
        icon: <FaWpforms />,
      },
      {
        name: 'Jadwal Mapel',
        path: `admin/list-jadwal-mata-pelajaran`,
        icon: <FaWpforms />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'default-theme',
    color: '#8F0D1E',
  },
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsPerson />,
    title: 'Profil Saya',
    desc: 'Administrator',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsMailbox />,
    title: 'Pesan',
    desc: 'Pesan & Email',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
];


export const notifData = [
  {
    image: product1,
    message: 'Notif 1',
    desc: 'Deskripsi 1',
    time: '9:08 AM',
  },
  {
    image: product2,
    message: 'Notif 2',
    desc: 'Deskripsi 2',
    time: '11:56 AM',
  },
  {
    image: product3,
    message: 'Notif 3',
    desc: 'Deskripsi 3',
    time: '4:39 AM',
  },
  {
    image: product4,
    message: 'Notif 4',
    desc: 'Deskripsi 4',
    time: '1:12 AM',
  },
];


export const dropdownData = {
    "statusAnak":[
        { "id": "1", "text": "Kandung" }, 
        { "id": "2", "text": "Tiri" },
        { "id": "3", "text": "Adopsi" },
        { "id": "4", "text": "Lainnya" }
    ],
    "tinggalBersama":[
      { "id": "1", "text": "Orang Tua Kandung" }, 
      { "id": "2", "text": "Nenek dan Kakek" },
      { "id": "3", "text": "Paman dan Bibi" },
      { "id": "4", "text": "Lainnya" }
    ],
    "transportasiSekolah":[
      { "id": "1", "text": "Sepeda" }, 
      { "id": "2", "text": "Motor" },
      { "id": "3", "text": "Mobil" },
      { "id": "4", "text": "Lainnya" }
    ],
    "pendidikanTerakhir":[
      { "id": "1", "text": "SMA" }, 
      { "id": "2", "text": "S1 - Sarjana" },
      { "id": "3", "text": "S2 - Magister" },
      { "id": "4", "text": "S3 - Doktor" },
      { "id": "5", "text": "Lainnya" }
    ],
    "nominalWakaf":[
      { "id": "1", "text": "500000", value: 500000 }, 
      { "id": "2", "text": "1000000", value: 1000000 },
      { "id": "3", "text": "2000000", value: 2000000 },
      { "id": "4", "text": "5000000", value: 5000000 },
      { "id": "5", "text": "Lainnya", value: 0 }
    ],
    "nominalInfak":[
      { "id": "1", "text": "50000", value: 50000 }, 
      { "id": "2", "text": "100000", value: 100000 },
      { "id": "3", "text": "150000", value: 150000 },
      { "id": "4", "text": "200000", value: 200000 },
      { "id": "5", "text": "Lainnya", value: 0 }
    ],
    "jenisBayar":[
      { "id": "1", "text": "Cash", value: "Cash" }, 
      { "id": "2", "text": "Transfer", value: "Transfer" },
    ],
    "statusBukti":[
      { "id": "1", "text": "Belum Lunas", value: "Belum Lunas" }, 
      { "id": "2", "text": "Lunas", value: "Lunas" },
    ],
    "status":[
      { "id": "1", "text": "LULUS", value: "LULUS" }, 
      { "id": "2", "text": "TIDAK LULUS", value: "TIDAK LULUS" },
    ],
  }

  const timeStamp = Math.ceil((new Date().getTime()));

  export const groupsData = {
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
            id: timeStamp,
            tahun_ajaran_id: null,
            nama: "Nama Item",
            kelas: null,
            biaya: 0,
            untuk_registrasi: false,
            is_enabled: false
          }
        ],
      }
    ]
    
  }



  // const commands = [
  //   { buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  //   { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  //   { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } },
  //   { buttonOption: {iconCss: ' e-icons e-folder', content: 'Arsip', cssClass: 'e-outline', id: 'arsip'}},
  //   { buttonOption: {iconCss: ' e-icons e-check', content: 'Publish', cssClass: 'e-outline', id: 'publish'}},
  //   { buttonOption: {iconCss: ' e-icons e-update', content: 'Update', cssClass: 'e-outline', id: 'update'}},
  // ];