import Arrow from '../ArrowIcon/Arrow';

const DropdownSelect = ({ children, defaultValue, handleChange, label }) => {
    return (
        <>
            <div className="input-group">
                <div className="top-item flex">
                    <label>{label}</label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 6C0 2.69351 2.69351 0 6 0C9.30649 0 12 2.69351 12 6C12 9.30649 9.30649 12 6 12C2.69351 12 0 9.30649 0 6ZM11.0769 6.00002C11.0769 3.19112 8.8089 0.923096 6 0.923096C3.19111 0.923096 0.92308 3.19112 0.92308 6.00002C0.92308 8.80891 3.19111 11.0769 6 11.0769C8.8089 11.0769 11.0769 8.80891 11.0769 6.00002ZM5.53847 2.76923V3.6923H6.46154V2.76923H5.53847ZM5.53847 9.23074V4.61536H6.46154V9.23074H5.53847Z"
                            fill="#99A4C2"
                        />
                    </svg>
                </div>

                <div className="select btn dark">
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
