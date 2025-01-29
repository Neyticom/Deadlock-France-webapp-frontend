import React from 'react';
import './DonateButton.scss';

const DonateButton: React.FC = () => {
    const handleDonateClick = () => {
        window.open('https://www.paypal.com/donate', '_blank');
    };

    return (
        // biome-ignore lint/a11y/useButtonType: <explanation>
<button className="donate-button" onClick={handleDonateClick}>
            <span className='donate-button_top'>Soutenir Deadlock</span>
            <span className='donate-button_bottom'>France ❤️</span>
        </button>
    );
};

export default DonateButton;