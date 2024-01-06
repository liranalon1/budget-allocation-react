import './Channel.scss'
import { useContext, useState, useEffect } from 'react';
import { channelContext } from '../../App';
import ChannelRow from '@/components/Channel/ChannelRow/ChannelRow';
import ChannelContent from '@/components/Channel/ChannelContent/ChannelContent';
import DropdownSelect from '@/components/DropdownSelect/DropdownSelect';
import DropdownSelectOption from '@/components/DropdownSelect/DropdownSelectOption';
import InputGroup from '@/components/InputGroup/InputGroup';
import ToggleButton from '@/components/ToggleButton/ToggleButton';
import { addCommas, removeCommas, currentYear, monthNames } from '@/helpers';
import dayjs from 'dayjs';

const Channel = ({data, channelIndex}) => {
    const { allChannels, setAllChannels } = useContext(channelContext);
    const [channel, setChannel] = useState(data);

    useEffect(() => {
        setAllChannels((prevChannels) => {
            let newChannels = [...prevChannels];
            newChannels[channelIndex] = channel;
            return newChannels;
        });
    }, [channel]);
    
    const formatNumber = (number) => number % 1 !== 0 ? number?.toFixed(2) : number?.toString();

    const divideAndFormat = (number, divisor) => {
        const result = number / divisor;
        return result % 1 === 0 ? result : result.toFixed(2);   // Check if there is a decimal part
    };

    const calculateBudget = ({baselineBudget, budgetFrequency}) => {
        const selectedOption = budgetFrequency;
        switch (selectedOption) {
            case 'Annually':
                return divideAndFormat(baselineBudget, 12);
            case 'Monthly':
                return baselineBudget;
            case 'Quarterly':
                return divideAndFormat(baselineBudget, 3);
            default:
                return 0;
        }
    };

    const setBudgetPerMonth = ({value, monthIndex}) => {
        let newBudgetPerMonths = channel.budgetPerMonths;
        newBudgetPerMonths.map((obj, i) => {
            if(i !== monthIndex && monthIndex !== null) return
            newBudgetPerMonths[i] = {
                ...newBudgetPerMonths[i],
                budget: removeCommas(value),
            };
        });
        
        setChannel((prevChannel) => {
            let newChannel = {
                ...prevChannel,
                budgetPerMonths: newBudgetPerMonths,
            };

            if(channel.budgetAllocation === 1) {
                newChannel.baselineBudget = newChannel.budgetPerMonths.reduce((acc, curr) => acc + curr.budget,0)
            }
            
            return newChannel;
        });
    }

    const handleBaselineBudget = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,]/g, '');

        setBaselineBudget(removeCommas(value));

        if(channel.budgetAllocation === 0){
            setBudgetPerMonth({
                value: calculateBudget({
                    baselineBudget: removeCommas(value),
                    budgetFrequency: channel.budgetFrequency,
                }),
                monthIndex: null,
            })
        }        
    }

    const setBaselineBudget = (value) => {
        setChannel((prevChannel) => {
            let newChannel = {};
            newChannel = {
                ...prevChannel,
                baselineBudget: value
            };
            return newChannel;
        });
    }

    const setBudgetFrequency = (value) => {
        setChannel((prevChannel) => {
            let newChannel = {
                ...prevChannel,
                budgetFrequency: value,
            };
    
            newChannel.budgetPerMonths = newChannel.budgetPerMonths.map(({ budget }, index) => ({
                month: monthNames[index],
                budget: calculateBudget({
                    baselineBudget: channel.baselineBudget,
                    budgetFrequency: value,
                }),
            }));
    
            return newChannel;
        });
    };    

    const setBudgetAllocation = (value) => {
        setChannel((prevChannel) => {
            let newChannel = {
                ...prevChannel,
                budgetAllocation: value
            };

            newChannel.budgetPerMonths = newChannel.budgetPerMonths.map(({ budget }, index) => ({
                month: monthNames[index],
                budget: calculateBudget({
                    baselineBudget: channel.baselineBudget,
                    budgetFrequency: channel.budgetFrequency,
                }),
            }));

            return newChannel;
        });
    }

    const setIsExpanded = (boolean) => {
        setChannel((prevChannel) => {
            let newChannel = {};
            newChannel = {
                ...prevChannel,
                isExpanded: boolean
            };
            return newChannel;
        });
    }

    const setChannelName = (value) => {
        setChannel((prevChannel) => {
            let newChannel = {};
            newChannel = {
                ...prevChannel,
                name: value
            };
            return newChannel;
        });
    }

    return (
        <div className="channel-wrap">
            <ChannelRow
                channelName={channel.name}
                setChannelName={setChannelName}
                isExpanded={channel.isExpanded}
                setIsExpanded={setIsExpanded}
                channelIndex={channelIndex}
            />

            <ChannelContent
                isExpanded={channel.isExpanded}
                id={channel.id}
            >
                <div className="budget-wrap">
                    <div className="budget-top-items flex">
                        <DropdownSelect
                            value={channel.budgetFrequency}
                            handleChange={(e) => setBudgetFrequency(e.target.value)}
                            label="Budget Frequency"
                            info=""
                        >
                            <DropdownSelectOption value="Annually">
                                Annually
                            </DropdownSelectOption>
                            <DropdownSelectOption value="Monthly">
                                Monthly
                            </DropdownSelectOption>
                            <DropdownSelectOption value="Quarterly">
                                Quarterly
                            </DropdownSelectOption>
                        </DropdownSelect>

                        <InputGroup
                            value={addCommas(formatNumber(channel.baselineBudget))}
                            placeholder=""
                            handleChange={handleBaselineBudget}
                            label={`Baseline ${channel.budgetFrequency} Budget`}
                            info=""
                            isDisabled={
                                channel.budgetAllocation === 1
                            }
                        />

                        <ToggleButton
                            id={channel.id}
                            leftLabel="Equal"
                            rightLabel="Manual"
                            value={channel.budgetAllocation}
                            handleChange={(val) => setBudgetAllocation(Number(val))}
                            label="Budget Allocation"
                            info=""
                        />
                    </div>

                    <div className="budget-breakdown">
                        <div className="top-title">
                            <h2>Budget Breakdown</h2>
                            <p>
                                By default, your budget will be equally
                                divided throughout the year. You can
                                manually change the budget allocation,
                                either now or later.
                            </p>
                            <div className="inputs-wrap">
                                {channel.budgetPerMonths.map(
                                    ({ month, budget }, j) => {

                                        const formattedDate = dayjs(`${currentYear}-${j + 1}-01`).format('MMM YY');

                                        return (
                                            <div key={j}>
                                                <InputGroup
                                                    currency={
                                                        channel.currency
                                                    }
                                                    value={addCommas(budget)}
                                                    placeholder=""
                                                    handleChange={(e) => {
                                                        setBudgetPerMonth({
                                                            value: e.target.value.replace(/[^0-9,]/g, ''),
                                                            monthIndex: j,
                                                        })
                                                    }}
                                                    label={formattedDate}
                                                    isDisabled={
                                                        channel.budgetAllocation === 0
                                                    }
                                                />
                                            </div>                                                    
                                        )                                                
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ChannelContent>
        </div>        
    )
}

export default Channel;