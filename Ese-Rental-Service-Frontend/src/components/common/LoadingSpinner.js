import React from 'react';
import '../../styles/common/LoadingSpinner.css'; // We'll create this CSS file

function LoadingSpinner() {
    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}

export default LoadingSpinner; 