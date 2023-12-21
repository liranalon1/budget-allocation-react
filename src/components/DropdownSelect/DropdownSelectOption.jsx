const DropdownSelectOption = ({ children, value }) => {
    return (
        <>
            <option value={value}>{children}</option>
        </>
    );
};

export default DropdownSelectOption;
