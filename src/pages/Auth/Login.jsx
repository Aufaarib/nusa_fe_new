import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoSaim from '../../data/logo-saim.png';
import assalamualaikum from '../../data/assalamualaikum.png';
import { CgSpinner } from 'react-icons/cg';
import { FaTimesCircle } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const LOGIN_URL = '/api/login';

const Login = () => {
    const { isLoading, setIsLoading } = useStateContext();

    const { auth, setAuth } = useAuth();
    // const role = JSON.parse(localStorage.getItem('ROLE'));
    const role = localStorage.getItem('ROLE');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errMsgUser, setErrMsgUser] = useState('');
    const [errMsgPwd, setErrMsgPwd] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // useEffect(() => {
    //   navigate("/pmb", { replace: true });
    // }, [])

    // useEffect(() => {
    //   localStorage.setItem('USER_CREDS', JSON.stringify(auth))
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            // const response = await axios.post(LOGIN_URL,
            //     JSON.stringify({ 
            //       "username":user, 
            //       "password":pwd 
            //     }),
            //     {
            //       headers: { 
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json' 
            //       },
            //       withCredentials: true
            //     }
            // );
            // console.log("RES ==== " + JSON.stringify(response?.data));
            // const nama = response?.data?.user.nama_lengkap;
            // const role = response?.data?.user.role;
            // const email = response?.data?.user.email;
            // const verified = response?.data?.user.email_verified_at;
            // const token = response?.data?.bearer;
            // setAuth({ nama, role, email, verified, token });
            // console.log("auth ==== " + JSON.stringify(verified));
            const nama = "Muhammad Aufa Arib";
            const role = "Admin PMB";
            const email = "aufaarib197@gmail.com";
            setUser('');
            setPwd('');
            setIsLoading(false)
            // localStorage.setItem('NAMA', JSON.stringify(nama))
            // localStorage.setItem('ROLE', JSON.stringify(role))
            // localStorage.setItem('EMAIL', JSON.stringify(email))
            // localStorage.setItem('TOKEN', JSON.stringify(token))
            // localStorage.setItem('VERIFIED', JSON.stringify(verified))
            localStorage.setItem('NAMA', nama)
            localStorage.setItem('ROLE', role)
            localStorage.setItem('EMAIL', email)
            // setSuccess(true);
            // navigate(from, { replace: true});
            if(role === "Admin PMB"){
              navigate("/dashboard", { replace: true });
            }else{
              navigate("/pmb/tahapan-pmb", { replace: true });
            }
        }catch (err) {
            // console.error("ERROR === ", err?.response?.data.errors)
            // const errMsg = err?.response?.data.errors;
            // setErrMsg(errMsg);
            // errRef.current.focus();
            setIsLoading(false)
        }
    }

    return (
        
              <div className="justify-end lg:min-h-screen lg:flex lg:bg-krem">

                <section className="top-0 left-0 flex items-center justify-center min-h-full lg:fixed lg:w-1/2" style={{ background: '#E6E6E6' }}>
                  <img
                    className="m-7 lg:h-96 lg:w-96 sm:w-56 sm:h-56 xs:w-1/3 xs:h-1/3"
                    src={logoSaim}
                    alt="SAIM"
                  />
                  
                  <p className="absolute text-sm text-center xs:invisible lg:visible bottom-7 mt-7 text-merah">Copyright 2022. PT. Nafisha Universal Network</p>

                </section>
                
                <section className="flex justify-center lg:min-h-screen lg:items-center lg:w-1/2 bg-putih">
                                      
                    <form onSubmit={handleSubmit} className="block mt-7 mb-7 px-7">

                        <div className="relative block text-center xl:w-480 mb-9">
                          <img
                            className="m-auto mb-3 h-200 w-200 xs:hidden lg:block"
                            src={assalamualaikum}
                            alt="Assalamuálaikum"
                          />
                          <h4>Selamat Datang di Web Penerimaan Murid Baru</h4>
                        </div>

                        <h2 className="text-center mt-7 mb-7">Silahkan Masuk</h2>

                        {/* USER */}
                        <div className="relative block xl:w-480">
                          <label htmlFor="user" className="flex mt-4 mb-1 form-label">
                            E-mail
                          </label>
                          <input
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                            type="text"
                            id="user"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            // required
                          />
                        </div>


                        {/* PASSWORD */}
                        <div className="relative block xl:w-480">
                          <label htmlFor="password" className="flex mt-4 mb-1 form-label">
                            Kata Sandi
                          </label>
                          <input
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            // required
                          />
                        </div>

                        <div ref={errRef} className={errMsg ? "errmsg px-4 py-3 mt-3 mb-3 mb-4 rounded-md text-merah text-sm bg-red-100 xl:w-480 relative" : "hidden"} aria-live="assertive" role="alert">
                          {/* <button className="flex items-center mt-3"><FaTimesCircle /> <span className="ml-1">Tutup</span></button> */}
                          {Object.entries(errMsg).map(([, fieldErrors]) => 
                            fieldErrors.map((fieldError, index) => <p key={index} className="flex gap-2"><FaTimesCircle className='my-1' /> {fieldError}</p>)
                          )}
                        </div>

                        <button 
                          className="flex justify-center w-full py-3 my-6 mr-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md disabled:bg-krem disabled:text-abu bg-merah px-7 hover:bg-gelap hover:shadow-lg focus:bg-merah focus:shadow-lg focus:outline-none focus:ring-0 active:bg-merah active:shadow-lg"
                        >
                          Masuk {isLoading ? <CgSpinner className="ml-2 text-lg animate-spin" /> : "" }
                        </button>

                        <Link to={"/register"} className="block mb-16">
                          Belum mempunyai akun? <span className="ml-1 underline line text-merah">Daftar</span>
                        </Link>

                        
                    </form>
                    
                </section>

                <p className="py-4 text-sm text-center lg:hidden text-merah">Copyright 2022. PT. Nafisha Universal Network</p>

              </div>
            
    )
}

export default Login
