export function saveVoteHistory (voteHistory) {
    localStorage.setItem('FlipMe.voteHistory', JSON.stringify(voteHistory));
}

export function loadVoteHistory () {
    let voteHistory;
    try {
      voteHistory = JSON.parse(localStorage.getItem('FlipMe.voteHistory'));
      if (!voteHistory) {
        voteHistory = [];
      }
    }
    catch {
      voteHistory = [];
    }
    return voteHistory;
}

export function saveCurrentVote (vote) {
    if (vote) {
        const date = new Date();
        vote.date = date.toLocaleString();
    }
    localStorage.setItem("FlipMe.currentVote", JSON.stringify(vote));
}

export function loadCurrentVote () {
    let vote;
    try {
      vote = JSON.parse(localStorage.getItem('FlipMe.currentVote'));
    }
    catch { 
      vote = null;
    }
    return vote;
}