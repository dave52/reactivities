import { history } from "../helpers/history";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  history.navigate = useNavigate();
    history.location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route
          path={"/*"}
          element={
            <>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Routes>
                  <Route path="/activities" Component={ActivityDashboard} />
                  <Route path="/activities/:id" Component={ActivityDetails} />
                  <Route
                    path="/createActivity"
                    element={<ActivityForm key={history.location.key} />}
                  />
                  <Route
                    key={history.location.key}
                    path="/manage/:id"
                    element={<ActivityForm key={history.location.key} />}
                  />
                  <Route path="/errors" Component={TestErrors} />
                  <Route path="/server-error" Component={ServerError} />
                  <Route path="*" Component={NotFound} />
                </Routes>
              </Container>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default observer(App);
