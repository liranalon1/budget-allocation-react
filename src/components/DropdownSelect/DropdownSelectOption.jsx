const DropdownSelectOption = ({ children, optionValue }) => {
    return (
        <>
            <option value={optionValue}>{children}</option>
        </>
    );
};

export default DropdownSelectOption;
