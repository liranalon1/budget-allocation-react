import './Channel.scss'
import { useContext, useState, useEffect } from 'react';
import { channelContext } from '../../App';
import ChannelRow from './ChannelRow/ChannelRow';
import ChannelContent from './ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';
import InputGroup from '../InputGroup/InputGroup';
import ToggleButton from '../ToggleButton/ToggleButton';
import { addCommas, removeCommas } from '../../helpers';

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

    const calculateBudget = (value) => {
        const selectedOption = channel.budgetFrequency;
        switch (selectedOption) {
            case 'Annually':
                return divideAndFormat(value, 12);
            case 'Monthly':
                return value;
            case 'Quarterly':
                return divideAndFormat(value, 3);
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
        
        let newChannel = {};
        setChannel((prevChannel) => {
            newChannel = {
                ...prevChannel,
                budgetPerMonths: newBudgetPerMonths,
            };
            return newChannel;
        });
    }

    const handleBaselineBudget = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,]/g, '');

        setBaselineBudget(removeCommas(value));

        if(channel.budgetAllocation === 0){
            setBudgetPerMonth({
                value: calculateBudget(removeCommas(value)),
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
            let newChannel = {};
            newChannel = {
                ...prevChannel,
                budgetFrequency: value
            };
            return newChannel;
        });
    }

    const setBudgetAllocation = (value) => {
        setChannel((prevChannel) => {
            let newChannel = {};
            newChannel = {
                ...prevChannel,
                budgetAllocation: value
            };
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
                            value={
                                channel.budgetAllocation === 0
                                ? addCommas(formatNumber(channel.baselineBudget))
                                : addCommas(formatNumber(channel.budgetPerMonths.reduce((acc, curr) => acc + curr.budget,0)))
                            }
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
                                        return (
                                            <div key={j}>
                                                <InputGroup
                                                    currency={
                                                        channel.currency
                                                    }
                                                    value={
                                                        channel.budgetAllocation === 0
                                                        ? addCommas(calculateBudget(channel.baselineBudget))
                                                        : addCommas(budget)
                                                    }
                                                    placeholder=""
                                                    handleChange={(e) => {
                                                        setBudgetPerMonth({
                                                            value: e.target.value.replace(/[^0-9,]/g, ''),
                                                            monthIndex: j,
                                                        })
                                                    }}
                                                    label={`${month} 21`}
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