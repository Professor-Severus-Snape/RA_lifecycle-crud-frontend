interface IOptions {
  method: string;
  url: string;
  body?: {
    content: string;
  };
  // TODO: надо ли передавать params ???
  // params?: {
  //   id: number;
  // };
}

export default IOptions;
