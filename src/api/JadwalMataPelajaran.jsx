import axios from "./axios";

export function getJadwalMapel(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + "/course-schedule/fetch")
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

export function postJadwalMapel(setSts, class_id, course_id, day, start_time, end_time, created_by) {

    axios.post(process.env.REACT_APP_NUSA + '/course-schedule/create',{
        class_id,
        course_id,
        day,
        start_time,
        end_time,
        created_by    
    })
    .then(() => {
        setSts({ type: 'success' });
    })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}

export function deleteJadwalMapel(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/course-schedule/delete/${deleteId}`)
    .then(() => {
      setSts({ type: 'success' });
      })
    .catch((error) => {
      setSts({ type: 'error', error });
    });


}