import axios from "./axios";

export function getCostCenter(setData, setSts) {

    axios.get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
        .then((res) => {
            setData(res.data.data);
            setSts({ type: 'success' });
        })
        .catch((error) => {
            setSts({ type: 'error', error });
        });
}

export function getCostCenterPendidikan(setData, setSts) {

    axios.get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
        .then((res) => {
            const data = res.data.data.filter(
                (e) => e.group === "Biaya Pendidikan"
            );
            setData(data);
            setSts({ type: 'success' });
        })
        .catch((error) => {
            setSts({ type: 'error', error });
        });
}

export function getCostCenterOperasional(setData, setSts) {

    axios.get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
        .then((res) => {
            const data = res.data.data.filter(
                (e) => e.group === "Operasional"
            );
            setData(data);
            setSts({ type: 'success' });
        })
        .catch((error) => {
            setSts({ type: 'error', error });
        });
}

export function deleteCostCenter(setSts, deleteId) {

    axios.delete(process.env.REACT_APP_NUSA + `/cost-center/delete/${deleteId}`)
    .then(() => {
        setSts({ type: 'success' });
      })
    .catch((error) => {
        setSts({ type: 'error', error });
    });
}

export function postCostCenter(setStatus, code, group, sub_group, item, payment_type, created_by) {

    axios.post(process.env.REACT_APP_NUSA + '/cost-center/create',{
        code,
        group,
        sub_group,
        item,
        payment_type,
        created_by
    })
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}