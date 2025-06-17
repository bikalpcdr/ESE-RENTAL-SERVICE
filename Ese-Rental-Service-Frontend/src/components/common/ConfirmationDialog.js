import React from 'react';
import '../../styles/common/ConfirmationDialog.css';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog-content">
                <p className="confirmation-message">{message}</p>
                <div className="confirmation-actions">
                    <button onClick={onConfirm} className="confirm-button">Confirm</button>
                    <button onClick={onCancel} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog; 