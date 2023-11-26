import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/reducers";
import { AlertItem, alert } from "../store/types";
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AlertsWrapper } from "../styled";

const AlertList = () => {
  const alerts = useSelector<RootReducer, AlertItem[]>(state => state.alerts)
  const dispatch = useDispatch();
  const removeAlert = (id : string) => dispatch({ type: alert.REMOVE_ALERT, payload: id });
  return (
    <AlertsWrapper>
      {(alerts !== null && alerts.length > 0) && alerts.map(({ id, severity, msg }) => (
        <Alert sx={{ cursor: "pointer", my: 1, border: "1px solid black" }} onClick={() => removeAlert(id)} key={id} severity={severity as AlertColor}>
          <AlertTitle sx={{ m: 0 }}>{msg}</AlertTitle>
        </Alert>
      ))}
    </AlertsWrapper>
  )
}

export default AlertList;