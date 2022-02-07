import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./LoginPage.css";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";

const apiURL = process.env.REACT_APP_SERVER_URL;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        // "http://localhost:5005/auth/login",
        `${apiURL}/auth/login`,
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const token = response.data.authToken;
      logInUser(token);
      navigate("/");
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <>
      <Card className="login-form">
        <CardBody>
          <h1>Login</h1>
          <Form inline onSubmit={handleLoginSubmit}>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                // value={email}
                onChange={handleEmail}
              />
              <Label className="input-form" for="exampleEmail">
                Email
              </Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handlePassword}
              />
              <Label className="input-form" for="examplePassword">
                Password
              </Label>
            </FormGroup>{" "}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button>Submit</Button>
          </Form>
          <p>Don't have an account yet?</p>

          <Link to={"/signup"}>
            <Button color="info" outline>
              Sign Up
            </Button>
          </Link>
        </CardBody>
      </Card>
    </>
  );
}

export default LoginPage;
