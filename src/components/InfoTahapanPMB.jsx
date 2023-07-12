import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRegCheckCircle,
  FaRegUserCircle,
  FaRegTimesCircle,
  FaRegPauseCircle,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import {
  MdOutlinePayments,
  MdPayment,
  MdOutlineFactCheck,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";

const InfoTahapanPMB = ({ status, title, step, details, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-lg p-5 text-base cursor-pointer  
      ${
        status == "Belum Mulai"
          ? "pmb-belum-mulai"
          : status == "Dalam Proses"
          ? "pmb-dalam-proses"
          : status == "Berhasil"
          ? "pmb-berhasil"
          : status == "gagal"
          ? "pmb-gagal"
          : ""
      }`}
    >
      <motion.div layout="position" className={`flex items-center`}>
        {step == 1 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <FaRegUserCircle className={`p-3  text-5xl text-white`} />
          </span>
        )}
        {step == 2 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <MdPayment className={`p-3 text-5xl text-white`} />
          </span>
        )}
        {step == 3 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <BiEdit className={`p-3 text-5xl text-white`} />
          </span>
        )}
        {step == 4 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <MdOutlineFactCheck className={`p-3 text-5xl text-white`} />
          </span>
        )}
        {step == 5 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <GoChecklist className={`p-3 text-5xl text-white`} />
          </span>
        )}
        {step == 6 && (
          <span className={`step ml-0.5 mr-4 rounded-full`}>
            <MdOutlinePayments className={`p-3 text-5xl text-white`} />
          </span>
        )}
        <div>
          <h5>
            {step}
            {step == 1 && ". Pendaftaran Akun"}
            {step == 2 && ". Pembayaran Pendaftaran"}
            {step == 3 && ". Pengisian Formulir"}
            {step == 4 && ". Hasil Tes"}
            {step == 5 && ". Daftar Ulang"}
            {step == 6 && ". Pembayaran Biaya Pendidikan"}
          </h5>
          <p className="flex text-sm">
            {status}
            {status == "Belum Mulai" && (
              <FaRegPauseCircle className="ml-2 text-xl" />
            )}
            {status == "Dalam Proses" && (
              <FaRegArrowAltCircleRight className="ml-2 text-xl" />
            )}
            {status == "Berhasil" && (
              <FaRegCheckCircle className="ml-2 text-xl" />
            )}
            {status == "Gagal" && <FaRegTimesCircle className="ml-2 text-xl" />}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoTahapanPMB;
