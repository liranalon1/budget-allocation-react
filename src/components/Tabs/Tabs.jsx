import './Tabs.scss';
import { useState } from 'react';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <nav>
                <ul className="tab-list flex">
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
            </nav>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};

export default Tabs;
