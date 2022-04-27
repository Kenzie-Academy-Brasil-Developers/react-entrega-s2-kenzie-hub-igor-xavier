import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

function Signin({ authenticated, setAuthenticated, setUsuario }) {
  const history = useHistory();
  const formSchema = yup.object().shape({
    email: yup.string().required("Preencha o e-mail"),
    password: yup.string().required("Insira a senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmitFunction = ({ email, password }) => {
    const user = {
      email,
      password,
    };

    api
      .post("/sessions", user)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("@kenzieHub:token", JSON.stringify(token));
        setUsuario(user);
        setAuthenticated(true);
        return history.push("/userPage");
      })
      .catch((err) =>
        toast.error("Email ou senha incorretos", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };
  if (authenticated) {
    <Redirect to="/userPage" />;
  }
  return (
    <>
      <h4 className="kenzie-hub">Kenzie Hub</h4>
      <div className="container">
        <h6>Login</h6>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <label>Email</label>
          <input placeholder="E-mail" {...register("email")} />
          <p className="error"> {errors.email?.message}</p>
          <label>Senha</label>
          <input
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          <p className="error"> {errors.password?.message}</p>
          <button type="submit">Entrar</button>
        </form>
        <label className="texto-detalhe">Ainda não possui uma conta?</label>
        <button onClick={() => history.push("/signup")}>Cadastre-se</button>
      </div>
    </>
  );
}
export default Signin;
