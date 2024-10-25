import { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import NoteList from './components/NoteList/NoteList';
import Title from './components/Title/Title';

const App = () => {
  const [note, setNote] = useState(''); // текст заметки -> "Lorem"
  const [list, setList] = useState([]); // массив заметок [{id: 0, content: "Lorem"}, {...}, ...]

  console.log('list: ', list); // NOTE: отладка

  // обработчик cобытия 'change' на textarea:
  const handleChange = (textNote: string) => {
    setNote(textNote); // ререндер (состояние note) -> обновление поля textarea
  };

  // обработчик cобытия 'submit' на форме:
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, textNote: string) => {
    event.preventDefault();
    if (!textNote) {
      // TODO: добавить подсказку !!!
      setNote(''); // ререндер (состояние note) -> сброс невалидного textarea
      return;
    }

    // если данные полей ввода валидны и полные:
    const createRequest = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          content: textNote,
        }),
      };

      await fetch('http://localhost:7070/notes', options); // NOTE: POST-запрос на сервер

      const response = await fetch('http://localhost:7070/notes'); // NOTE: GET-запрос на сервер
      if (response.ok) {
        const json = await response.json(); // [{id: 0, content: "Lorem"}, {id: 0, content: "Ipsum"}]
        setList(json);
      }
    };

    createRequest();

    setNote(''); // ререндер (состояние note) -> очистка полей формы
  };

  // первоначальная отрисовка компонента с данными, полученными с сервера:
  useEffect(() => {
    const createRequest = async () => {
      // TODO: добавить try-catch, сделать универсальную функцию, вынести переменную урл-а
      const response = await fetch('http://localhost:7070/notes'); // NOTE: GET-запрос на сервер
      const json = await response.json(); // [{id: 0, content: "Lorem ipsum"}, {...}, {...}, ...]
      setList(json); // переносим данные от сервера в состояние list
    };

    createRequest();
  }, []);

  const onRefresh = () => {
    setNote(''); // ререндер (состояние note) -> очистка полей формы

    const createRequest = async () => {
      // TODO: добавить try-catch, сделать универсальную функцию, вынести переменную урл-а
      const response = await fetch('http://localhost:7070/notes'); // NOTE: GET-запрос на сервер
      const json = await response.json(); // [{id: 0, content: "Lorem ipsum"}, {...}, {...}, ...]
      setList(json); // переносим данные от сервера в состояние list
    };

    createRequest();
  };

  const onRemove = (id: number) => {
    const createRequest = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        params: JSON.stringify(id),
      };
      // TODO: добавить try-catch, сделать универсальную функцию, вынести переменную урл-а
      await fetch(`http://localhost:7070/notes/${id}`, options); // NOTE: DELETE-запрос на сервер

      // TODO: добавить try-catch, сделать универсальную функцию, вынести переменную урл-а
      const response = await fetch('http://localhost:7070/notes'); // NOTE: GET-запрос на сервер
      const json = await response.json(); // [{id: 0, content: "Lorem ipsum"}, {...}, {...}, ...]
      setList(json); // переносим данные от сервера в состояние list
    };

    createRequest();
  };

  return (
    <>
      <Title onRefresh={onRefresh} />
      <NoteList list={list} onRemove={onRemove} />
      <Form note={note} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
};

export default App;
