import './BudgetCalculator.scss';
import { useContext } from 'react';
import { channelContext } from '../../App';
import Channel from '../Channel/Channel';

const BudgetCalculator = () => {
    const { allChannels } = useContext(channelContext);

    return (
        <div className="budget-calculator flex">
            {allChannels.map((channel, i) => (
                <Channel key={channel.id} data={channel} channelIndex={i}/>
            ))}
        </div>
    );
};
export default BudgetCalculator;
