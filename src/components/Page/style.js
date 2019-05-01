// @flow
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';

export const style = {
    monthContainer: css`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 0;
        height: 98%;
        padding: 0;
        margin: 0;
    `,
};
