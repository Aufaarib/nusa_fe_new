import axios from "./axios";

export function postTransfer(postDataTransfer, setStatus) {
    axios
    .post(process.env.REACT_APP_NUSA + '/transaction/create',
        postDataTransfer
    )
    .then(() => {
        setStatus({ type: 'success' });
        // console.log(postDataTransfer);
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
        console.log(error);
        // console.log(postDataTransfer);
    });
}

export function postCash(postDataCash, setStatus) {
    axios
    .post(process.env.REACT_APP_NUSA + '/transaction/create',
        postDataCash
    )
    .then(() => {
        setStatus({ type: 'success' });
        // console.log(postDataCash);
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
        console.log(error);
        // console.log(postDataCash);
    });
}