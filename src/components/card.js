import React from 'react';
import '../App.css';

class Card extends React.Component {

    handleVoted = (voted, id) => () => {
        this.props.pollVoted(voted, id);
    }

    render() {

        return (

            <div> {this.props.polls.reverse().map((poll) => {
                        return(
                            <div key={poll.id} className="card mb-4" onClick={this.handleVoted(poll.voted, poll.id)}>
                                <div className="poll-image">
                                    <img src={poll.image} alt="Poll thumbnail"/>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-truncate font-weight-bold">
                                        {poll.question}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{poll.votes.reduce((a, b) => {return a + b;})} голосов</small>
                                        <small className="badge badge-success" >{poll.voted ? 'участие' : null}</small>
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