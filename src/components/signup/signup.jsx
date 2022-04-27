import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

function Signup({ authenticated }) {
  const history = useHistory();
  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Mínimo de 6 caracteres"),
    confirmPassword: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "As senhas devem ser idênticas"),
    course_module: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmitFunction = ({ name, email, password, course_module }) => {
    const user = {
      email,
      password,
      name,
      course_module,
      bio: "Lorem ipsum dolor emet",

      contact: "não possui",
    };
    api
      .post("/users", user)
      .then((_) => {
        toast.success("Conta criada com sucesso!");
        return history.push("/");
      })
      .catch((err) =>
        toast.error("Ops! Algo deu errado.", {
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

  return (
    <>
      <nav>
        <h4 className="kenzie-hub">Kenzie Hub</h4>
        <button className="voltar" onClick={() => history.push("/")}>
          Voltar
        </button>
      </nav>
      <div>
        <h6>Crie sua conta</h6>
        <label className="texto-detalhe">Rápido e grátis, vamos nessa</label>

        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <label>Nome</label>
          <input placeholder="Digite aqui seu nome" {...register("name")} />
          <p className="error"> {errors.name?.message} </p>
          <label>Email</label>
          <input placeholder="Digite aqui seu email" {...register("email")} />
          <p className="error"> {errors.email?.message}</p>
          <label>Senha</label>
          <input
            placeholder="Digite aqui sua senha"
            type="password"
            {...register("password")}
          />
          <p className="error"> {errors.password?.message}</p>
          <label>Confirmar Senha</label>
          <input
            placeholder="Digite novamente sua senha"
            type="password"
            {...register("confirmPassword")}
          />
          <p className="error">{errors.confirmPassword?.message}</p>
          <label>Selecionar módulo</label>
          <select {...register("course_module")}>
            <option value="Primeiro módulo (Frontend Iniciante)">
              Primeiro módulo
            </option>
            <option value="Segundo módulo (Frontend Intermediário)">
              Segundo módulo
            </option>
            <option value="Terceiro módulo (Frontend Avançado)">
              Terceiro módulo
            </option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}
export default Signup;
