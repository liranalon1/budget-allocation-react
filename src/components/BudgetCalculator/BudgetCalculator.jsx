import './BudgetCalculator.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';
import InputGroup from '../InputGroup/InputGroup';
import ToggleButton from '../ToggleButton/ToggleButton';
import { numberWithCommas } from '../../helpers';
const BudgetCalculator = () => {
    const { channels, setChannels } = useContext(channelContext);

    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const updateBudgetFrequency = (value, channelIndex) => {
        setChannels((prevChannels) => {
            const newChannels = [...prevChannels];
            newChannels[channelIndex] = {
                ...newChannels[channelIndex],
                budgetFrequency: value,
            };

            return newChannels;
        });

        calculateBudget(channelIndex);
    };

    const resetChannel = ({ allocationValue, channelIndex }) => {
        setChannels((prevChannels) => {
            const newChannels = [...prevChannels];
            newChannels[channelIndex] = {
                ...newChannels[channelIndex],
                budgetAllocation: allocationValue,
            };

            return newChannels;
        });

        calculateBudget(channelIndex);
    };

    const baselineBudgetChange = ({ value, channelIndex }) => {
        let numWithoutCommas = value.replace(/,/g, '');

        setChannels((prevChannels) => {
            const newChannels = [...prevChannels];
            newChannels[channelIndex] = {
                ...newChannels[channelIndex],
                baselineBudget: numWithoutCommas,
            };

            return newChannels;
        });
    };

    const handleTotalBudgetFields = ({ value, channelIndex, monthIndex }) => {
        let num = value.replace(/,/g, '');
        if (num === '') num = 0;

        const updatedBudgetData = [...channels[channelIndex].budgetPerMonths];
        updatedBudgetData[monthIndex] = {
            ...updatedBudgetData[monthIndex],
            budget: parseInt(num, 10),
        };

        setChannels((prevChannels) => {
            const newChannels = [...prevChannels];
            newChannels[channelIndex] = {
                ...newChannels[channelIndex],
                budgetPerMonths: updatedBudgetData,
                totalBudgetFields: updatedBudgetData.reduce(
                    (acc, curr) => acc + curr.budget,
                    0
                ),
            };

            return newChannels;
        });
    };

    const divideAndFormat = (number, divisor) => {
        const result = number / divisor;

        // Check if there is a decimal part
        if (result % 1 === 0) {
            return result;
        } else {
            return result.toFixed(2);
        }
    };

    const calculateBudget = (channelIndex) => {
        let numWithoutComma = Number(
            channels[channelIndex].baselineBudget.toString().replace(/,/g, '')
        );

        const selectedOption = channels[channelIndex].budgetFrequency;

        switch (selectedOption) {
            case 'Annually':
                return numberWithCommas(divideAndFormat(numWithoutComma, 12));
            case 'Monthly':
                return numberWithCommas(numWithoutComma);
            case 'Quarterly':
                return numberWithCommas(divideAndFormat(numWithoutComma, 3));
            default:
                return 0;
        }
    };

    return (
        <div className="budget-calculator flex">
            {channels.map((channel, i) => (
                <div className="channel-wrap" key={channel.id}>
                    <ChannelRow
                        data={channel}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        expandedRowId={expandedRowId}
                        setExpandedRowId={setExpandedRowId}
                        channelIndex={i}
                    />

                    <ChannelContent
                        isExpanded={isExpanded}
                        id={channel.id}
                        expandedRowId={expandedRowId}
                    >
                        <div className="budget-wrap">
                            <div className="budget-top-items flex">
                                <DropdownSelect
                                    value={channel.budgetFrequency}
                                    handleChange={(e) =>
                                        updateBudgetFrequency(e.target.value, i)
                                    }
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
                                        channels[i].budgetAllocation === 0
                                            ? numberWithCommas(
                                                  channels[i].baselineBudget
                                              )
                                            : numberWithCommas(
                                                  channels[i].totalBudgetFields
                                              )
                                    }
                                    placeholder=""
                                    handleChange={(e) =>
                                        baselineBudgetChange({
                                            value: e.target.value,
                                            channelIndex: i,
                                        })
                                    }
                                    label={`Baseline ${channel.budgetFrequency} Budget`}
                                    info=""
                                    isDisabled={
                                        channels[i].budgetAllocation === 1
                                    }
                                />

                                <ToggleButton
                                    leftLabel="Equal"
                                    rightLabel="Manual"
                                    value={channels[i].budgetAllocation}
                                    handleChange={(val) => {
                                        resetChannel({
                                            allocationValue: val,
                                            channelIndex: i,
                                        });
                                        calculateBudget(i);
                                    }}
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
                                        {channels[i].budgetPerMonths.map(
                                            ({ month, budget }, j) => (
                                                <div key={j}>
                                                    <InputGroup
                                                        currency="$"
                                                        value={
                                                            channels[i]
                                                                .budgetAllocation ===
                                                            0
                                                                ? calculateBudget(
                                                                      i
                                                                  )
                                                                : numberWithCommas(
                                                                      budget
                                                                  )
                                                        }
                                                        placeholder=""
                                                        handleChange={(e) =>
                                                            handleTotalBudgetFields(
                                                                {
                                                                    value: e
                                                                        .target
                                                                        .value,
                                                                    channelIndex:
                                                                        i,
                                                                    monthIndex:
                                                                        j,
                                                                }
                                                            )
                                                        }
                                                        label={`${month} 21`}
                                                        isDisabled={
                                                            channels[i]
                                                                .budgetAllocation ===
                                                            0
                                                        }
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ChannelContent>
                </div>
            ))}
        </div>
    );
};
export default BudgetCalculator;
