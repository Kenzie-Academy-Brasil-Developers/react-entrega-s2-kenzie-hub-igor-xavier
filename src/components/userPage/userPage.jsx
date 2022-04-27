import { Redirect } from "react-router-dom";
import Listagem from "./Listagem";
import Card from "./Card";
import Modal from "react-modal";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
function UserPage({ authenticated, usuario }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("@kenzieHub:token"));
  const formSchema = yup.object().shape({
    title: yup.string().required("Preencha a tecnologia"),
    status: yup.string().required("Preencha o status"),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });
  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  function sair() {
    localStorage.clear();
    history.push("/");
  }

  const onSubmitFunction = ({ title, status }) => {
    handleCloseModal();
    const tech = {
      title,
      status,
    };
    api
      .post("/users/techs", tech, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <nav className="userPageNav">
        <h5 className="kenzie-hub">Kenzie Hub</h5>
        <button className="voltar" onClick={sair}>
          Sair
        </button>
      </nav>
      <div className="hello">
        <h5>Olá {usuario.name}</h5>
        <label className="texto-detalhe">{usuario.course_module}</label>
      </div>
      <div className="tech-add">
        <h5>Tecnologias</h5>
        <button className="bt-add" onClick={handleOpenModal}>
          +
        </button>
      </div>
      <Modal
        className="modal"
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
      >
        <div className="header-modal">
          <h2>Cadastrar tecnologia</h2>
          <button className="close-modal" onClick={handleCloseModal}>
            X
          </button>
        </div>
        <div>
          <form
            className="form-techs"
            onSubmit={handleSubmit(onSubmitFunction)}
          >
            <label className="label-modal">Nome</label>
            <input
              className="input-modal"
              placeholder="Tecnologia"
              {...register("title")}
            />
            <label className="label-modal">Selecionar status</label>
            <select className="input-modal" {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button className="input-modal" type="submit">
              Cadastrar Tecnologia
            </button>
          </form>
        </div>
      </Modal>
      <div className="tech-list">
        <Listagem user={usuario.id} Card={Card} />
      </div>
    </>
  );
}
export default UserPage;
