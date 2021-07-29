import React from 'react';
import Polls from '../polls.json';
import '../App.css';

class Card extends React.Component {
    render() {
        return (
            <div> {Polls.map((poll) => {
                        return(
                            <div className="card mb-4">
                                <div className="poll-image">
                                    <img src={poll.image}/>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-truncate font-weight-bold">
                                        {poll.question}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{poll.votes.reduce((a, b) => {return a + b;})} votes</small>
                                        <small className="badge badge-success">{poll.voted ? 'voted' : null}</small>
                                    </div>
                                </div>
                            </div>
                                )
                            }
                        )
                    }
            </div>
        )
    }
}

export default Card;