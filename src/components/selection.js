import React from 'react';
//import Polls from '../polls.json';

class Selection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.poll.id
        }
        this.ValChange = this.ValChange.bind(this);
        this.SubmitForm = this.SubmitForm.bind(this);
    }

    ValChange = (event) => {
        this.setState({
            status: true,
            value: event.target.value,
        });
    }

    SubmitForm = (event) => {
        event.preventDefault();
        this.props.vote(this.state.id, this.state.value) // pollId: this.state.id, selectedAnswer: this.state.value
    }

    render() {

        return (

                <div>
                        <form onSubmit={this.SubmitForm}>
                            <h3>{this.props.poll.question}</h3>

                            <div className="form-check">
                                {this.props.poll.options.map((opt, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                className="form-check-input"
                                                name="radiobutton"
                                                type="radio"
                                                value={index}
                                                onChange={this.ValChange}/>
                                            <label className="form-check-label">{opt}</label>
                                        </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            <button className="btn btn-secondary mt-3" type="submit" disabled={false === this.state.status}>Отправить</button>
                        </form>
                </div>
        )
    }
}

export default Selection;