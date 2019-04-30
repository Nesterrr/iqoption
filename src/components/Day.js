// @flow
import React from 'react';
import { css } from '@emotion/core';

const dayContainer = (
    isEmpty: boolean,
    isWeekend: boolean,
) => css`
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    list-style: none;
    border: 1px solid green;
    border-collapse: collapse;
    background-color: ${isWeekend ? `grey` : ``};
    visibility: ${isEmpty ? `hidden` : `visible`};
`;

const today = css`
    display: block;
    border-radius: 50%;
    background-color: red;
    width: 30px;
    height: 30px;
`;

const dayNumber = (isToday) => css`
    border: 1px solid transparent;
    ${isToday ? `
        display: block;
        border-radius: 50%;
        background-color: red;
        width: 30px;
        height: 30px;
    ` : ``}
`;

type Props = {
    number: number,
    isEmpty: boolean,
    isToday: boolean,
    getTodayRef: Function,
    isWeekend: boolean,
};

export const Day = React.memo(({
    number,
    isEmpty,
    isToday,
    isWeekend,
}: Props,
    ref,
): React.PureComponent => (
    <li
        css={dayContainer(isEmpty, isWeekend)}
    >
        {
            number === 0
            ? ("")
            : (
                <span css={dayNumber(isToday)}>
                    { number }
                </span>
            )
        }
    </li>
));