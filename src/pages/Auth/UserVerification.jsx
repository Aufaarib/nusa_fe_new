import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import logoSaim from "../../data/logo-saim.png";
import assalamualaikum from "../../data/assalamualaikum.png";

import { useStateContext } from "../../contexts/ContextProvider";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";
import { validateEmail } from "../../api/Registrasi";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z]{3}/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
const ONLY_NUMBER_REGEX = /^[0-9\b]+$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/register";

const UserVerification = () => {
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
  const [otp, setOtp] = useState(false);
  const [sts, setSts] = useState("");
  const location = useLocation();

  const verifiedEmail = () => {
    validateEmail(setSts, otp);
  };

  //   useEffect(() => {
  //     userRef.current.focus();
  //   }, []);

  //   useEffect(() => {
  //     phoneRef.current.focus();
  //   }, []);

  // useEffect(() => {
  //   jumlahanakRef.current.focus();
  // }, []);

  //   useEffect(() => {
  //     emailRef.current.focus();
  //   }, []);

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
    console.log({
      nama_lengkap: user,
      nomor_ponsel: phone,
      // jumlah_anak: jumlahanak,
      email: email,
      password: pwd,
      password_confirmation: matchPwd,
    });
    try {
      axios
        .post(process.env.REACT_APP_BASE_URL + "/user/parent", {
          fullname: user,
          phone: phone,
          email: email,
          // jumlah_anak: jumlahanak,
          password: pwd,
          password_confirmation: matchPwd,
        })
        .then((res) => {
          console.log(res?.headers?.authorization);
          setSuccess(true);
          localStorage.setItem("TOKEN", res?.headers?.authorization);
          // setUser("");
          // setPhone("");
          // setJumlahAnak("");
          // setEmail("");
          setEmailVerify(email);
          // setPwd("");
          // setMatchPwd("");
          setIsLoading(false);
        });
    } catch (err) {
      // console.error("ERROR === ", err?.response?.data.errors);
      // const errMsg = err?.response?.data.errors;
      // setErrMsg(errMsg);
      // errRef.current.focus();
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
            <h5 className=" text-merah">
              Silahkan isi form dibawah ini untuk memulai
            </h5>
            <section className="rounded-lg bg-krem p-7 m-7">
              <div>
                <h2 className="text-center">Verifikasi Email Anda</h2>
                <br />
                <p>
                  Kami telah mengirimkan email verifikasi ke{" "}
                  <span className="font-bold text-merah">
                    {location.state.email}
                  </span>
                </p>
                <br />
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required
                />
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
              <button className="btn-merah" onClick={verifiedEmail}>
                {" "}
                Kirim
              </button>
              <Link to="/login" className="btn-merah">
                Lewatkan ke{" "}
                <HiOutlineArrowNarrowRight className="mx-2 text-xl" /> Log In{" "}
              </Link>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserVerification;
