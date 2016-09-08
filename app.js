import React from 'react';
import Header from './modules/formLayout';
//import MortgageCalculator from './modules/MortgageCalculator';

let App = React.createClass({
    render() {
        return (
            <div>
                <Header title="React ES6 Mortgage Calculator"/>
                
            </div>
        );
    }
});

React.render(<App/>, document.body);
