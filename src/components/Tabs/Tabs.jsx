import './Tabs.scss';
import { useState, cloneElement } from 'react';

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            {children.map((child, i) => {
                return cloneElement(child, {
                    activeTab,
                    handleTabClick,
                    key: i,
                });
            })}

            {/* <nav>
                <ul className="tab-list flex">
                    {tabs?.map((tab, index) => (
                        <li
                            key={index}
                            className={index === activeTab ? 'active' : ''}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="tab-content">{tabs[activeTab]?.content}</div> */}
        </div>
    );
};

export default Tabs;
