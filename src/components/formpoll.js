import React, { Component } from 'react';

class FormPoll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            image: "",
            op1: "",
            op2: "",
            op3: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleOp1Change = this.handleOp1Change.bind(this);
        this.handleOp2Change = this.handleOp2Change.bind(this);
        this.handleOp3Change = this.handleOp3Change.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
    }

    handleQuestionChange(event) {
        //console.log(this.state.question)
        this.setState({question: event.target.value});
    }

    handleImageChange(event) {
        //console.log(this.state.image)
        this.setState({image: event.target.value});
    }

    handleOp1Change(event) {
        //console.log(this.state.op1)
        this.setState({op1: event.target.value});
    }

    handleOp2Change(event) {
        //console.log(this.state.op2)
        this.setState({op2: event.target.value});
    }

    handleOp3Change(event) {
        //console.log(this.state.op3)
        this.setState({op3: event.target.value});
    }

    render() {
    return (
        <form className="container col-sm-4" onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                    Question:
                </label>
                <div className="col-sm-8">
                    <input className="form-control form-control-sm"
                           type="text"
                           placeholder="Enter the poll question"
                           value={this.state.question}
                           onChange={this.handleQuestionChange}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                    Image:
                </label>
                <div className="col-sm-8">
                    <input className="form-control form-control-sm"
                           type="text"
                           placeholder="Enter the URL to image"
                           value={this.state.image}
                           onChange={this.handleImageChange}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                    Options:
                </label>
                <div className="col-sm-8">
                    <input className="form-control form-control-sm"
                           type="text"
                           placeholder="Enter the first option"
                           value={this.state.op1}
                           onChange={this.handleOp1Change}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm"></label>
                <div className="col-sm-8">
                    <input className="form-control form-control-sm"
                           type="text"
                           placeholder="Enter the second option"
                           value={this.state.op2}
                           onChange={this.handleOp2Change}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm"></label>
                <div className="col-sm-8">
                    <input className="form-control form-control-sm"
                           type="text"
                           placeholder="Enter the third option"
                           value={this.state.op3}
                           onChange={this.handleOp3Change}/>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-sm btn-secondary" type="submit">Submit Poll</button>
            </div>
        </form>
        );
    }
}

export default FormPoll;