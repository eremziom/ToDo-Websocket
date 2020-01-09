import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: ['cos', 'nic'],
  };

  componentDidMount() {
    this.socket = io( 'http://localhost:8000' );
  }

  clicker(task) {
    console.log(task);
    const index = this.state.tasks.indexOf(task);
    this.removeTask(index);
  }

  removeTask(index){
    console.log('index to: ', index);
    console.log('przed ', this.state.tasks)
    this.setState(this.state.tasks.splice(index, 1))
    console.log('po', this.state.tasks)
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>ToDo List.app</h1>          
        </header>

        <section className="task-section" id="task-section">
          <h2>Tasks</h2>

          <ul className="task-section__list" id="task-list">
            {this.state.tasks.map(task => (             
            <li key={task} className="task">{task}<button onClick={() => this.clicker(task)} className="btn btn--red" id="remove-button">Remove</button></li>
            ))}
          </ul>

          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type what is to do" id="task-name"></input>
            <button className="btn" type="submit">Add</button>
          </form>
        </section>
      </div>
    );
  }
}

export default App;
