import axios from "./axios";

export function getPendaftaran(setPendaftaranData, setStatus)  {
    axios
    .get(process.env.REACT_APP_NUSA + "/pendaftaran/fetch")
    .then((res) => {
        const data = res.data.data.filter(
            (e) => e.nama_lengkap_anak !== ""
            );
        setPendaftaranData(data);
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });

    // axios
    // .get("https://63dcbb592308e3e319eca644.mockapi.io/nusa-pendaftaran")
    // .then((res) => {
    //     const data = res.data.filter(
    //         (e) => e.nama_lengkap_anak !== ""
    //         );
    //     setPendaftaranData(data);
    //     setStatus({ type: 'success' });
    // })
    // .catch((error) => {
    //     setStatus({ type: 'error', error });
    // });

};