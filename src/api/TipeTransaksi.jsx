import axios from "./axios";

export function getTipeTransaksi(setData, setSts) {

    axios.get(process.env.REACT_APP_NUSA + "/transaction-type/fetch")
        .then((response) => {
        setData(response.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });

//     axios.get("https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi")
//     .then((response) => {
//     setData(response.data);
//     setSts({ type: 'success' });
//     })
//     .catch((error) => {
//     setSts({ type: 'error', error });
//     });
}

export function deleteTipeTransaksi(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/transaction-type/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
        setSts({ type: 'error', error });
    });

    // axios.delete(`https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi/${deleteId}`)
    // .then(() => {
    //   setSts({ type: 'success' });
    //   })
    // .catch((error) => {
    //     setSts({ type: 'error', error });
    // });

}

export function postTipeTransaksi(description, status, created_by, setSts) {

    axios.post(process.env.REACT_APP_NUSA + '/transaction-type/create',{
        description,
        status,
        created_by
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });

    // axios.post('https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi',{
    //     description,
    //     status,
    //     created_by
    // })
    // .then(() => {
    //     setSts({ type: 'success' });
    // })
    // .catch((error) => {
    //     setSts({ type: 'error', error });
    // });

}

export function updateTipeTransaksi(setSts, status, id) {

    axios.post(process.env.REACT_APP_NUSA + `/transaction-type/update/${id}`, {
        status
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}