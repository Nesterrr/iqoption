// @flow
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';

export const style = {
    dayContainer: (partName: string, isWeekend: boolean): SerializedStyles => css`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        list-style: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-collapse: collapse;
        color: ${partName === 'next' ? `rgba(0, 0, 0, 0.5)` : ``};
        background-color: ${isWeekend ? `rgba(0, 0, 0, 0.1)` : ``};
        

        & ul {
            padding: 0;
        }

        // & li {
            
        // }
    `,
    
    today: css`
        display: block;
        border-radius: 50%;
        background-color: red;
        width: 30px;
        height: 30px;
    `,
    
    dayNumber: (isToday: boolean): SerializedStyles => css`
        margin: 8px;
        align-self: flex-end;
        border: 1px solid transparent;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
        ${isToday ? `
            border-radius: 50%;
            background-color: red;
            width: 30px;
            height: 30px;
            color: #fff;
        ` : ``}
    `,

    eventContainer: css`
        // position: relative;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
    `,

    event: (isEventNameVisible: boolean, isSunday: boolean): SerializedStyles => console.log(isEventNameVisible) || css`
        position: relative;
        box-sizing: border-box;
        height: 24px;
        width: 102%;
        // padding-right: 10px;
        z-index: 4;
        margin-bottom: 4px;
        padding-left: 8px;
        line-height: 24px;
        background-color: #498fff;
        list-style: none;
        color: #fff;
        font-weight: bold;

        ${isEventNameVisible ? `
            z-index: 9999;
            & span {
                position: absolute;
                overflow: visible;
                width: 900px;
            }
        ` : ``}
        ${isSunday ? `
            & span {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        ` : ``}
    `
};
