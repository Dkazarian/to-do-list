import * as React from 'react';
import { Task } from './types';

interface PropTypes {
  task: Task;
  onChange: (key: string, value: boolean) => void;
}

class Item extends React.Component<PropTypes> {
  render() {
    const { task } = this.props;
    return <div className="item">
      <input
        defaultChecked={task.done}
        onChange={this.handleChange}
        type='checkbox'
      />&nbsp;
      <span>{task.text}</span>
    </div>;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, task } = this.props;
    return onChange(task.key, event.target.checked);
  };
}

export default Item;