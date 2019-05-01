// @flow
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';

export const style = {
    dayContainer: (
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
    `,
    
    today: css`
        display: block;
        border-radius: 50%;
        background-color: red;
        width: 30px;
        height: 30px;
    `,
    
    dayNumber: (isToday: boolean): SerializedStyles => css`
        border: 1px solid transparent;
        ${isToday ? `
            display: block;
            border-radius: 50%;
            background-color: red;
            width: 30px;
            height: 30px;
        ` : ``}
    `
};
