import IOptions from '../models/IOptions';

const createRequest = async (options: IOptions) => {
  const baseUrl = 'http://localhost:7070';
  // const { method, url, body = {}, params = {} } = options;
  const { method, url, body = {} } = options; // TODO: Нужно ли передавать params - ???

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(baseUrl + url);
        return response.ok ? await response.json() : [];
      } catch (err) {
        console.log('error: ', err);
        return [];
      }
    case 'POST':
      try {
        await fetch(baseUrl + url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.log('error: ', err);
      }
      break;
    case 'DELETE':
      try {
        await fetch(baseUrl + url, {
          method,
          // FIXME: нужны ли здесь заголовки ???
          headers: {
            'Content-Type': 'application/json',
          },
          // FIXME: надо ли передавать params ? Откуда они берутся в req на сервере ???
          // params: JSON.stringify(params),
        });
      } catch (err) {
        console.log('error: ', err);
      }
  }
};

export default createRequest;
