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
}

export function deleteTipeTransaksi(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/transaction-type/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
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
}