import './App.scss';
import { createContext, useState } from 'react';
import { months } from '@/helpers';
import BudgetCalculator from '@/components/BudgetCalculator/BudgetCalculator';
import BudgetEdit from '@/components/BudgetEdit/BudgetEdit';

export const channelContext = createContext();

function App() {
    const [activeTab, setActiveTab] = useState('tab1');

    const defaultChannelData = {
        currency: '$',
        baselineBudget: 0,
        budgetFrequency: 'Annually',
        budgetAllocation: 0,
        budgetPerMonths: months.map((month) => ({
            month,
            budget: 0,
        })),
        isExpanded: false,
    };

    const [channels, setChannels] = useState([
        {
            id: 1,
            name: 'Paid reviews',
            ...defaultChannelData,
        },
    ]);

    const addChannel = () => {
        const lastId = channels[channels.length - 1]?.id || 1;

        const newChannel = {
            id: lastId + 1,
            name: 'New Channel',
            ...defaultChannelData,
        };

        setChannels((current) => [...current, newChannel]);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={`app`}>
            <div className="container">
                <div className="top-content flex">
                    <div>
                        <h1>Build your budget plan</h1>
                        <div className="top-title">
                            <h2>Setup channels</h2>
                            <p>
                                Setup your added channels by adding baseline
                                budgets out of your total budget. See the
                                forecast impact with the help of tips and
                                insights.
                            </p>
                        </div>
                    </div>
                    <button
                        className="btn light add-channel"
                        onClick={addChannel}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                        >
                            <path
                                d="M5.71429 4.78571H9.5V5.21429H5.71429H5.21429V5.71429V9.5H4.78571V5.71429V5.21429H4.28571H0.5V4.78571H4.28571H4.78571V4.28571V0.5H5.21429V4.28571V4.78571H5.71429Z"
                                fill="black"
                                stroke="#707EA7"
                            />
                        </svg>
                        Add Channel
                    </button>
                </div>

                <channelContext.Provider
                    value={{
                        channels,
                        setChannels,
                    }}
                >
                    <div className="tabs">
                        <ul className="tab-list flex">
                            <li
                                onClick={() => handleTabClick('tab1')}
                                className={activeTab === 'tab1' ? 'active' : ''}
                            >
                                Tab 1
                            </li>
                            <li
                                onClick={() => handleTabClick('tab2')}
                                className={activeTab === 'tab2' ? 'active' : ''}
                            >
                                Tab 2
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'tab1' && <BudgetCalculator />}
                        {activeTab === 'tab2' && <BudgetEdit />}
                    </div>
                </channelContext.Provider>
            </div>
        </div>
    );
}

export default App;
