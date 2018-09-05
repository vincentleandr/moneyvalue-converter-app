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
		//console.log(this.state.bill.length)

		let convertedInt = parseInt(this.state.input, 10);

		let billResultTemp = [];

		for (var i = 0; i < this.state.bill.length; i++) {
			while (convertedInt >= this.state.bill[i]) {
				this.setState({ billResult: this.state.billResult.push(this.state.bill[i]) });
				//billResultTemp.push(this.state.bill[i]);
				convertedInt = convertedInt - this.state.bill[i];
			}
		}

		//console.log(billResultTemp);
		
		
        this.setState({
            input: '',
            showDisp: 'show',
			gotoTop: 'top',
			billResult: []
			//billResult: this.state.billResult.push(billResultTemp)
		});

		//console.log(this.state.billResult);
		console.log(this.state.billResult);
	}
	
	render() {
		return (
			<div className="container">
				<form className="main-form" onSubmit={this.onSubmitForm}>
					<input className="main-form__input" type="text" placeholder="Try '15000'" value={this.state.input} onChange={this.onInputChange} />
					<button className="main-form__btn" type="submit">Go</button>
				</form>
			</div>
		);
	}
}

export default App;
