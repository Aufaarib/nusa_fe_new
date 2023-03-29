import axios from "./axios";

export function getMapel(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + "/course/fetch")
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

export function postMapel(setSts, code, course_name, description, group_course_id, status, created_by) {

    axios.post(process.env.REACT_APP_NUSA + '/course/create',{
        code,
        course_name,
        description,
        group_course_id,
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

export function deleteKelompokMapel(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/group-course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
      setSts({ type: 'error', error });
    });


}