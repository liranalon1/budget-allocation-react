import { cloneElement } from 'react';

const TabContent = ({ children, activeTab }) => {
    return (
        <>
            {children.map((child, contentIndex) => {
                return cloneElement(child, {
                    activeTab,
                    contentIndex: contentIndex,
                    key: contentIndex,
                });
            })}
        </>
    );
};

export default TabContent;
