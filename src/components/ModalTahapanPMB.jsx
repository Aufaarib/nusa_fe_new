import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCheckCircle,
  FaRegUserCircle,
  FaRegTimesCircle,
  FaRegPauseCircle,
  FaRegArrowAltCircleRight,
  FaTimesCircle,
} from "react-icons/fa";
import {
  MdOutlinePayments,
  MdPayment,
  MdOutlineFactCheck,
} from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import useAuth from "../hooks/useAuth";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import {
  getAdmissionRegistrationApplicant,
  getAdmissionRegistrationParentsAyah,
  getAdmissionRegistrationParentsIbu,
  getAdmissionRegistrationParentsWali,
} from "../api/Registrasi";

const ModalTahapanPMB = ({
  status,
  title,
  step,
  details,
  onClick,
  selected,
  setSelected,
}) => {
  const { auth } = useAuth();
  const verified = "verified";
  const {
    daftarUlangAgreement,
    resendEmailVerification,
    paymentAgreement,
    successMsgSendVerify,
    errMsgSendVerify,
    isLoading,
  } = useStateContext();
  const Nama = localStorage.getItem("NAMA");

  return (
    <>
      <AnimatePresence>
        {selected && (
          <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 top-0 left-0 overflow-hidden bg-black/50`}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 top-0 left-0 z-50 flex overflow-y-scroll">
            <motion.div
              layoutId={step}
              className={`relative xs:w-9/12 md:w-6/12 xl:w-5/12 2xl:w-4/12 overflow-hidden rounded-lg shadow-2xl cursor-default m-auto
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
              <motion.div
                layout="position"
                className={`flex items-center text-base p-7 realative`}
              >
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

                <motion.div layout="position">
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
                    {status == "Gagal" && (
                      <FaRegTimesCircle className="ml-2 text-xl" />
                    )}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setSelected({})}
                  className="absolute cursor-pointer top-4 right-4"
                >
                  <FaRegTimesCircle className="text-2xl text-merah" />
                </motion.div>
              </motion.div>

              <motion.div
                className={` bg-white text-sm text-black h-0`}
                transition={{ delay: 0.5 }}
                initial={{ height: "0px" }}
                animate={{ height: "auto" }}
                exit={{ height: "0px", transition: { delay: 0 } }}
              >
                <div className="p-7">
                  <h4>
                    {step == 1 && "Pendaftaran Akun"}
                    {step == 2 && "Pembayaran Pendaftaran"}
                    {step == 3 && "Pengisian Formulir"}
                    {step == 4 && "Hasil Tes"}
                    {step == 5 && "Daftar Ulang"}
                    {step == 6 && "Pembayaran Biaya Pendidikan"}
                  </h4>
                  <br />

                  {!verified && (
                    <section className="mb-4 bg-red-100 rounded-lg p-7">
                      <div>
                        <h3 className="text-center capitalize">
                          Lakukan Verifikasi Email Terlebih Dahulu
                        </h3>
                        <br />
                        <p>
                          Kami telah mengirimkan email verifikasi ke{" "}
                          <span className="font-bold text-merah">
                            {auth.email}
                          </span>
                        </p>
                        <br />
                        <p>
                          Tidak menerima email? Periksa folder spam atau promosi
                          Anda atau:
                        </p>
                        {/* ERROR MSG */}
                        <div
                          className={
                            errMsgSendVerify
                              ? "px-4 py-3 mt-3 rounded-md text-merah text-sm bg-red-100 relative"
                              : "hidden"
                          }
                          aria-live="assertive"
                          role="alert"
                        >
                          {Object.entries(errMsgSendVerify).map(
                            ([, fieldErrors]) =>
                              fieldErrors.map((fieldError, index) => (
                                <p key={index} className="flex gap-2">
                                  <FaTimesCircle className="my-1" />{" "}
                                  {fieldError}
                                </p>
                              ))
                          )}
                        </div>
                        {/* SUCCESS MSG */}
                        <div
                          className={
                            successMsgSendVerify
                              ? "px-4 py-3 mt-3 rounded-md text-green-700 text-sm bg-green-100 relative"
                              : "hidden"
                          }
                          aria-live="assertive"
                          role="alert"
                        >
                          <p className="flex gap-2">
                            <FaRegCheckCircle className="my-1" />
                            {successMsgSendVerify}
                          </p>
                        </div>
                        <Link
                          onClick={resendEmailVerification}
                          className="btn-merah"
                        >
                          Kirim ulang verifikasi{" "}
                          {isLoading ? (
                            <CgSpinner className="ml-2 text-xl animate-spin" />
                          ) : (
                            ""
                          )}
                        </Link>
                      </div>
                    </section>
                  )}

                  {status == "Belum Mulai" && <p>{details.message}</p>}
                  {step == 1 && status == "Berhasil" && (
                    <p>{details.message}</p>
                  )}
                  {step == 3 && status == "Dalam Proses" && (
                    <p>{details.message}</p>
                  )}
                  {step == 4 && status == "Dalam Proses" && (
                    <p>{details.message}</p>
                  )}
                  {step == 5 && status == "Berhasil" && (
                    <p>{details.message}</p>
                  )}

                  {step == 1 && status !== "Belum Mulai" && (
                    <>
                      {status == "Berhasil" && (
                        <>
                          <p>Pendaftaran Akun Berhasil</p>
                        </>
                      )}
                    </>
                  )}

                  {step == 2 && status !== "Belum Mulai" && (
                    <>
                      {status == "Berhasil" && (
                        <>
                          <p>
                            Bagi para Ayah/Bunda yang sudah melakukan
                            registrasi, maka tahapan selanjutnya adalah
                            Ayah/Bunda bisa melakukan pembayaran pendaftaran
                            dengan ketentuan sebagai berikut.
                          </p>
                          <br />
                          <p>
                            <strong>Informasi Akun:</strong>
                          </p>
                          <br />
                        </>
                      )}

                      <p>
                        Nama Lengkap :{" "}
                        <strong className="capitalize">{Nama}</strong>
                        {/* <br /> */}
                        {/* Status Pembayaran Registrasi Calon Murid :{" "} */}
                        <strong>
                          {status == "Dalam Proses" ? (
                            <span className="text-red-600 uppercase">
                              Menunggu Pembayaran
                            </span>
                          ) : (
                            <span className="text-green-600 uppercase">
                              {/* {details.status_pembayaran} */}
                            </span>
                          )}
                        </strong>
                        {status == "Berhasil" && (
                          <>
                            <br />
                            <hr />
                            Batas Akhir Pembayaran :
                            {/* {currencyFormat(details.tagihan)}  */}{" "}
                            {/* x {details.jumlah_anak}  */}
                            {/* Anak */}
                            <hr />
                            <strong>
                              Total Tagihan :{" "}
                              {/* {currencyFormat(details.total_tagihan)} */}
                            </strong>
                            <hr />
                            <br />
                            Silahkan lakukan transfer sebesar{" "}
                            <strong>
                              {/* {currencyFormat(details.total_tagihan)} */}
                            </strong>{" "}
                            ke rekening berikut :
                            <br />
                            {/* <strong>{details.banks[0].nama_pemilik}</strong> */}
                            Bank DKI Syariah cabang Pondok Indah
                            <br />
                            Nomor Rekening :<strong> 71021590003</strong>
                            <br />
                            <br />
                            Untuk informasi lebih lanjut dan konfirmasi setelah
                            melakukan transfer, silahkan hubungi No Whatsapp
                            <strong> 08129801108 </strong> (Ibu Hanny).
                            <Link
                              to={"/pmb/berkas-pembayaran"}
                              className="mt-7 btn-merah"
                            >
                              Upload Bukti Pembayaran Registrasi
                            </Link>
                          </>
                        )}
                      </p>
                    </>
                  )}

                  {/* pengisian formulir */}
                  {step == 3 && status == "Berhasil" && (
                    <div>
                      <p>
                        Alhamdulillah pengisian formulir data Calon Siswa dan
                        Keluarga telah berhasil.
                      </p>
                      <br />
                      <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                    </div>
                  )}

                  {step == 3 && status !== "Berhasil" && (
                    <div>
                      <p>Pengisian Form Belum Lengkap</p>
                      <br />
                      <p>Silahkan Lengkapi Pengisian Form.</p>
                    </div>
                  )}

                  {step == 4 && status == "Berhasil" ? (
                    // details.students.map((item, i) => (
                    <div
                    // key={i}
                    >
                      <p>
                        Alhamdulillah Putra/ Putri Ayah/ Bunda telah melakukan
                        rangkai tes dengan hasil sbb:
                      </p>
                      <br />
                      <p>
                        Nama Lengkap :{" "}
                        <strong className="capitalize">
                          {/* {item.nama_depan} {item.nama_tengah}{" "}
                          {item.nama_belakang}{" "} */}
                        </strong>
                      </p>
                      <p>
                        Kategori:
                        {/* <strong>{item.hasil_test.kategori}</strong> */}
                      </p>
                      <p>
                        Hasil Tes:{" "}
                        {/* <strong>{item.hasil_test.hasil_akhir}</strong> */}
                      </p>
                      <p>
                        Lampiran Tes:{" "}
                        <a
                          // href={item.hasil_test.pdf}
                          className="break-all"
                          target="_blank"
                        >
                          {/* {item.hasil_test.pdf} */}
                        </a>
                      </p>
                      <br />
                      <p>Silahkan melanjutkan ke tahapan berikutnya.</p>
                    </div>
                  ) : (
                    // ))
                    ""
                  )}

                  {step == 5 && status == "Berhasil" && (
                    <div>
                      <p>
                        Alhamdulillah, Ananda telah lulus test penerimaan calon
                        murid baru SAIM. Selamat ya Ayah/ Bunda.
                      </p>
                      <br />
                      <p>
                        Untuk proses selanjutnya, klik link persetujuan berikut:
                      </p>
                      {/* ERROR MSG */}
                      <div
                        className={
                          errMsgSendVerify
                            ? "px-4 py-3 mt-3 rounded-md text-merah text-sm bg-red-100 relative"
                            : "hidden"
                        }
                        aria-live="assertive"
                        role="alert"
                      >
                        {Object.entries(errMsgSendVerify).map(
                          ([, fieldErrors]) =>
                            fieldErrors.map((fieldError, index) => (
                              <p key={index} className="flex gap-2">
                                <FaTimesCircle className="my-1" /> {fieldError}
                              </p>
                            ))
                        )}
                      </div>
                      {/* SUCCESS MSG */}
                      <div
                        className={
                          successMsgSendVerify
                            ? "px-4 py-3 mt-3 rounded-md text-green-700 text-sm bg-green-100 relative"
                            : "hidden"
                        }
                        aria-live="assertive"
                        role="alert"
                      >
                        <p className="flex gap-2">
                          <FaRegCheckCircle className="my-1" />
                          {successMsgSendVerify}
                        </p>
                      </div>
                      <Link
                        onClick={daftarUlangAgreement}
                        className="mt-3 btn-merah"
                      >
                        Persetujuan Daftar Ulang
                      </Link>
                    </div>
                  )}

                  {step == 6 && status == "Berhasil" && (
                    <div>
                      <p>Ini merupakan notifikasi pembayaran otomatis</p>
                      <br />
                      <p>
                        Assalamualaikum Warrahmatullahi Wabarakatuh
                        Bismillahirrahmanirrahim Semoga Ayah/Bunda senantiasa
                        dalam lindungan Allah SWT.
                      </p>
                      <br />
                      <p>
                        Kami dari bagian keuangan Sekolah Adab Insan Mulia,
                        menyampaikan informasi kewajiban keuangan ananda
                      </p>
                      {/* <hr className="my-1" />
                      <div>
                        {details.education_fees.map((item, i) => (
                          <div className="grid grid-cols-3 gap-1">
                            <div key={i} className="break-all">
                              {item.nama}
                            </div>
                            <div>x {details.jumlah_anak_lulus} Anak</div>
                            <div key={i} className="break-all">
                              {currencyFormat(item.biaya)}
                            </div>
                          </div>
                        ))}
                      </div> */}
                      <div className="grid grid-cols-3 gap-1">
                        <p className="font-bold">NIS:</p>
                        <p className="font-bold">
                          {/* {currencyFormat(details.total_biaya)} */}
                        </p>
                        <p className="font-bold">
                          {/* x {details.jumlah_anak_lulus} Anak */}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <p className="font-bold">Nama Siswa:</p>
                        <p className="font-bold">
                          {/* {currencyFormat(
                            details.total_biaya * details.jumlah_anak_lulus
                          )} */}
                        </p>
                      </div>
                      <br />
                      <p>Berikut rincian kewajiban keuangan ananda</p>
                      ***detail_tagihan_siswa***
                      <p className="font-bold">Total Rp</p>
                      <p className="font-bold">
                        {/* {currencyFormat(details.total_biaya)} */}
                      </p>
                      <br />
                      <p>
                        Mohon Ayah/Bunda dapat segera menyelesaikan kewajiban
                        keuangannya. Semoga Allah SWT mudahkan dan lancarkan
                        rezekinya.
                      </p>
                      <br />
                      Pembayaran dapat dilakukan dengan cara:
                      <br />
                      Transfer ke :
                      <br />
                      {/* <strong>{details.banks[0].nama_pemilik}</strong> */}
                      Bank DKI Syariah cabang Pondok Indah
                      <br />
                      Nomor Rekening : <strong> 71021590003 </strong>
                      <br />
                      Atas Nama : <strong> Yayasan Adab Insan Mulia </strong>
                      <br />
                      <br />
                      Untuk informasi lebih lanjut, silahkan hubungi No Whatsapp
                      <strong> 08129801108 </strong>
                      (Ibu Hanny).
                      <Link
                        to={"/pmb/berkas-pembayaran"}
                        className="mt-7 btn-merah"
                      >
                        Upload Bukti Pembayaran Pendidikan
                      </Link>
                      {/* ERROR MSG */}
                      {/* <div
                        className={
                          errMsgSendVerify
                            ? "px-4 py-3 mt-3 rounded-md text-merah text-sm bg-red-100 relative"
                            : "hidden"
                        }
                        aria-live="assertive"
                        role="alert"
                      >
                        {Object.entries(errMsgSendVerify).map(
                          ([, fieldErrors]) =>
                            fieldErrors.map((fieldError, index) => (
                              <p key={index} className="flex gap-2">
                                <FaTimesCircle className="my-1" /> {fieldError}
                              </p>
                            ))
                        )} */}
                      {/* </div> */}
                      {/* SUCCESS MSG */}
                      {/* <div
                        className={
                          successMsgSendVerify
                            ? "px-4 py-3 mt-3 rounded-md text-green-700 text-sm bg-green-100 relative"
                            : "hidden"
                        }
                        aria-live="assertive"
                        role="alert"
                      >
                        <p className="flex gap-2">
                          <FaRegCheckCircle className="my-1" />
                          {successMsgSendVerify}
                        </p>
                      </div> */}
                      {/* <Link
                        onClick={paymentAgreement}
                        className="mt-3 btn-merah"
                      >
                        Persetujuan Pembayaran
                      </Link> */}
                    </div>
                  )}

                  {step == 6 && status == "Berhasil" && !verified && (
                    <>
                      <p>
                        Ayah/ Bunda, Alhamdulillah semua rangkaian administrasi
                        proses pendaftaran murid baru sudah diselesaikan dengan
                        sudah dilakukan pembayaran biaya pendidikannya.
                      </p>
                      <br />
                      <p>
                        Untuk informasi selanjutnya ayah/bunda akan kami
                        informasikan kembali.
                      </p>
                    </>
                  )}

                  <br />
                  <br />
                  <p>
                    Terimakasih,
                    <br />
                    <strong>Tim PMB SAIM</strong>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalTahapanPMB;
