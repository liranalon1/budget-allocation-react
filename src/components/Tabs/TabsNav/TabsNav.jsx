import { cloneElement } from 'react';

const TabNav = ({ children, activeTab, handleTabClick }) => {
    return (
        <>
            <nav>
                <ul className="tab-list flex">
                    {children.map((child, tabIndex) => {
                        return cloneElement(child, {
                            activeTab,
                            handleTabClick,
                            tabIndex: tabIndex,
                            key: tabIndex,
                        });
                    })}
                </ul>
            </nav>
        </>
    );
};

export default TabNav;
