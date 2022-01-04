import { useEffect, useState } from "react";
import axios from "axios";

const UseApi = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: result } = await axios(url);
      setData(result);
    })();
  }, [url]);

  return data;
};

export default UseApi;
