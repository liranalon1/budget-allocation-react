import Arrow from '../ArrowIcon/ArrowIcon';
import InfoIcon from '../InfoIcon/InfoIcon';
import './DropdownSelect.scss';

const DropdownSelect = ({
    children,
    defaultValue,
    handleChange,
    label,
    hasInfo,
}) => {
    return (
        <>
            <div className="select-group">
                <div className="top-item flex">
                    <label>{label}</label>

                    {hasInfo.exist && <InfoIcon />}
                </div>

                <div className="select dark">
                    <select
                        className="flex"
                        value={defaultValue}
                        onChange={handleChange}
                    >
                        {children}
                    </select>
                    <Arrow />
                </div>
            </div>
        </>
    );
};

export default DropdownSelect;