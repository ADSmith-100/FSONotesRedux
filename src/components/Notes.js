import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
      notes: state.notes,
    };
  }
  return {
    notes:
      state.filter === "IMPORTANT"
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default ConnectedNotes;

// const Notes = () => {
//   const dispatch = useDispatch();
//   const notes = useSelector(({ filter, notes }) => {
//     if (filter === "ALL") {
//       return notes;
//     }
//     return filter === "IMPORTANT"
//       ? notes.filter((note) => note.important)
//       : notes.filter((note) => !note.important);
//   });
//   return (
//     <ul>
//       {notes.map((note) => (
//         <Note
//           key={note.id}
//           note={note}
//           handleClick={() => dispatch(toggleImportanceOf(note.id))}
//         />
//       ))}
//     </ul>
//   );
// };

// export default Notes;

//this part is to demonstrate how the older connect function works.
//Should def use hook-api (useSelector and useDispatch) this is just so you can understand connect in older code...
