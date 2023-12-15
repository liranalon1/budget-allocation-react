import { useState } from 'react';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import TabContent1 from './components/TabContent1/TabContent1';
import TabContent2 from './components/TabContent2/TabContent2';

function App() {
    const channelData = [
        {
            id: 1,
            name: 'Paid reviews',
            description: 'Description for Paid reviews',
        },
        { id: 2, name: 'Row 2', description: 'Description for Row 2' },
        { id: 3, name: 'Row 3', description: 'Description for Row 3' },
    ];

    const tabData = [
        { label: 'Tab 1', content: <TabContent1 channelData={channelData} /> },
        { label: 'Tab 2', content: <TabContent2 channelData={channelData} /> },
    ];

    return (
        <div className={`App`}>
            <div className="container">
                <div className="top-content">
                    <h1>Build your budget plan</h1>
                    <h2>Setup channels</h2>
                    <p>
                        Setup your added channels by adding baseline budgets out
                        of your total budget. See the forecast impact with the
                        help of tips and insights.
                    </p>
                </div>
                <Tabs tabs={tabData} />
            </div>
        </div>
    );
}

export default App;
