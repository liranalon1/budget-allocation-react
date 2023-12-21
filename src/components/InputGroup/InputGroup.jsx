import './InputGroup.scss';
import InfoIcon from '../InfoIcon/InfoIcon';

const InputGroup = ({
    children,
    value,
    handleChange,
    placeholder,
    label,
    hasInfo,
    isDisabled,
}) => {
    return (
        <>
            <div className="input-group">
                <div className="top-item flex">
                    <label>{label}</label>

                    {hasInfo.exist && <InfoIcon />}
                </div>

                <div className="input light">
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
        </>
    );
};

export default InputGroup;
