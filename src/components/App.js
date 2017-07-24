import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div id="intro">
            <div className="width">
              <h2>Launch calendar</h2>
              <h3>
                by <a href="https://meowsergirl.com/">Joyce Lin</a>
                <span className="spacer"> | </span>
                <i className="fa fa-medium fa-lg" /> Read on <a href="https://medium.com/@joycelin.codes/evolution-of-web-server-operating-systems-ba1cf1c1e3d8">Medium</a>
                <span className="spacer"> | </span>
                <i className="fa fa-github fa-lg" /> Fork me on <a href="https://github.com/loopDelicious/space-launch">Github</a>

              </h3>

            </div>
          </div>
          <div className="intro-p">
            <div className="width">
              <div className="section intro-text">
                <p>Intro text.</p>
                <p>Have your own story to tell? <a href="https://github.com/loopDelicious/space-launch">Fork this project on GitHub</a> and make your own visualizations.</p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
