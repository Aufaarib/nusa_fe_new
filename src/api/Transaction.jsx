import axios from "./axios";

export function postTransfer(postDataTransfer, setStatus) {
    axios
    .post(process.env.REACT_APP_NUSA + '/transaction/create',
        postDataTransfer
    )
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}

export function postCash(postDataCash, setStatus) {
    axios
    .post(process.env.REACT_APP_NUSA + '/transaction/create',
        postDataCash
    )
    .then(() => {
        setStatus({ type: 'success' });
    })
    .catch((error) => {
        setStatus({ type: 'error', error });
    });
}