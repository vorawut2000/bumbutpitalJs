import React, { useState, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { USER_REGISTER } from "../../Graphql/User/Mutation";
import { GET_ALL_USERS, GET_ONLY_USER } from "../../Graphql/User/Queries";
import { useHistory } from "react-router-dom";
import generator from "generate-password";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
      marginTop: "60px",
    },
    title: {
      fontSize: "34px",
      fontWeight: 600,
    },
    card: {
      margin: "20px 48px",
      maxWidth: "600px",
    },
    addUserTitle: {
      fontSize: "24px",
      fontWeight: 500,
    },
    paper: {
      alignItems: "center",
      margin: "20px 48px",
      width: "600px",
    },
    profileTitle: {
      margin: "8px 0px",
      fontSize: "20px",
      fontWeight: 600,
    },
    field: {
      display: "block",
      marginRight: "10px",
      marginTop: "10px",
      minWidth: "400px",
    },
    buttonGroup: {
      marginTop: "20px",
    },
  })
);

const AddUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const form = useRef();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState();
  const [phoneErrors, setPhoneErrors] = useState();
  const [emailErrors, setEmailErrors] = useState();

  const generatePassword = () => {
    const pwd = generator.generate({
      length: 10,
      numbers: true,
    });
    setPassword(pwd);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const { data } = useQuery(GET_ONLY_USER);
  // console.log(data.getAllUsers[0].username);

  const [createUser, { error }] = useMutation(USER_REGISTER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
    errorPolicy: "all",
  });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
        "service_pby8rs7",
        "template_hl8wgtz",
        e.target,
        "user_LBr8505JcZq5mjQ9mvWAM"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      surname &&
      username &&
      password &&
      email &&
      phoneNumber &&
      role
    ) {
      createUser({
        variables: {
          name: name,
          surname: surname,
          username: username,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          role: role,
        },
      });
    }
    history.push("/users");
  };

  const cancelSubmitHandler = () => {
    history.push("/users");
  };

  if (error) return `${error.message}`;

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Create Account
      </Typography>
      <form className={classes.card} ref={form} onSubmit={sendEmail}>
        <Typography gutterBottom className={classes.profileTitle}>
          First Name:
        </Typography>
        <TextField
          name="firstname"
          type="text"
          className={classes.field}
          fullWidth
          placeholder="First Name"
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="firstName"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Typography gutterBottom className={classes.profileTitle}>
          Last Name:
        </Typography>
        <TextField
          name="lastname"
          type="text"
          className={classes.field}
          fullWidth
          placeholder="Last Name"
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="lastName"
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
        <Typography gutterBottom className={classes.profileTitle}>
          Username:
        </Typography>
        <TextField
          name="username"
          type="text"
          className={classes.field}
          fullWidth
          placeholder="Username"
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="Username"
          // onChange={(e) => {
          //   setUsername(e.target.value);
          // }}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setErrors({ errorBool: false, username: "" });
            setUsername(value);
            for (let i = 0; i < data.onlyusername.length; i++) {
              if (value.length < 6) {
                setErrors({
                  errorBool: true,
                  username: "Username should more than 5 character.",
                });
              }
              if (data.onlyusername[i].username === value) {
                setErrors({
                  errorBool: true,
                  username: "Username already exist.",
                });
              }
            }
          }}
          error={Boolean(errors?.username)}
          helperText={errors?.username}
        />
        <Typography gutterBottom className={classes.profileTitle}>
          Email:
        </Typography>
        <TextField
          type="email"
          name="email"
          className={classes.field}
          fullWidth
          placeholder="Email"
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="email"
          // onChange={(e) => {
          //   setEmail(e.target.value);
          // }}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setEmailErrors({ email: "" });
            setEmail(value);
            let reg = new RegExp(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(value);
            if (!reg) {
              setEmailErrors({
                errorBool: false,
                email: "Should be email format, ex: bew@mail.com",
              });
            }
          }}
          error={Boolean(emailErrors?.email)}
          helperText={emailErrors?.email}
        />
        <Typography gutterBottom className={classes.profileTitle}>
          Phone Number:
        </Typography>
        <TextField
          name="phonenumber"
          type="text"
          className={classes.field}
          fullWidth
          placeholder="Phone Number"
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="phoneNumber"
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setPhoneErrors({ phoneNumber: "" });
            setPhoneNumber(value);
            let reg = new RegExp(/^\d*$/).test(value);
            if (!reg || value.length !== 10) {
              setPhoneErrors({
                errorBool: false,
                phoneNumber: "Should be phone number.",
              });
            }
          }}
          error={Boolean(phoneErrors?.phoneNumber)}
          helperText={phoneErrors?.phoneNumber}
        />
        <Typography gutterBottom className={classes.profileTitle}>
          User Type Role:
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            name="role"
            type="text"
            row
            aria-label="userType"
            value={role}
            onChange={handleChangeRole}
          >
            <FormControlLabel
              value="System Administrator"
              control={<Radio color="primary" />}
              label="System Administrator"
            />
            <FormControlLabel
              value="Ministry of Public Health Staff"
              control={<Radio color="primary" />}
              label="Ministry of Public Health Staff"
            />
          </RadioGroup>
        </FormControl>
        <Typography gutterBottom className={classes.profileTitle}>
          Password:{" "}
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={generatePassword}
          >
            Generate Password
          </Button>
        </Typography>
        <TextField
          name="password"
          type="text"
          className={classes.field}
          // type="password"
          fullWidth
          value={password}
          variant="outlined"
          color="primary"
          size="medium"
          required
          id="password"
          disabled
        />

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.buttonGroup}
        >
          <Button color="secondary" size="large" onClick={cancelSubmitHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={
              !name ||
              !surname ||
              !username ||
              !password ||
              !email ||
              !phoneNumber ||
              !role ||
              errors.errorBool === true ||
              phoneErrors.errorBool === true ||
              emailErrors.errorBool === true
            }
            onClick={submitHandler}
          >
            Create
          </Button>
        </Grid>
      </form>
      {/* <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form> */}
    </div>
  );
};

export default AddUser;
