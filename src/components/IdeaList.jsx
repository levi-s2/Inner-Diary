import React from 'react';
import IdeaItem from './IdeaItem';

function IdeaList({ ideas }) {
  return (
    <div className="idea-list">
      {ideas.length === 0 ? <p>No ideas yet.</p> : 
        ideas.map((idea, index) => <IdeaItem key={index} idea={idea} />)}
    </div>
  );
}

export default IdeaList;
