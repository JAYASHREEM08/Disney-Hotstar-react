import React from 'react';

const continueData = [
  { title: "Anupamaa", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMtp97_F4KFyAOWySyIp-4iwEI0gjDb9nVIdhwc0mi_A&s" },
  { title: "Dhurandhar 2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOsIZkUEKdZS_DBizRO_PjWxtw5jVbqcyDMTImKpFdhUuBTZGtslX64c&s=10" },
  { title: "Resort", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Nnm-00kk2DP-p5TIWo9jsWDD9ojsmAL_5rX9RAaEj3AL9gHy_sEhwLTx&s=10" },
  { title: "Brother & Sister", img: "https://i.ytimg.com/vi/9sohpUwfYh0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB3dRAsjtS0hX22JTvQBcNKDYwkmg" },
  { title: "Pushpa 2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTq-TTO09XmPuH4h394d3VPT9oGyDz09AXPzvXvi3RpoJX3mcEbjdXgM&s=10" },
  { title: "Avengers Endgame", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_yGFzd7040jgswoaBlSw_vU-YnyciU7UvB9oBiIvfw&s=10" }
];

const ContinueWatching = () => {
  return (
    <section className="row">
      <h2>Continue Watching</h2>
      <div className="continue-container">
        {continueData.map((item, index) => (
          <div className="continue-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="title">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;