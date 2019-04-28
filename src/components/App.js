import React, { Component } from "react";
import { css } from '@emotion/core';
import { Month } from './Month.js';
import moment from 'moment';

const calendarContainer = css`
    margin-top: 10px;
`;
class App extends Component {
    render() {
        return (
            <div css={calendarContainer}>
                <Month monthNumber="3" />
                <Month monthNumber="4" />
            </div>
        );
    }
}

export default App;