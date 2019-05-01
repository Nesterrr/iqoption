// @flow
import * as React from 'react';
import moment from 'moment';
import { css } from '@emotion/core';
import { style } from './style';
import type { EventType } from '../../types';
import { events } from '../../events';

type PropsType = {
    number: number,
    isEmpty: boolean,
    isToday: boolean,
    isWeekend: boolean,
    monthName?: string | null,
    dateString: string,
    partName: string
};

export const Day = ({
    number,
    isEmpty,
    isToday,
    isWeekend,
    monthName,
    dateString,
    lengthOfNextMonth,
    partName
}: PropsType): React.Element<'li'> => {
    const todayEvents = events.filter(({
        startDate,
        endDate
    }: {
        startDate: string,
        endDate: string
    }): Array<EventType> => {
        const formatedStartDate = startDate.split('.').reverse().join('-');
        const formatedEndDate = endDate.split('.').reverse().join('-');

        return moment(dateString).isSameOrAfter(formatedStartDate)
            && moment(dateString).isSameOrBefore(formatedEndDate);
    })
    return (
        <li
            css={style.dayContainer(partName)}
        >
            {
                number === 0
                ? ("")
                : (
                    <span css={style.dayNumber(isToday)}>
                        { number }
                    </span>
                )
            }
            <span>
                { monthName }
            </span>
            <ul>
                {
                    todayEvents.map((
                        { name, startDate, endDate }: EventType,
                        index: number
                    ): React.Element<'li'> => {
                        const formatedStartDate = startDate.split('.').reverse().join('-');
                        return (
                            <li key={index}>
                                <div>
                                    {
                                        moment(dateString).isSame(formatedStartDate) ? name : ''
                                    }
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </li>
    );
}

Day.defaultProps = {
    isEmpty: false,
    isToday: false,
    isWeekend: false,
    monthName: '',
};
