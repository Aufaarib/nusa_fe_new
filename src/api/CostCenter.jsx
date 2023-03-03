import axios from "./axios";

export default function getCostCenter(setData, setSts) {

    axios.get(`https://nusa.nuncorp.id/golang/api/v1/cost-center/fetch`)
        .then((res) => {
            setData(res.data.data);
            setSts({ type: 'success' });
        })
        .catch((error) => {
            setSts({ type: 'error', error });
        });


}