import React from 'react';
//import ReactDOM from 'react-dom';
import uuid from 'uuid';
import Notes from './Notes.jsx';
import connect from '../libs/connect.jsx';

import NoteActions from '../actions/NoteActions.js';



class App extends React.Component {
  render() {
    const {notes} = this.props;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>

        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
          />
      </div>
    );
  }
addNote = () => {
    this.props.NoteActions.create({
      id: uuid.v4(),
      task: 'New task'
    });
  }
deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.props.NoteActions.delete(id);
  }
activateNoteEdit = (id) => {
    this.props.NoteActions.update({id, editing: true});
  }
editNote = (id, task) => {
    this.setState({
        notes: this.state.notes.map(note => {
            if(note.id === id) {
                note.editing = false;
                note.task = task;
            }

            return note;
        })
    });
}
}

export default connect(({notes}) => ({
  notes
}),{
  NoteActions
})(App)
