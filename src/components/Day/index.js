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
    monthName?: string | null,
    dateString: string,
    partName: string
};

export const Day = ({
    number,
    isEmpty,
    isToday,
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

    const currenWeekDay = moment(dateString).day();
    const SATURDAY = 6;
    const SUNDAY = 0;
    const FIRST_DAY_OF_WEEK = 1;
    const isWeekend = currenWeekDay === SATURDAY || currenWeekDay === SUNDAY;

    return (
        <li
            css={style.dayContainer(partName, isWeekend)}
        >
            <span css={style.dayNumber(isToday)}>
                { number }
            </span>
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
                                {
                                    moment(dateString).isSame(formatedStartDate)
                                    || currenWeekDay === FIRST_DAY_OF_WEEK
                                    ? name : ''
                                }
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
    monthName: '',
};
