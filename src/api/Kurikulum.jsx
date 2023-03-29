import axios from "./axios";

export function getKurikulum(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + "/curriculum/fetch")
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });

    // axios
    //     .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank")
    //     .then((res) => {
    //     setData(res.data);
    //     setSts({ type: 'success' });
    //     })
    //     .catch((error) => {
    //     setSts({ type: 'error', error });
    //     });

}

export function updateKelompokMapel(setStatus, name, status, id) {

    axios.post(process.env.REACT_APP_NUSA + `/group-course/update/${id}`, {
        name,
        status
    })
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}

export function postKurikulum(setSts, code, name, status, description, semester_id, created_by) {

    axios.post(process.env.REACT_APP_NUSA + '/curriculum/create',{
        code,
        name,
        status,
        description,
        semester_id,
        created_by
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}

export function deleteKelompokMapel(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/group-course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
      setSts({ type: 'error', error });
    });


}