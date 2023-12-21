import './InputGroup.scss';
import InfoIcon from '../InfoIcon/InfoIcon';

const InputGroup = ({
    children,
    value,
    currency,
    handleChange,
    placeholder,
    label,
    info,
    isDisabled,
}) => {
    return (
        <div className="input-wrap flex">
            <div className="input-top">
                <div className="top-item flex">
                    <label>{label}</label>

                    {info !== undefined && <InfoIcon />}
                </div>
            </div>

            <div className="input light">
                {currency ? <span className="currency">{currency}</span> : null}
                <input
                    className="flex"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={isDisabled}
                >
                    {children}
                </input>
            </div>
        </div>
    );
};

export default InputGroup;
