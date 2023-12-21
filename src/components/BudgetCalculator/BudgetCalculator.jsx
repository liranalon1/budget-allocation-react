import './BudgetCalculator.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';
import InputGroup from '../InputGroup/InputGroup';
import ToggleButton from '../ToggleButton/ToggleButton';

const BudgetCalculator = () => {
    const { channelData, setChannelData } = useContext(channelContext);

    const budgetFrequency = {
        annually: {
            id: 'annually',
            name: 'Annually',
        },
        monthly: {
            id: 'monthly',
            name: 'Monthly',
        },
        quarterly: {
            id: 'quarterly',
            name: 'Quarterly',
        },
    };
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [selectedFrequency, setSelectedFrequency] = useState(
        budgetFrequency['annually'].id
    );
    const [budgetAllocationValue, setBudgetAllocationValue] = useState(0); // 0 === 'equal' && 1 === 'Manual'

    const handleFrequencyChange = (e) => {
        setSelectedFrequency(e.target.value);
    };

    return (
        <div className="budget-calculator flex">
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
                                    info=""
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
                                    info=""
                                    // isDisabled={true}
                                />

                                <ToggleButton
                                    leftLabel="Equal"
                                    rightLabel="Manual"
                                    value={budgetAllocationValue}
                                    handleChange={setBudgetAllocationValue}
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
                                        <InputGroup
                                            currency="$"
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            value={selectedFrequency}
                                            placeholder=""
                                            handleChange={handleFrequencyChange}
                                            label="Jan 21"
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
export default BudgetCalculator;
