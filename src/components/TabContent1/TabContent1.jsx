import { useState } from 'react';
import './TabContent1.scss';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';
import InputGroup from '../InputGroup/InputGroup';
import ToggleButton from '../ToggleButton/ToggleButton';

const TabContent1 = ({ channelData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [selectedFrequency, setSelectedFrequency] = useState('annually');
    const [budgetAllocationValue, setBudgetAllocationValue] = useState(0); // 0 === 'equal' && 1 === 'Manual'

    const handleFrequencyChange = (e) => {
        setSelectedFrequency(e.target.value);
    };

    return (
        <div className="tab-content1 flex">
            {channelData.map((row) => (
                <div className="channel-wrap" key={row.id}>
                    <ChannelRow
                        data={row}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        expandedRowId={expandedRowId}
                        setExpandedRowId={setExpandedRowId}
                    />

                    <ChannelContent
                        isExpanded={isExpanded}
                        id={row.id}
                        expandedRowId={expandedRowId}
                    >
                        <div className="budget-wrap">
                            <div className="budget-top-items flex">
                                <DropdownSelect
                                    defaultValue={selectedFrequency}
                                    handleChange={handleFrequencyChange}
                                    label="Budget Frequency"
                                    hasInfo={{ exist: true, text: '' }}
                                >
                                    <DropdownSelectOption optionValue="annually">
                                        Annually
                                    </DropdownSelectOption>
                                    <DropdownSelectOption optionValue="monthly">
                                        Monthly
                                    </DropdownSelectOption>
                                    <DropdownSelectOption optionValue="quarterly">
                                        Quarterly
                                    </DropdownSelectOption>
                                </DropdownSelect>

                                <InputGroup
                                    value={selectedFrequency}
                                    placeholder=""
                                    handleChange={handleFrequencyChange}
                                    label={`Baseline ${selectedFrequency} Budget`}
                                    hasInfo={{ exist: true, text: '' }}
                                    // isDisabled={true}
                                />

                                <ToggleButton
                                    leftLabel="Equal"
                                    rightLabel="Manual"
                                    value={budgetAllocationValue}
                                    handleChange={setBudgetAllocationValue}
                                    label="Budget Allocation"
                                    hasInfo={{ exist: true, text: '' }}
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
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            hasInfo={{ exist: false }}
                                            isDisabled={true}
                                        />
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
export default TabContent1;
