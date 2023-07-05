import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import logoSaim from "../../data/logo-saim.png";
import assalamualaikum from "../../data/assalamualaikum.png";

import { useStateContext } from "../../contexts/ContextProvider";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/register";

const Register = () => {
  const { resendEmailVerification } = useAuth();
  const { isLoading, setIsLoading } = useStateContext();

  const userRef = useRef();
  const phoneRef = useRef();
  const jumlahanakRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [jumlahanak, setJumlahAnak] = useState("");
  const [validJumlahAnak, setValidJumlahAnak] = useState(false);
  const [jumlahAnakFocus, setJumlahAnakFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [errMsgName, setErrMsgName] = useState("");
  const [errMsgPhone, setErrMsgPhone] = useState("");
  const [errMsgJumlahAnak, setErrMsgJumlahAnak] = useState("");
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPwd, setErrMsgPwd] = useState("");
  const [errMsgMatchPwd, setErrMsgMatchPwd] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    phoneRef.current.focus();
  }, []);

  // useEffect(() => {
  //   jumlahanakRef.current.focus();
  // }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  // useEffect(() => {
  //   setValidJumlahAnak(ONLY_NUMBER_REGEX.test(jumlahanak));
  // }, [jumlahanak]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, phone, jumlahanak, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(
      JSON.stringify({
        nama_lengkap: user,
        nomor_ponsel: phone,
        // jumlah_anak: jumlahanak,
        email: email,
        password: pwd,
        // password_confirmation: matchPwd,
      })
    );
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/user/parent",
        {
          fullname: user,
          phone: phone,
          email: email,
          // jumlah_anak: jumlahanak,
          password: pwd,
          // password_confirmation: matchPwd,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPhone("");
      setJumlahAnak("");
      setEmail("");
      setEmailVerify(email);
      setPwd("");
      setMatchPwd("");
      setIsLoading(false);
      localStorage.setItem("EMAIL", JSON.stringify(email));
    } catch (err) {
      console.error("ERROR === ", err?.response?.data.errors);
      const errMsg = err?.response?.data.errors;
      setErrMsg(errMsg);
      errRef.current.focus();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-end min-h-screen lg:flex bg-krem">
        <section
          className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2"
          style={{ background: "#E6E6E6" }}
        >
          <img
            className="m-7 lg:h-96 lg:w-96 sm:w-56 sm:h-56 xs:w-1/3 xs:h-1/3"
            src={logoSaim}
            alt="SAIM"
          />

          <p className="absolute text-sm text-center xs:invisible lg:visible bottom-7 mt-7 text-merah">
            Copyright 2022. PT. Nafisha Universal Network
          </p>
        </section>

        <section className="flex flex-wrap justify-center lg:items-center lg:w-1/2 bg-putih">
          <div className="relative block w-full mt-6 text-center">
            <img
              className="m-auto mb-3 h-200 w-200 xs:hidden lg:block"
              src={assalamualaikum}
              alt="Assalamuálaikum"
            />
            <h4>
              Selamat Datang <br />
              di Web Penerimaan Murid Baru
            </h4>
            {!success ? (
              <h5 className=" text-merah">
                Silahkan isi form dibawah ini untuk memulai
              </h5>
            ) : (
              <></>
            )}

            {success ? (
              <section className="rounded-lg bg-krem p-7 m-7">
                <div>
                  <h2 className="text-center">Verifikasi Email Anda</h2>
                  <br />
                  <p>
                    Kami telah mengirimkan email verifikasi ke{" "}
                    <span className="font-bold text-merah">{emailVerify}</span>
                  </p>
                  <br />
                  <p>
                    Tidak menerima email? Periksa folder spam atau promosi Anda!
                  </p>
                  <p>
                    Tidak menerima email? Periksa folder spam atau promosi Anda
                    atau{" "}
                    <a
                      onClick={resendEmailVerification}
                      className="font-bold cursor-pointer text-merah"
                    >
                      Kirim ulang verifikasi
                    </a>
                    .
                  </p>
                </div>
                <Link to="/login" className="btn-merah">
                  Lewatkan ke{" "}
                  <HiOutlineArrowNarrowRight className="mx-2 text-xl" /> Log In{" "}
                </Link>
              </section>
            ) : (
              <>
                <h2 className="text-center mt-7">Pendaftaran Akun</h2>
              </>
            )}
          </div>

          {!success && (
            <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">
              {/* NAMA LENGKAP */}
              <div className="relative block w-full lg:w-480">
                <label htmlFor="username" className="flex mt-4 mb-1 form-label">
                  Nama Lengkap
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="on"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validName
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validName || !user
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>Minimal 4 karakter.</span>
                </p>
                <div
                  ref={errRef}
                  className={
                    errMsgName
                      ? "errmsg px-4 py-3 mt-3 mb-3 mb-4 rounded-md text-merah bg-red-100 xl:w-480"
                      : "hidden"
                  }
                  aria-live="assertive"
                  role="alert"
                >
                  {errMsgName}
                </div>
              </div>

              {/* NOMOR TELEPON */}
              <div className="relative block xl:w-480">
                <label htmlFor="phone" className="flex mt-4 mb-1 form-label">
                  No. Telepon
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="text"
                  id="phone"
                  ref={phoneRef}
                  autoComplete="on"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                  aria-invalid={validPhone ? "false" : "true"}
                  aria-describedby="phonenote"
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validPhone
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validPhone || !phone
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="phonenote"
                  className={
                    phoneFocus && phone && !validPhone
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>Minimal 9 dan maksimal 13 angka.</span>
                </p>
              </div>

              {/* EMAIL */}
              <div className="relative block xl:w-480">
                <label htmlFor="email" className="flex mt-4 mb-1 form-label">
                  E-mail
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validEmail
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validEmail || !email
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>Format Email.</span>
                </p>
              </div>

              {/* JUMLAH ANAK */}
              {/* <div className="relative block xl:w-480">
                <label
                  htmlFor="jumlahanak"
                  className="flex mt-4 mb-1 form-label"
                >
                  Jumlah Anak yang Ingin Didaftarkan
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="number"
                  id="jumlahanak"
                  ref={jumlahanakRef}
                  autoComplete="on"
                  onChange={(e) => setJumlahAnak(e.target.value)}
                  value={jumlahanak}
                  required
                  aria-invalid={validJumlahAnak ? "false" : "true"}
                  aria-describedby="jumlahanaknote"
                  onFocus={() => setJumlahAnakFocus(true)}
                  onBlur={() => setJumlahAnakFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validJumlahAnak
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validJumlahAnak || !jumlahanak
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="jumlahanaknote"
                  className={
                    jumlahAnakFocus && jumlahanak && !validJumlahAnak
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>Harus berupa angka positif.</span>
                </p>
              </div> */}

              <div className="relative block xl:w-480">
                <label htmlFor="password" className="flex mt-4 mb-1 form-label">
                  Kata Sandi
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  // value={"B!5millah"}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validPwd
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validPwd || !pwd
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>
                    8-24 karakter termasuk huruf besar, kecil, angka, karakter
                    spesial.
                  </span>
                </p>
              </div>

              <div className="relative block xl:w-480">
                <label
                  htmlFor="confirm_pwd"
                  className="flex mt-4 mb-1 form-label"
                >
                  Ulangi Kata Sandi
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  // value={"B!5millah"}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <FaCheckCircle
                  className={
                    validMatch && matchPwd
                      ? "valid absolute top-10 right-2 text-green-600"
                      : "hidden"
                  }
                />
                <FaTimesCircle
                  className={
                    validMatch || !matchPwd
                      ? "hidden"
                      : "invalid absolute top-10 right-2 text-red-600"
                  }
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? "instructions italic text-xs flex items-center py-1"
                      : "hidden"
                  }
                >
                  <FaInfoCircle className="mr-1" />
                  <span>Harus cocok dengan password sebelumnya.</span>
                </p>
              </div>

              <div
                ref={errRef}
                className={
                  errMsg
                    ? "errmsg px-4 py-3 mt-3 mb-3 mb-4 rounded-md text-merah text-sm bg-red-100 xl:w-480 relative"
                    : "hidden"
                }
                aria-live="assertive"
                role="alert"
              >
                {/* <button className="flex items-center mt-3"><FaTimesCircle /> <span className="ml-1">Tutup</span></button> */}
                {Object.entries(errMsg).map(([, fieldErrors]) =>
                  fieldErrors.map((fieldError, index) => (
                    <p key={index} className="flex gap-2">
                      <FaTimesCircle className="my-1" /> {fieldError}
                    </p>
                  ))
                )}
              </div>

              <button
                disabled={
                  !validName ||
                  !validPhone ||
                  !validEmail ||
                  !validPwd ||
                  !validMatch
                    ? true
                    : false
                }
                className="flex justify-center w-full py-3 my-6 mr-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md disabled:bg-krem disabled:text-abu bg-merah px-7 hover:bg-gelap hover:shadow-lg focus:bg-merah focus:shadow-lg focus:outline-none focus:ring-0 active:bg-merah active:shadow-lg"
              >
                Daftar{" "}
                {isLoading ? (
                  <CgSpinner className="ml-2 text-lg animate-spin" />
                ) : (
                  ""
                )}
              </button>

              {/* onClick={() => setSuccess(true)} */}
              <Link to={"/login"} className="block mb-16">
                Sudah mendaftar?{" "}
                <span className="ml-1 underline line text-merah">Log In</span>
              </Link>

              {/* <p className="text-sm text-center lg:hidden mt-7 text-merah">Copyright 2022. PT. Nafisha Universal Network</p> */}
            </form>
          )}
        </section>
      </div>
    </>
  );
};

export default Register;
