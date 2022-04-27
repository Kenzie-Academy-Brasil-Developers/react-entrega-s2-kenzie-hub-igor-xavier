import api from "../../services/api";
import { useState } from "react";
function Listagem({ user, Card }) {
  const [techs, setTechs] = useState([]);
  api
    .get(`/users/${user}`)
    .then((response) => {
      setTechs(response.data.techs);
    })
    .catch((err) => console.log(err));
  return (
    <ul>
      {techs.map((results) => {
        return (
          <li key={results.id}>
            <Card title={results.title} status={results.status} />
          </li>
        );
      })}
    </ul>
  );
}

export default Listagem;
