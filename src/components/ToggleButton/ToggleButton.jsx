import './ToggleButton.scss';
import InfoIcon from '../InfoIcon/InfoIcon';
import { useState } from 'react';

const ToggleButton = ({
    leftLabel,
    rightLabel,
    value,
    handleChange,
    info,
    label,
}) => {
    const toggleState = () => {
        handleChange(value === 0 ? 1 : 0);
    };

    return (
        <div className="input-group">
            <div className="top-item flex">
                <label>{label}</label>

                {info !== undefined && <InfoIcon />}
            </div>

            <div className="toggle-button flex">
                <input
                    type="radio"
                    id="switch_left"
                    name="switchToggle"
                    value={leftLabel}
                    onChange={toggleState}
                    checked={value === 0}
                />
                <label htmlFor="switch_left">{leftLabel}</label>

                <input
                    type="radio"
                    id="switch_right"
                    name="switchToggle"
                    value={rightLabel}
                    onChange={toggleState}
                    checked={value === 1}
                />
                <label htmlFor="switch_right">{rightLabel}</label>
            </div>
        </div>
    );
};

export default ToggleButton;
