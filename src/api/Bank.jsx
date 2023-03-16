import axios from "./axios";

export function getBank(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + "/bank/fetch")
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });
}

export function updateBank(setStatus, nama_bank, nomor_rekening, nama_pemilik, id) {

    axios.post(process.env.REACT_APP_NUSA + `/bank/update/${id}`, {
        nama_bank,
        nomor_rekening,
        nama_pemilik
    })
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}

export function postBank(setStatus, nama_bank, nomor_rekening, nama_pemilik, created_by) {

    axios.post(process.env.REACT_APP_NUSA + '/bank/create',{
        nama_bank,
        nomor_rekening,
        nama_pemilik,
        created_by
    })
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}

export function deleteBank(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/bank/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
      setSts({ type: 'error', error });
    });


}