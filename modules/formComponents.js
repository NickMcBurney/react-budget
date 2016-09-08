var CurrencyInput = React.createClass({
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
