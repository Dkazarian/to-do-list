import * as React from 'react';
import { Task } from './types';
import Item from './item';
import Modal from './add-task';
import './style.css';


interface StateType {
  showModal: boolean;
  done: Task[];
  pending: Task[];
}

class List extends React.Component<{}, StateType> {
  state : StateType = { pending: [], done: [], showModal: false };

  handleSubmit = (newTask: Task) => {
    const { pending } = this.state;
    this.setState({ pending: [...pending, newTask] });
    this.toggleModal();
  }

  toggleModal = () => {
    const { showModal } = this.state;
    return this.setState({ showModal: !showModal });
  };

  render() {
    const { done, pending, showModal } = this.state;
    return (
      <div className="to-do-list">
        <div className="table">
          <div className="pending-tasks">
            <p className="title">PENDING</p>
            <div>
              {pending.map(t =>
                <Item key={t.key} task={t} onChange={this.handleChange} />
              )}
            </div><br/>
          </div>
          <div className="done-tasks">
            <p className="title">DONE</p>
            <div>
              {done.map(t =>
                <Item key={t.key} task={t} onChange={this.handleChange} />
              )}
            </div>
          </div>
        </div>
        { showModal && <Modal
          onClose={this.toggleModal}
          onSubmit={this.handleSubmit}
        />}
        <button onClick={this.toggleModal}>New task</button>
      </div>
    );
  }

  handleChange = (key: string, value: boolean) => {
    const { done, pending } = this.state;
    const task = (value ? pending : done).find(t => t.key === key);

    if (!task) return;

    task.done = value;

    if (value) {
      this.setState({
        done: [...done, task],
        pending: pending.filter(p => p.key !== key),
      });
    } else {
      this.setState({
        done: done.filter(d => d.key !== key),
        pending: [...pending, task],
      });
    }
  }
}

export default List;