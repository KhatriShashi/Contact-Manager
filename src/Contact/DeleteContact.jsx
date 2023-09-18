import React from 'react'
import './DeleteContact.scss'
import { ExclamationCircleFill } from 'react-bootstrap-icons'
export default function DeleteContact({ onClose }) {
    return (
        <>
            <div className='delete-contact-details shadow-sm'>
                <div className='delete-contact-card'>
                    <ExclamationCircleFill style={{fontSize:"40px",color:"#f23b26"}}/>
                    <h1>Confirm</h1>
                    <h5>Are you sure want to delete this contact?</h5>
                    <div className='delete-contact-button'>
                        <button>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </>
    )
}
