const TabContentItem = ({ children, contentIndex, activeTab }) => {
    return (
        <>
            {contentIndex === activeTab ? (
                <div className="tab-content">{children}</div>
            ) : null}
        </>
    );
};

export default TabContentItem;
