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

    const [selectedOption, setSelectedOption] = useState('Annually');
    const [budget, setBudget] = useState(0);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setBudget(0);
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    };

    const calculateBudget = () => {
        switch (selectedOption) {
            case 'Annually':
                return budget / 12;
            case 'Monthly':
                return budget;
            case 'Quarterly':
                return budget / 3;
            default:
                return 0;
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [budgetAllocationValue, setBudgetAllocationValue] = useState(0); // 0 === 'equal' && 1 === 'Manual'

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
                                    value={selectedOption}
                                    handleChange={handleOptionChange}
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
                                    value={budget}
                                    placeholder=""
                                    handleChange={handleBudgetChange}
                                    label={`Baseline ${selectedOption} Budget`}
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
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
                                            label="Jan 21"
                                            isDisabled={true}
                                        />
                                        <InputGroup
                                            currency="$"
                                            value={calculateBudget()}
                                            placeholder=""
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
