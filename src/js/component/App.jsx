import React from "react";
import { useFetch } from "../useFetch";
import "../../styles/index.css";

export function App() {
  const { data, loading, error } = useFetch(
    "https://playground.4geeks.com/apis/fake/todos/"
  );
  return (
    <div className="App">
      <h1>Probando Fetch</h1>
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
