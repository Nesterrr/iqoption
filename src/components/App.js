import React, { Component } from "react";
import { css } from '@emotion/core';
import moment from 'moment';
import { Month } from './Month.js';

const calendarContainer = css`
    margin-top: 10px;
`;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        let newDate = Object.assign({}, this.state.date);
        const newNumber = moment(this.state.date).month() - 1;
        newDate = moment(newDate).set("month", newNumber);
        this.setState({
            date: newDate,
        });
    }

    render() {
        return ([
            <button
                onClick={this.onClick}
            >
                предыдущий месяц!
            </button>,
            <div css={calendarContainer}>
                <Month
                    currentDate={this.state.date}
                />
            </div>
        ]);
    }
}

export default App;
