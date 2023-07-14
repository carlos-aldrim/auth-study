import { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

import { PageRoutes } from "@/pages";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "@/contexts/user";
import { useToast } from "@/hooks/useToast";
import { validatePassword } from "@/utils/validation";
import { userLogin } from "@/config/types";

export const LoginUser = () => {
  const { login, auth, user } = useContext(UserContext);
  const { handleToastError } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      handleToastError("Nenhum campo vazio.");
      return;
    }

    if (!validatePassword(password)) {
      handleToastError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    const newUser: userLogin = {
      email: email,
      password: password,
      admin: 0
    }

    login(newUser);
  };

  if(auth === true && user.admin === 0) {
    return <Navigate to="/home" />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        margin: "20px auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Typography sx={{ fontSize: 26 }}>
        Entre em sua conta ou cadastre-se
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="informe seu email"
        />
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="informe sua senha"
        />
        <Button onClick={handleLogin}>Log IN</Button>
      </Box>
      <Typography>
        Caso não tenha um conta, basta{" "}
        <Link to={PageRoutes.signin}>Cadastrar-se</Link>.
      </Typography>
    </Box>
  );
};