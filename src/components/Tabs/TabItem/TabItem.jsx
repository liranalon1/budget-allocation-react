const TabItem = ({ children, tabIndex, activeTab, handleTabClick }) => {
    return (
        <>
            <li
                key={tabIndex}
                className={tabIndex === activeTab ? 'active' : ''}
                onClick={() => handleTabClick(tabIndex)}
            >
                {children}
            </li>
        </>
    );
};

export default TabItem;
