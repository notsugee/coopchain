import React, { useState } from 'react';

function VotingSystem() {
  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  const [votedOption, setVotedOption] = useState(null);

  const handleVote = (option) => {
    if (votedOption === null) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [option]: prevVotes[option] + 1,
      }));
      setVotedOption(option);
    } else {
      alert('You have already voted.');
    }
  };

  return (
    <div>
      <h1>Voting System</h1>
      <div>
        <p>Option 1: {votes.option1}</p>
        <button disabled={votedOption !== null} onClick={() => handleVote('option1')}>
          Vote for Option 1
        </button>
      </div>
      <div>
        <p>Option 2: {votes.option2}</p>
        <button disabled={votedOption !== null} onClick={() => handleVote('option2')}>
          Vote for Option 2
        </button>
      </div>
      <div>
        <p>Option 3: {votes.option3}</p>
        <button disabled={votedOption !== null} onClick={() => handleVote('option3')}>
          Vote for Option 3
        </button>
      </div>
      {votedOption !== null && (
        <p>You have voted for {votedOption}. Thank you for your participation!</p>
      )}
    </div>
  );
}

export default VotingSystem;
