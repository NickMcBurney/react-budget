'use strict';

var InputField = React.createClass({
	// set initial state values
	getInitialState: function() {
	  	return { 
			value: null,
			confirmed: false,
			frequency: 0,
			newAdded: false
		};
	},
	// get value of input and set state
	getValue: function(val){
		this.setState({ 
			value: Number(val.target.value) 
		});
	},
	// get selected frequency option
	selectChosen: function(val){
		this.setState({ 
			frequency: Number(val.target.value) 
		});
	},
	// run function on confirming input
	submitInput: function(e){
		var value = 0;
		if(this.state.frequency == 0) {
			value = this.state.value;
		} else if (this.state.frequency == 1) {
			value = this.state.value * 4;
		}
		
	    this.props.onSubmit(e.target.name, value);
	     
	    this.setState({ 
			confirmed: true,
		});
	},
	editInput: function(e){
		var value = 0;
		if(this.state.frequency == 0) {
			value = this.state.value;
		} else if (this.state.frequency == 1) {
			value = this.state.value * 4;
		}
		
	    this.props.onEdit(e.target.name, value);
	     
	    this.setState({ 
			confirmed: false,
		});
	},
	removeInput: function(e){
		var value = 0;
		if(this.state.frequency == 0) {
			value = this.state.value;
		} else if (this.state.frequency == 1) {
			value = this.state.value * 4;
		}
		
	    this.props.onRemove(e.target.name, value);
	     
	    this.setState({ 
			confirmed: false 
		});
	},
	addInput: function(e){
	    this.props.onAdd(e.target.name);
	    
	    this.setState({ 
			newAdded: true 
		});
	    
	},
	// render component (w/ dynamic element class and boolean to disable input)
	render: function() {

		var validClass = "";
		var inputConfirmed = this.state.confirmed
		var newAdded = this.state.newAdded
		var first = this.props.reference
		

		if(first == "static") {
			first = true
		} else {
			first = false;
		}
		
		if (inputConfirmed) {
			validClass = "input-valid"
		}
		
		return (
			<div className="question">
				<label>{this.props.label}</label>
				<input type="text" disabled={inputConfirmed} className={validClass} onKeyUp={this.getValue}></input>
				<select onChange={this.selectChosen}>
					<option value="0">Monthly</option>
					<option value="1">Weekly</option>
				</select>
				<button type="button" className={inputConfirmed ? 'hide btn-confirm' : 'btn-confirm'} onClick={this.submitInput}>Confirm</button>
				<button type="button" className={inputConfirmed ? 'btn-edit' : 'hide btn-edit'} onClick={this.editInput} >Edit</button>
				<button type="button" className={inputConfirmed ? 'btn-remove' : 'hide btn-remove'} onClick={this.removeInput} >Remove</button>
				<button type="button" className={inputConfirmed && !newAdded ? 'btn-add' : 'hide btn-add'} onClick={this.addInput} >Add new</button>
			</div>
		)
	}
});
// className={this.state.inputCount > 0 ? '' : 'hide'}

var Calculator = React.createClass({
	getInitialState: function() {
	  	return {
		  	result: null,
		  	inputCount: 0
		};
	},
	addInput: function () {
    	this.setState({inputCount: this.state.inputCount + 1});
	},
	removeInput: function () {
		if(this.state.inputCount > 0){
    		this.setState({inputCount: this.state.inputCount - 1});
    		this.handleInputConfimed
		}
	},
	handleInputConfimed: function(name, value) {
		var running = this.state.result;
		running = running + value
				
		this.setState({ 
			result: running
		});	
	},
	handleInputEdited: function(name, value) {
		var running = this.state.result;
		running = running - value
				
		this.setState({ 
			result: running,
		});
	},
	handleInputRemoved: function(name, value) {
		var running = this.state.result;
		running = running - value
				
		this.setState({ 
			result: running,
			inputCount: this.state.inputCount - 1
		});
	},
	render: function() {
		var inputs = [];
		for (var i=0;i<this.state.inputCount; i++) {
			inputs.push(i);
		}
		var result = 0;
		if (this.state.result) {
		  result = this.state.result;
		}
		
		var fixedLabel = "";
		var dynamicLabel = ""

		if(this.props.type == "incoming"){
			fixedLabel = "Salary"
			dynamicLabel = "New incoming (e.g. benefits)"
		} else {
			fixedLabel = "Mortgage/Rent"
			dynamicLabel = "New outgoing (e.g. phone bill, utilities, tv/internet etc)"
		}
		
		var thisElm = this;
		return (		 
		 <fieldset>
		 	<legend>{this.props.legend}</legend>
			 <InputField label={fixedLabel} key="0" reference="static" onSubmit={this.handleInputConfimed} onEdit={thisElm.handleInputEdited} onAdd={this.addInput} />
			 {
				 inputs.map(function (result) {
					 return <InputField key={result + 1} reference={"dynamic" + result} label={dynamicLabel}  onRemove={thisElm.handleInputRemoved} onSubmit={thisElm.handleInputConfimed} onAdd={thisElm.addInput} />;
				 })
			 }			 
			 <p className="question">Result: {result}</p>
		 </fieldset>
	  );
	},
});


var Form = React.createClass({
	getInitialState: function() {
	  	return {
		  	result: null 
		};
	},
	submit: function() {
		
		var total = this.refs["incoming"].state.result - this.refs["outgoing"].state.result

		this.setState({ 
			result: total
		});
	},
	render: function(){
		var result = 0;
		if (this.state.result) {
		  result = this.state.result;
		}
		return (
			<form>
				<Calculator legend="Incoming Calculator" ref="incoming" type="incoming"/>
				<Calculator legend="Outgoing Calculator" ref="outgoing" type="outgoing"/>
				
				<div className="question">
					<p>Balance: {result}</p>
					<button className="btn" type="button" onClick={this.submit}>Submit</button>
				</div>
			</form>
		)
	}
})

ReactDOM.render(<Form/>, document.getElementById('app'))






// currency formatting function
// takes original value and returns formatted value
function currencyFormat(val) {
	var nStr = val;
	nStr = nStr.replace(/,/g, "");
	nStr = nStr.replace(/£/g, "");
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return "£" + x1 + x2;
}





//import {CurrencyInput} from './components/templates'
//var React  = require('react');
//var ReactDOM  = require('react-dom');
//var CurrencyInput = require('./components/CurrencyInput.jsx');


/* var CurrencyInput = React.createClass({
	getInitialState(){
		// initial state/value
		return ({
			amount: " ", 
			valid: true,
		});
	},
	validate(value){	
		if(value.target.value == "£" || value.target.value == "£0" || value.target.value == 0) {
			var isValid = false
		} else {
			var isValid = true
		}
		
		// if required validation rules
		if(this.props.required){
			// if required - validate
			this.setState({ valid: isValid });
		} else {
			if(value.target.value) {
				// if not required but has value - validate
				this.setState({ valid: isValid });
			} else {
				// if not required and value empty - don't validate and pass
				this.setState({ valid: true });
			}
		}
	},
	formatt(originalValue){
		// format value using function
		var formattted = currencyFormat(originalValue.target.value)
		// update state (value) to formatted value
		this.setState({amount: formattted});
	},
	numericOnly(e){
		 if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
			 e.preventDefault(); //stop character from entering input
		 }
	},
	render: function(){
		return (
			<div className="question">
				<label>{this.props.label}</label>
				<input id={this.props.id} type="tel" value={this.state.amount} onBlur={this.validate} onKeyPress={this.numericOnly} onChange={this.formatt} className={this.state.valid ? '' : 'input-error'} />
				<span className={this.state.valid ? 'hide' : 'message-error'}>{this.props.error}</span>
			</div>
		);
	}
});


ReactDOM.render(
  <CurrencyInput label="Incoming" />,
  //<h1>test</h1>,
  document.getElementById('example')
);









// currency formatting function
// takes original value and returns formatted value
function currencyFormat(val) {
	var nStr = val;
	nStr = nStr.replace(/,/g, "");
	nStr = nStr.replace(/£/g, "");
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return "£" + x1 + x2;
}*/