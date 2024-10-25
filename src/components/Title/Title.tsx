import refresh from '../../assets/refresh.svg';
import './title.css';

const Title = () => {
  return (
    <div className="title">
      <h1 className="title__text">Notes</h1>
      <div className="title__btn">
        <img className="title__refresh-btn" src={refresh} alt="refresh" />
      </div>
    </div>
  );
};

export default Title;
