import React, { Component } from 'react';
import './style/main.min.css';

class App extends Component {
	constructor(props) {
        super(props);

        this.state = {
            input: '',
            showDisp: 'hidden',
			bill: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
			billResult: [],
			errorMsg: ''
        }

        this.onInputChange = this.onInputChange.bind(this);
		this.onResetForm = this.onResetForm.bind(this);
		this.validateForm = this.validateForm.bind(this);
    }

    onInputChange(event) {
        this.setState({input: event.target.value});
	}

	validateForm(event) {
		event.preventDefault(); // prevent from reload

		let onlyNum = Number(this.state.input.replace(/[^0-9,-]+/g,"").split(",")[0]); // take only number from the input
		let convertedInt = parseInt(onlyNum, 10); // parse the number value to integer

		document.getElementById('label').innerText = 'To match Rp. ' + convertedInt.toLocaleString(['ban', 'id']) + ', you need:'; // pass the input value to label for the visual

		if(this.state.input == null || this.state.input === '') { // empty input
			this.setState({
				showDisp: 'hidden',
				errorMsg: 'Cannot be empty.',
			}, function () {
				console.log(this.state.errorMsg);
			});
		} else if(convertedInt === 0) { // if no number detected
			this.setState({
				showDisp: 'hidden',
				errorMsg: 'Missing value.',
			}, function () {
				console.log(this.state.errorMsg);
			});
		} else { // validation passed

			if(convertedInt < 50 && convertedInt !== 0) { // if initial input is smaller than the smallest bill
				this.setState({ billResult: this.state.billResult.push("<li>No available fraction for Rp. " + convertedInt + "</li>x") });
			} else if (convertedInt >= 50) {
				for(var i = 0; i < this.state.bill.length; i++) { // loop the input value through the bill

					// when input value is still greater than the bill, push the array of bill to the billResult
					while(convertedInt >= this.state.bill[i]) {
						this.setState({ billResult: this.state.billResult.push("<li>Rp. " + this.state.bill[i].toLocaleString(['ban', 'id']) + "</li>x")});
						convertedInt = convertedInt - this.state.bill[i]; // count the amount left
		
						if(convertedInt < 50 && convertedInt !== 0) { // if the amount left is smaller than the smallest bill
							this.setState({ billResult: this.state.billResult.push("<li>No available fraction for Rp. " + convertedInt + "</li>x") });
						}
					}
				}
			}

			// count the duplicates in the array
			let convertedHtml = this.state.billResult;
			let count = {};
			convertedHtml.forEach(function(i) {
				count[i] = (count[i]||0) + 1;
			});

			console.log(count);

			document.getElementById('list').innerHTML = JSON.stringify(count).replace(/{|}|:|"|,|/g, ""); // push the list

			this.onResetForm();
		}
	}

    onResetForm() {		
        this.setState({
            input: '',
            showDisp: 'show',
			billResult: [],
			errorMsg: ''
		});
	}
	
	render() {
		return (
			<div className="container">
				<form className="main-form" onSubmit={this.validateForm}>
					<input className="main-form__input" type="text" placeholder="Try '15000'" value={this.state.input} onChange={this.onInputChange} autoFocus/>
					<button className="main-form__btn" type="submit">Go</button>
				</form>
				<span className="error-msg">{this.state.errorMsg}</span>

				<div className={"display " + this.state.showDisp}>
					<span id="label"></span>
					<ul id="list"></ul>
				</div>
			</div>
		);
	}
}

export default App;
