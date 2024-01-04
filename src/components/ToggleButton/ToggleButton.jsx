import './ToggleButton.scss';
import InfoIcon from '../InfoIcon/InfoIcon';
import { useState } from 'react';

const ToggleButton = ({
    id,
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
                    id={`switch-left-${id}`}
                    name="switchToggle"
                    value={leftLabel}
                    onChange={toggleState}
                    checked={value === 0}
                />
                <label htmlFor={`switch-left-${id}`}>{leftLabel}</label>

                <input
                    type="radio"
                    id={`switch-right-${id}`}
                    name="switchToggle"
                    value={rightLabel}
                    onChange={toggleState}
                    checked={value === 1}
                />
                <label htmlFor={`switch-right-${id}`}>{rightLabel}</label>
            </div>
        </div>
    );
};

export default ToggleButton;
