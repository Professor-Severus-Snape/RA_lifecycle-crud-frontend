import { useEffect, useState } from 'react';
import { pingAPI, getAPI, postAPI, deleteAPI } from './libs/api';
import Form from './components/Form/Form';
import Load from './components/Load/Load';
import NoteList from './components/NoteList/NoteList';
import ServerError from './components/ServerError/ServerError';
import Title from './components/Title/Title';

const App = () => {
  const [note, setNote] = useState(''); // текст заметки -> "Lorem"
  const [list, setList] = useState([]); // массив заметок [{id: 0, content: "Lorem"}, {...}, ...]
  const [isLoad, setIsLoad] = useState(false); // подключение к серверу
  const [isFound, setIsFound] = useState(false); // ошибка подключения к серверу

  // первоначальная отрисовка компонента с данными, полученными с сервера:
  useEffect(() => {
    (async () => {
      const server = await pingAPI(); // ждём ответа от сервера
      setIsLoad(true);

      // обработка ошибки подключения к серверу:
      if (server.status === 520) {
        return; // выходим и отрисовываем ошибку сервера
      }

      setIsFound(true); // связь с сервером установлена
      const data = await getAPI(); // GET-запрос на сервер
      setList(data); // ререндер (состояние list) -> актуализация массива заметок
    })();
  }, []);

  // обработчик cобытия 'change' на textarea:
  const handleChange = (textNote: string) => {
    setNote(textNote); // ререндер (состояние note) -> обновление поля textarea
  };

  // обработчик cобытия 'submit' на форме:
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    textNote: string
  ) => {
    event.preventDefault();
    if (!textNote) {
      setNote(''); // ререндер (состояние note) -> сброс невалидного textarea
      return;
    }

    await postAPI(note); // POST-запрос на сервер
    const data = await getAPI(); // GET-запрос на сервер
    setList(data); // ререндер (состояние list) -> актуализация массива заметок
    setNote(''); // ререндер (состояние note) -> очистка полей формы
  };

  const onRefresh = async () => {
    const data = await getAPI(); // GET-запрос на сервер
    setList(data); // ререндер (состояние list) -> актуализация массива заметок
    setNote(''); // ререндер (состояние note) -> очистка полей формы
  };

  const onRemove = async (id: number) => {
    await deleteAPI(id); // DELETE-запрос на сервер
    const data = await getAPI(); // GET-запрос на сервер
    setList(data); // ререндер (состояние list) -> актуализация массива заметок
  };

  return !isLoad ? (
    <Load /> // FIXME: как убрать мелькание компонента Load при загрузке и перезагрузке веб-страницы
  ) : !isFound ? (
    <ServerError />
  ) : (
    <>
      <Title onRefresh={onRefresh} />
      <NoteList list={list} onRemove={onRemove} />
      <Form note={note} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
};

export default App;
