import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import UploadCard from "../../components/addContentCard/UploadCard";
import { useMutation } from "@apollo/client";
import { CREATE_PROMOTION } from "../../Graphql/Promotion/Mutation";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "32px",
    },
    title: {
      fontSize: "34px",
      fontWeight: 600,
    },
    card: {
      margin: "20px 48px",
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
    uploadCard: {
      marginTop: "-40px",
      marginBottom: "-30px",
    },
  })
);

const AddPromotion = () => {
  const classes = useStyles();
  const history = useHistory();
  const [hospitalId, /* setHospitalId */] = useState("");
  const [userId, /* setUserId */] = useState("");
  const [couponCode, /* setCouponCode */] = useState("");
  const [title, setTitle] = useState("");
  const [hospitalDetail, setHospitalDetail] = useState("");
  const [Url, setUrl] = useState("");

  const [createPromotion] = useMutation(CREATE_PROMOTION);

  const submitHandler = (e) => {
    e.preventDefault();
    createPromotion({
      variables: {
        hospitalId: hospitalId,
        userId: userId,
        title: title,
        hospitalDetail: hospitalDetail,
        couponCode: couponCode,
        Url: Url,
      },
    });
    history.push("/promotions");
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.title}>
        Add Promotion
      </Typography>
      <Card className={classes.card} elevation={0}>
        <Paper className={classes.paper} elevation={0}>
          <Typography gutterBottom className={classes.profileTitle}>
            Title:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Title"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Hospital:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Hospital"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Hospital"
            onChange={(e) => {
              setHospitalDetail(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Promotion Picture:
          </Typography>
          <div className={classes.uploadCard}>
            <UploadCard />
          </div>
          <Typography gutterBottom className={classes.profileTitle}>
            Promotion Url:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Promotion Url"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="Url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <Typography gutterBottom className={classes.profileTitle}>
            Expire Date:
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            placeholder="Expiredate"
            variant="outlined"
            color="primary"
            size="medium"
            required
            id="expiredate"
          />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.buttonGroup}
          >
            <Button
              color="secondary"
              size="large"
              onclick={() => {
                history.push("/promotions");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={submitHandler}
            >
              Create
            </Button>
          </Grid>
        </Paper>
      </Card>
    </div>
  );
};

export default AddPromotion;
