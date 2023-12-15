import './Tabs.scss';
import { useState } from 'react';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={index === activeTab ? 'active' : ''}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};

export default Tabs;
