import React from 'react';
import io from 'socket.io-client';
import ReactHtmlParser from 'react-html-parser';



class App extends React.Component {

  componentDidMount() {
    this.socket = io( 'http://localhost:8000' );
  }

  clicker(task) {
    console.log(task);
  }
  render() {

    const tasks = ['cos', 'nic'];
    /*document.body.addEventListener('click', function(event){
      if(event.srcElement.id === "remove-button") {
        console.log('klik', event.srcElement.parentNode.firstChild.data);
        const taskName = event.srcElement.parentNode.firstChild.data;
        console.log('taskName = ', taskName)
        for(let task of tasks){
          if(task == taskName){
            console.log(tasks.indexOf(task));
            const index = tasks.indexOf(task);
            tasks.splice(index, 1)
            console.log(tasks);
            
          }
        }
      }
    })*/
    return (
      <div className="App">
        <header>
          <h1>ToDo List.app</h1>          
        </header>

        <section className="task-section" id="task-section">
          <h2>Tasks</h2>

          <ul className="task-section__list" id="task-list">
            {tasks.map(task => (             
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
