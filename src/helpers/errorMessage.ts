import toast from "react-hot-toast";

function errorMessage(err) {
  if (err) {
    if (err.response.data && err.response.data.message) {
      if (err.response.data.message instanceof Array) {
        err.response.data.message.map((e: any) => {
          toast.error(e.charAt(0).toUpperCase() + e.slice(1) + '.', {
            duration: 2000,
            position: 'bottom-center',
          });
        });
      } else {
        toast.error(err.response.data.message.charAt(0).toUpperCase() + err.response.data.message.slice(1) + '.', {
          duration: 2000,
          position: 'bottom-center',
        });
      }


    } else {
      toast.error(err.message, {
        duration: 2000,
        position: 'bottom-center',
      });
    }
  }
}

export default errorMessage;
