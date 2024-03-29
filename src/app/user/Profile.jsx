import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Grid,
} from "@material-ui/core";
import { GET_USER, GET_CURRENT_USER  } from "../../Graphql/User/Queries";
import Chart from "../../components/userProfile/Chart";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_FORUM } from "../../Graphql/Forum/Queries";
import ForumCard from "../../components/forumCard/ForumCard";

const Profile = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
  const history = useHistory();
  const { data: getUser } = useQuery(GET_CURRENT_USER);
  const { data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const { data: getUserForum } = useQuery(GET_FORUM, {
    variables: {
      id,
    },
  });

  if(!(getUser && getUser.getCurrentUser.map((staff) => staff.role).includes("System Administrator"))){
    return (
      <div className={classes.root}><h1>You can't access this page</h1></div>
    )
  }
  
  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        User Profile
        <Button
          variant="outlined"
          onClick={() => {
            history.push("/users");
          }}
          className={classes.titleButton}
        >
          Done
        </Button>
      </Typography>
      {data &&
        data.getUser.map((user, id) => (
          <Grid container spacing={2} key={id}>
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.name} gutterBottom>
                    {user.name} {user.surname}
                  </Typography>
                  <Chip label={user.role} style={{marginBottom: "10px"}}/>
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>Email</Typography>
                  <Typography variant="h6" gutterBottom>{user.email}</Typography>
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>Phone Number</Typography>
                  <Typography variant="h6" gutterBottom>{user.phoneNumber}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Chart
                appropiatePHQSeverityScore={user.appropiatePHQSeverityScore}
                appropiatePHQSeverity={user.appropiatePHQSeverity}
              />
            </Grid>
            <div className={classes.forum}>
              {getUserForum &&
                getUserForum.getForum.map((forum) => (
                  <ForumCard forum={forum} key={forum} />
                ))}
            </div>
          </Grid>
        ))}
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: "auto",
      padding: "32px",
      marginTop: "60px",
    },
    title: {
      fontSize: "32px",
      fontWeight: 600,
    },
    name: {
      fontSize: "30px",
      fontWeight: 600,
    },
    overview: {
      width: "100%",
      display: "flex",
      padding: "24px 0px 0px 0px",
    },
    card: {
      width: "100%",
      maxWidth: 500,
      minHeight: 300,
      backgroundColor: "#ecf2ff",
      borderRadius: "10px",
      marginRight: "24px",
      boxShadow: "none",
    },
    titleButton: {
      background: "#6367EA",
      borderRadius: 5,
      border: 0,
      color: "white",
      height: 36,
      float: "right",
    },
    forum: {
      marginTop: "60px",
    },
  })
);

export default Profile;
