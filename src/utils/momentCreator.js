// @flow
import moment, { type Moment } from 'moment';

export const momentCreator = (
    local?: string = 'ru',
    value?: string | number,
): Moment => moment(value).locale(local);
