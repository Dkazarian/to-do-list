import * as React from 'react';
import * as uuid from 'uuid';
import Item from './item';
import './style.css';

export interface Task {
  key: string;
  text: string;
  done: boolean;
};

interface StateType {
  done: Task[];
  pending: Task[];
}

const createTask = (text: string, val = false) : Task => (
  { key: uuid(), text, done: val}
);

const demo = () : StateType => ({
  pending: [createTask('test'), createTask('test2'), createTask('test3')],
  done: [createTask('test4', true), createTask('test25', true)],
});

class List extends React.Component<{}, StateType> {
  state : StateType = demo();
  render() {
    const { done, pending } = this.state;
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