import './noteItem.css';

const NoteItem = () => {
  return (
    <li className="note-item">
      <p className="note-item__content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eius,
        exercitationem consequatur voluptas nobis commodi quibusdam, culpa
        necessitatibus debitis veniam numquam voluptatum dignissimos, quisquam
        inventore excepturi? Rerum eos vel quis.
      </p>
      <div className="note-item__close-btn">
        <span className="note-item__close-btn_first"></span>
        <span className="note-item__close-btn_second"></span>
      </div>
    </li>
  );
};

export default NoteItem;
