import Http from "./Axios";

const Service = () => {
  const Get = async (url: any) => {
    return (await Http.get(url)).data;
  };

  const Post = async (url: any, data?: any, headers = {}) => {
    return (await Http.post(url, data, headers)).data;
  };

  const Put = async (url: any, data?: any) => {
    return (await Http.put(url, data)).data;
  };

  const Patch = async (url: any, data?: any) => {
    return (await Http.patch(url, data)).data;
  };

  const Delete = async (url: any, data?: any) => {
    return (await Http.delete(url, data)).data;
  };

  return { Get, Post, Put, Patch, Delete };
};

export default Service();
