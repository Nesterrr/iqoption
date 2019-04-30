// @flow
import * as React from 'react';
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';

const dayContainer = (
    isEmpty: boolean,
    isWeekend: boolean,
): SerializedStyles => css`
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

const dayNumber = (isToday: boolean): SerializedStyles => css`
    border: 1px solid transparent;
    ${isToday ? `
        display: block;
        border-radius: 50%;
        background-color: red;
        width: 30px;
        height: 30px;
    ` : ``}
`;

export type PropsType = {
    number: number,
    isEmpty: boolean,
    isToday: boolean,
    isWeekend: boolean
};

const Day = ({
    number,
    isEmpty,
    isToday,
    isWeekend,
}: PropsType): React.Element<'li'> => (
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
);

Day.defaultProps = {
    isEmpty: false,
    isToday: false,
    isWeekend: false,
};

export default Day;
