import React, { useState } from "react";
import {
  // Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
  TextField,
  CardHeader,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import UrgentCard from "./UrgentCard";
import { ANSWER_FORUM } from "../../Graphql/Forum/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FORUM } from "../../Graphql/Forum/Queries";
import { GET_ALL_USERS } from "../../Graphql/User/Queries";
import { Alert } from "@material-ui/lab";

const ForumCard = (props) => {
  const classes = useStyles();
  const [openUrgent, setOpenUrgent] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerForum] = useMutation(ANSWER_FORUM, {
    refetchQueries: [{ query: GET_ALL_FORUM }],
    errorPolicy: "all",
  });

  const { data: queryUser, error } = useQuery(GET_ALL_USERS, {
    errorPolicy: "all",
  });

  const handleUrgentBackdrop = () => {
    setOpenUrgent(false);
  };

  const handleUrgent = () => {
    setOpenUrgent(!openUrgent);
  };

  return (
    <>
      {error && <Alert severity="error"> {error.message} </Alert>}
      <Card variant="outlined" className={classes.root}>
        <div className={classes.detail}>
          <CardContent className={classes.content}>
            <div className={classes.user}>
              <Typography variant="subtitle1" color="textSecondary">
                User:{" "}
                {queryUser &&
                queryUser.getAllUsers.find(
                  (user) => user.id === props.forum.userID
                )
                  ? queryUser &&
                    queryUser.getAllUsers.find(
                      (user) => user.id === props.forum.userID
                    ).name
                  : "error"}{" "}
                {/* {queryUser &&
                  queryUser.getAllUsers.find(
                    (user) => user.id === props.forum.userID
                  ).name} */}
                Asked on {new Date(props.forum.createAt).toLocaleDateString()}
              </Typography>
            </div>
            <Typography className={classes.question} gutterBottom>
              {props.forum.title}
            </Typography>
            <Typography
              className={classes.questionDetail}
              component="h5"
              variant="h5"
              gutterBottom
            >
              {props.forum.description}
            </Typography>
            <Typography
              className={classes.adminAnswer}
              component="h5"
              variant="h5"
            >
              {props.forum.answer}
            </Typography>
          </CardContent>
          {!props.forum.answer && (
            <CardHeader
              action={
                <>
                  <Button
                    variant="contained"
                    className={classes.buttonAnswer}
                    onClick={(e) => {
                      answerForum({
                        variables: {
                          forumID: props.forum.forumID,
                          answer: answer,
                        },
                      });
                    }}
                  >
                    Answer
                  </Button>
                </>
              }
              title={
                <TextField
                  color="primary"
                  fullWidth
                  placeholder="Answer"
                  required
                  variant="outlined"
                  multiline
                  maxRows={4}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
              }
            />
          )}
        </div>
        <CardActions className={classes.action}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              variant="contained"
              className={classes.buttonUrgent}
              onClick={handleUrgent}
            >
              Urgent
            </Button>
            <Modal
              open={openUrgent}
              className={classes.modal}
              onClose={handleUrgentBackdrop}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <UrgentCard
                onClick={handleUrgentBackdrop}
                userID={props.forum.userID}
              />
            </Modal>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "24px",
      justifyContent: "space-between",
      marginRight: "48px",
    },
    question: {
      fontSize: "24px",
      fontWeight: 600,
    },
    detail: {
      display: "flex",
      flexDirection: "column",
      minWidth: "1000px",
    },
    content: {
      flex: "1 0 auto",
      padding: "8px 8px 0px 8px",
    },
    questionDetail: {
      fontSize: "16px",
      fontWeight: 300,
    },
    adminAnswer: {
      fontSize: "14px",
      fontWeight: 300,
      padding: "16px 16px 0px 16px",
    },
    user: {
      display: "flex",
      alignItems: "center",
    },
    action: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    messageNumber: {
      backgroundColor: "#63EA89",
      width: "60px",
      height: "60px",
    },
    buttonAnswer: {
      padding: "10px",
      margin: "8px",
      background: "#3CA75A",
      color: "white",
    },
    buttonPinned: {
      padding: "10px",
      margin: "8px",
      background: "#6367EA",
      color: "white",
    },
    buttonUrgent: {
      padding: "10px",
      margin: "8px",
      background: "#EA6363",
      color: "white",
    },
    answer: {
      fontSize: "14px",
      fontWeight: 600,
    },
    backdrop: {
      color: "#fff",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default ForumCard;
