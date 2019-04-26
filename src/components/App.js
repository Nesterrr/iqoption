import React, { Component } from "react";
import moment from 'moment';

class App extends Component {
    render() {
        const monthDate = moment().startOf('month').daysInMonth(1);
        const firstDay = moment(moment())
            .startOf("month")
            .format("d"); 

        console.log('monthDate: ', monthDate);
        console.log('firstDay: ', firstDay);
        return (
            <div>
                <h1>My React App!</h1>
            </div>
        );
    }
}

export default App;