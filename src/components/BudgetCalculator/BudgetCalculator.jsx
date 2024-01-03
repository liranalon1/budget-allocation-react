import './BudgetCalculator.scss';
import { useContext, useState } from 'react';
import { channelContext } from '../../App';
import Channel from '../Channel/Channel';

const BudgetCalculator = () => {
    const { channels } = useContext(channelContext);

    return (
        <div className="budget-calculator flex">
            {channels.map((channel, i) => (
                <Channel key={channel.id} data={channel} channelIndex={i}/>
            ))}
        </div>
    );
};
export default BudgetCalculator;
