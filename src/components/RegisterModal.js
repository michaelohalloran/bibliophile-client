import React from 'react';
import Modal from 'react-modal';

const RegisterModal = (props)=> (
    <Modal
    isOpen={true}
    contentLabel='Register modal'
    >
        <button onClick={()=>console.log('close modal')}>Close modal</button>
    </Modal>
);


export default RegisterModal;