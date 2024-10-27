import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { schema, FormData } from "../pages/NewUser/validation";
import api from "~/services/api";
import routes from "~/router/routes";

export const useNewUser = () => {
  const history = useHistory();
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: "",
      email: "",
      cpf: "",
      admissionDate: ""
    },
  });

  const goToHome = () => history.push(routes.dashboard);

  const handleSubmit = async (data: FormData) => {

    try {
      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
        status: "REVIEW",
        id: String(Date.now())
      };
      await api.post("/registrations", formattedData);
      goToHome();
    } catch (error) {
      console.error("Error creating registration:", error);
    }
  };

  return {
    form,
    goToHome,
    handleSubmit
  };
};

