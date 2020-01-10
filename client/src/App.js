import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      taskName: '',
    };

  this.changeValue = this.changeValue.bind(this);
  this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.socket = io( 'http://localhost:8000' );

    //Listeners
    this.socket.on('addTask', (taskName) => {this.addTask(taskName)});
    this.socket.on('removeTask', (index, task) => {this.removeTask(index, task)});
    this.socket.on('updateData', (tasks) => {this.updateData(tasks)});
  }

  updateData(tasks) {
    console.log(tasks)
    this.state.tasks = tasks;
    this.setState(this.state.tasks)
  }

  removeButton(task) {
    console.log(task);
    const index = this.state.tasks.indexOf(task);
    this.removeTask(index, task);
  }

  removeTask(index, task){
    if(this.state.tasks.includes(task)){
    this.setState(this.state.tasks.splice(index, 1))
    this.socket.emit('removeTask', index, task)
    }
  }

  async changeValue(event){
    await this.setState({taskName: event.target.value});
    console.log(this.state.taskName);
  }

  submitForm(event) {
    event.preventDefault();
    this.addTask(this.state.taskName);
  }

  addTask(task) {
    if(!this.state.tasks.includes(task)){
    this.state.tasks.push(task);
    this.setState(this.state.tasks);
    this.socket.emit('addTask', task);
    }
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
            <li key={task} className="task">{task}<button onClick={() => this.removeButton(task)} className="btn btn--red" id="remove-button">Remove</button></li>
            ))}
          </ul>

          <form id="add-task-form" onSubmit={this.submitForm}>
            <input className="text-input" autoComplete="off" type="text" placeholder="Type what is to do" id="task-name" value={this.state.taskName} onChange={this.changeValue}></input>
            <button className="btn" type="submit">Add</button>
          </form>
        </section>
      </div>
    );
  }
}

export default App;
