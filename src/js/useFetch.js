import { useState, useEffect } from "react";

export const useFetch = (url, { method = "GET", body }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new abortController();
    setController(abortController);
    setLoading(true);

    fetch(
      url,
      {
        method,
        body: body ? JSON.stringify(body) : undefined,
      },
      { signal: abortController.signal }
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          setError(error);
        }
      })

      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request cancelled");
    }
  };

  return { data, loading, error };
};
