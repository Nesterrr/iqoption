// @flow
import * as React from 'react';
import { Day } from '../Day';
import { range } from '../../utils/range';

type PropsType = {
    firstDayOfMonth: string | number
};

export const OffsetDays = ({
    firstDayOfMonth,
}: PropsType): React.Element<*> => {
    const emptyBlocks = range(1, parseInt(firstDayOfMonth) - 1);
    return (
        <React.Fragment>
            {
                emptyBlocks.map((offsetDay: number): React.Element<typeof Day> => {
                    const key = `${offsetDay}-offset`;
                    return (
                        <Day
                            key={key}
                            number={0}
                            isEmpty
                        />
                    )
                })
            }
        </React.Fragment>
    )
};
