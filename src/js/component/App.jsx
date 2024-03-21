import React from "react";
import { useFetch } from "../useFetch";
import "../../styles/index.css";

export function App() {
  const { data, loading, error } = useFetch(
    "https://playground.4geeks.com/apis/fake/todos/"
  );

  const handleCancelRequest = () => {
    // Aquí implemento la lógica para cancelar la solicitud
  };

  return (
    <div className="App">
      <h1>Probando Fetch</h1>
      <button onClick={handleCancelRequest}>Cancel Request</button>
      <div className="card">
        <ul>
          {error && <li>Error: {error}</li>}
          {loading && <li>Loading...</li>}
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
