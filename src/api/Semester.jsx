import axios from "./axios";

export function getSemester(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + "/semester/fetch")
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

export function updateSemester(setSts, name, description, status, id) {

    axios.post(process.env.REACT_APP_NUSA + `/semester/update/${id}`, {
        name,
        status,
        description
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}

export function postSemester(setSts, name, description, status) {

    axios.post(process.env.REACT_APP_NUSA + '/semester/create',{
        name,
        status,
        description
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}

export function deleteSemester(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/semester/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
      setSts({ type: 'error', error });
    });


}