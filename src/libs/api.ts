import createRequest from "./createRequest";

// проверка связи с сервером:
export const pingAPI = async() => {
  console.warn('GET-ping'); // NOTE: отладка

  const options = {
    method: 'GET',
    url: '/ping',
  };

  const data = await createRequest(options); // { status: 204, message: 'Server found!' }
  return data;
}

// GET-запрос на сервер - получение массива заметок:
export const getAPI = async () => {
  console.warn('GET'); // NOTE: отладка

  const options = {
    method: 'GET',
    url: '/notes',
  };

  const data = await createRequest(options);
  return data;
};

// POST-запрос на сервер - обновление массива заметок на сервере:
export const postAPI = async (note: string) => {
  console.warn('POST'); // NOTE: отладка

  const options = {
    method: 'POST',
    url: '/notes',
    body: {
      content: note,
    },
  };

  await createRequest(options);
};

// DELETE-запрос на сервер - удаление заметки на сервере по id:
export const deleteAPI = async (id: number) => {
  console.warn('DELETE'); // NOTE: отладка

  const options = {
    method: 'DELETE',
    url: `/notes/${id}`,
    // FIXME: надо ли здесь передавать params ???
    // params: {
    //   id: id,
    // },
  };

  await createRequest(options);
};
