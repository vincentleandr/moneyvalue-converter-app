import React, { Component } from 'react';
import './style/main.min.css';

class App extends Component {
	constructor(props) {
        super(props);

        this.state = {
            input: '',
            showDisp: 'hidden',
			gotoTop: '',
			bill: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
			billResult: []
        }

        this.onInputChange = this.onInputChange.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputChange(event) {
        this.setState({input: event.target.value});
	}

    onSubmitForm(event) {
		event.preventDefault();

		//console.log(this.state.input);
		//console.log(this.state.bill.length) input.substring(0, input.indexOf("-"));

		//let onlyNum = Number(this.state.input.replace(/[^0-9,-]+/g,"").replace(/,00/g, ''));

		let onlyNum = Number(this.state.input.replace(/[^0-9,-]+/g,"").split(",")[0]);
		let convertedInt = parseInt(onlyNum, 10);

		console.log(convertedInt);

		if(convertedInt < 50 && convertedInt !== 0) {
			this.setState({ billResult: this.state.billResult.push("No available fraction for Rp. " + convertedInt) });
		}

		for(var i = 0; i < this.state.bill.length; i++) {
			while(convertedInt >= this.state.bill[i]) {
				this.setState({ billResult: this.state.billResult.push(this.state.bill[i])});
				convertedInt = convertedInt - this.state.bill[i];

				if(convertedInt < 50 && convertedInt !== 0) {
					this.setState({ billResult: this.state.billResult.push("No available fraction for Rp. " + convertedInt) });
				}
			}
		}

		let bills = this.state.billResult;

		let billsFiltered = bills.filter(function(item) {
			return typeof item === 'number';
		});

		//console.log(billsFiltered);


		let convertedHtml = billsFiltered.map(bill => {
			<li>{bill}</li>
		});

		//console.log(convertedHtml);

		document.getElementById('list').innerHTML = convertedHtml;

		// document.getElementById('list').innerHTML = this.state.billResult.map(billResult => {
		// 	<li>{billResult}</li>
		// });
		
        this.setState({
            input: '',
            showDisp: 'show',
			gotoTop: 'top',
			billResult: []
		});

		console.log(this.state.billResult);
	}
	
	render() {
		return (
			<div className="container">
				<form className="main-form" onSubmit={this.onSubmitForm}>
					<input className="main-form__input" type="text" placeholder="Try '15000'" value={this.state.input} onChange={this.onInputChange} />
					<button className="main-form__btn" type="submit">Go</button>
				</form>

				<ul id="list">
					{/* {this.state.billResult.map(bill => <li>{bill}</li>)} */}
				</ul>
			</div>
		);
	}
}

export default App;
