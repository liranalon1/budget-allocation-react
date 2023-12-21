import './BudgetCalculator.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import ChannelRow from '../Channel/ChannelRow/ChannelRow';
import ChannelContent from '../Channel/ChannelContent/ChannelContent';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../DropdownSelect/DropdownSelectOption';
import InputGroup from '../InputGroup/InputGroup';
import ToggleButton from '../ToggleButton/ToggleButton';
import { months, numberWithCommas } from '../../helpers';
const BudgetCalculator = () => {
    const { channelData, setChannelData } = useContext(channelContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [selectedOption, setSelectedOption] = useState('Annually');
    const [budget, setBudget] = useState(0);
    const [budgetAllocation, setBudgetAllocation] = useState(0); // 0 === 'equal' && 1 === 'Manual'
    const [totalBudgetFields, setTotalBudgetFields] = useState(0);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        calculateBudget();
    };

    const handleBudgetChange = (event) => {
        let num = event.target.value.replace(/,/g, '');
        setBudget(numberWithCommas(num));
    };

    const handleTotalBudgetFields = (event) => {
        let num = event.target.value.replace(/,/g, '');
        setTotalBudgetFields(totalBudgetFields += num);
    };



    const divideAndFormat = (number, divisor) => {
        const result = number / divisor;
        
        // Check if there is a decimal part
        if (result % 1 === 0) {
          return result;
        } else {
          return result.toFixed(2);
        }
      }  

    const calculateBudget = () => {
        let numWithoutComma = Number(budget.toString().replace(/,/g, ''));
        
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
                                    // value={budgetAllocation ? budget : totalBudgetFields}
                                    value={budget}
                                    placeholder=""
                                    handleChange={handleBudgetChange}
                                    label={`Baseline ${selectedOption} Budget`}
                                    info=""
                                    isDisabled={budgetAllocation ? true : false}
                                />

                                <ToggleButton
                                    leftLabel="Equal"
                                    rightLabel="Manual"
                                    value={budgetAllocation}
                                    handleChange={setBudgetAllocation}
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
                                        {months.map((month, index) => (
                                            <div key={index}>
                                                <InputGroup
                                                    currency="$"
                                                    // value={budgetAllocation ? "" : calculateBudget()}
                                                    value={calculateBudget()}
                                                    placeholder=""
                                                    handleChange={budgetAllocation ? handleBudgetChange : handleTotalBudgetFields}
                                                    label={`${month} 21`}
                                                    isDisabled={budgetAllocation ? false : true}
                                                />
                                            </div>
                                        ))}
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
