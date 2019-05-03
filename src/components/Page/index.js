// @flow
import * as React from 'react';
import moment from 'moment';
import { Day } from '../Day';
import { style } from './style';

type PropsType = {
    days: Array<{
        dateString: string,
        number: number,
        partName: string
    }>
};

export const Page = ({
    days,
}: PropsType): React.Element<*> => {
    return (
        <ul css={style.monthContainer}>
            {
                days.map(({
                    dateString,
                    number,
                    partName
                }: {
                    dateString: string,
                    number: number,
                    partName: string
                }, index: number): React.Element<typeof Day> => {
                    const isToday = moment(dateString).isSame(moment().format("YYYY-MM-DD"));
                    return (
                        <Day
                            key={`${dateString}-${number}-${index}`}
                            number={number}
                            dateString={dateString}
                            isToday={isToday}
                            dateString={dateString}
                            partName={partName}
                        />
                    )
                })
            }
        </ul>
    );
}
