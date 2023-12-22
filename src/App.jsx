import './App.scss';
import { createContext, useState } from 'react';
import { months } from '@/helpers';
import Tabs from '@/components/Tabs/Tabs';
import TabsNav from '@/components/Tabs/TabsNav/TabsNav';
import TabItem from '@/components/Tabs/TabItem/TabItem';
import TabContent from '@/components/Tabs/TabContent/TabContent';
import TabContentItem from '@/components/Tabs/TabContent/TabContentItem/TabContentItem';
import BudgetCalculator from '@/components/BudgetCalculator/BudgetCalculator';
import BudgetEdit from '@/components/BudgetEdit/BudgetEdit';

export const context = createContext();

function App() {
    const monthsWithBudget = months.map((month) => ({
        month,
        budget: 0,
    }));

    const addChannel = () => {
        setChannelData((current) => [
            ...current,
            {
                id: current.at(-1)?.id + 1 || 1,
                name: 'New Channel',
            },
        ]);
    };

    const [channelData, setChannelData] = useState([
        {
            id: 1,
            name: 'Paid reviews',
        },
    ]);

    const [budgetPerMonth, setBudgetPerMonth] = useState(monthsWithBudget);

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

                <context.Provider
                    value={{
                        channelData,
                        setChannelData,
                        budgetPerMonth,
                        setBudgetPerMonth,
                    }}
                >
                    <Tabs>
                        <TabsNav>
                            <TabItem>Tab 1</TabItem>
                            <TabItem>Tab 2</TabItem>
                        </TabsNav>

                        <TabContent>
                            <TabContentItem>
                                <BudgetCalculator />
                            </TabContentItem>
                            <TabContentItem>
                                <BudgetEdit />
                            </TabContentItem>
                        </TabContent>
                    </Tabs>
                </context.Provider>
            </div>
        </div>
    );
}

export default App;
