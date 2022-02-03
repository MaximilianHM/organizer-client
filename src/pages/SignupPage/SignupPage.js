import axios from "axios";
import { useState } from "react";
import "./SignupPage.css";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const apiURL = process.env.REACT_APP_SERVER_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = {
        email,
        password,
        name,
        image: name[0].toUpperCase(),
      };

      const authToken = localStorage.getItem("authToken");
      await axios.post(
        // 'http://localhost:5005/auth/signup',
        `${apiURL}/auth/signup`,
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      navigate("/login");
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="form-card">
      <Card>
        <CardBody>
          <Form inline onSubmit={handleSignupSubmit}>
            <h1>Sign Up</h1>
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="name"
                placeholder="Name"
                type="text"
                onChange={handleName}
              />
              <Label className="input-form" for="examplePassword">
                Name
              </Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
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
            <p>Already have account?</p>
            <Link to={"/login"}>
              <Button color="success" outline>
                Login
              </Button>
            </Link>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignupPage;
