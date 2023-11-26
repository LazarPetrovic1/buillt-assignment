// @ts-ignore
import cookie from 'cookie-cutter';
import { Container, Box, TextField, Typography, Button } from "@mui/material";
import { ReactElement, useState } from "react";
import { Centralizer } from "../styled";
import { makeStyles } from "@mui/styles";
import { authActions } from "../store/actions";
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { alert } from '../store/types';
import { alertFactory } from '../utils';

const loginFn = authActions.login;

const useStyles = makeStyles((theme) => ({
  textbg: {
    "& .MuiFilledInput-root": {
      background: "transparent",
      "&:hover": { background: "transparent" },
      "&:focus": { background: "transparent" },
      "&:focus-within": { background: "transparent" }
    }
  }
}));

// @ts-ignore
function Login({ loginFn }) : ReactElement {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const navigate = useNavigate()

  const login = async () => {
    try {
      const data = await loginFn({ email, password });
      
      if (data.token) {
        const alertItem = alertFactory("success", "Successfully logged in.");
        dispatch({ type: alert.SET_ALERT, payload: alertItem });
        cookie.set("token", data.token);
        navigate("/");
      }
      // res.data.msg exists
      else {
        const alertItem = alertFactory("error", data.msg);
        dispatch({ type: alert.SET_ALERT, payload: alertItem });
      }
    } catch (e) { console.warn("Error", e); }
  };

  return (
    <Centralizer>
      <Container maxWidth="sm">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component='h5'><b>Prijavi se na svoj nalog</b></Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField onChange={(e) => setEmail(e.target.value)} value={email} className={classes.textbg} fullWidth variant="filled" label="E-mail adresa" />
        </Box>
        <Box sx={{ mt: 2, mb: 4 }}>
          <TextField type='password' onChange={(e) => setPassword(e.target.value)} value={password} className={classes.textbg} fullWidth variant="filled" label="Upišite šifru" />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button
            onClick={login}
            style={{ borderRadius: "1rem", background: "black", color: "white" }}
            fullWidth variant="contained" disableElevation
          >Prijavi se na nalog</Button>
        </Box>
      </Container>
    </Centralizer>
  )
}

export default connect(null, { loginFn })(Login);