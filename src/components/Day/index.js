// @flow
import * as React from 'react';
import { css } from '@emotion/core';
import { style } from './style';

type PropsType = {
    number: number,
    isEmpty: boolean,
    isToday: boolean,
    isWeekend: boolean,
    monthName?: string | null
};

export const Day = ({
    number,
    isEmpty,
    isToday,
    isWeekend,
    monthName
}: PropsType): React.Element<'li'> => (
    <li
        css={style.dayContainer(isEmpty, isWeekend)}
    >
        {
            number === 0
            ? ("")
            : (
                <span css={style.dayNumber(isToday)}>
                    { number }
                    {" "}
                </span>
            )
        }
        <span>
            { monthName }
        </span>
    </li>
);

Day.defaultProps = {
    isEmpty: false,
    isToday: false,
    isWeekend: false,
    monthName: '',
};
