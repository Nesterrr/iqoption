// @flow
import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/utils';

export const style = {
    monthContainer: (isOffsetExist: boolean): SerializedStyles => css`
        position: relative;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0;
        width: 600px;
        padding: 0;
        margin: 0;
    `
};
