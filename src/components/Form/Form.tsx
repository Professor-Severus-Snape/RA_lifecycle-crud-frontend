import send from '../../assets/send.png';
import './form.css';

const Form = () => {
  return (
    <form className="form">
      <h3 className="form__title">New Note</h3>
      <label htmlFor="new-note" className="form__label visually-hidden">
        New Note
      </label>
      <textarea id="new-note" className="form__textarea" />
      <button className="form__button" type="submit">
        <img src={send} alt="send" className="form__button-img" />
      </button>
    </form>
  );
};

export default Form;
