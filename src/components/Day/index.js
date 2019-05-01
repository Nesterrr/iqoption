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
    dateString: string
};

export const Day = ({
    number,
    isEmpty,
    isToday,
    isWeekend,
    monthName,
    dateString
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
            css={style.dayContainer(isEmpty, isWeekend)}
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
                    ): React.Element<'li'> => (
                        <li key={index}>
                            <div>{name}</div>
                        </li>
                    ))
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
