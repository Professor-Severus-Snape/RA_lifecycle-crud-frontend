import NoteItem from '../NoteItem/NoteItem';
import './noteList.css';

const NoteList = () => {
  return (
    <ul className="note-list">
      <NoteItem />
      <NoteItem />
      <NoteItem />
    </ul>
  );
};

export default NoteList;
