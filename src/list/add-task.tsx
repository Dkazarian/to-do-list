import * as React from 'react';
import Modal from 'react-responsive-modal';
import { createTask, Task } from './types';

interface PropTypes {
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

interface StateTypes {
  text?: string;
}


class AddTask extends React.Component<PropTypes, StateTypes> {
  state: StateTypes = {};

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    e.preventDefault();

    if (!!text)
      onSubmit(createTask(text));
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  render() {
    const { text } = this.state;
    const { onClose } = this.props;
    return <Modal open={true} onClose={onClose} >
      <div className="new-task-form">
        <h1>New task</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label>
            Task:
            <input type="text" value={text} onChange={this.handleChange} />
          </label>
          <input autoFocus={true} type="submit" value="Add" />
        </form>
      </div>
    </Modal>
  }
}

export default AddTask;