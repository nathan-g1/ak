import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { addReview } from '../../../../../../actions/courseAction';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  List,
  ListItem,
  CardContent,
  TextField,
  Grid,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button
} from '@material-ui/core';
import ReactPlayer from 'react-player'


const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    width: 40,
    height: 40
  },
}));

const CommentForm = props => {
  const { className, currentuser, ...rest } = props;

  const classes = useStyles();

  const [isFormActionVisible, setIsFormActionVisible] = useState(false);
  const [values, setValues] = useState({
    qna: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const review = {
      text: values.qna,
      userName: props.currentuser.firstName,
      avatar: props.currentuser.avatar,
      likes: 0,
      dislikes: 0,
      replies: [

      ],
      commentId: "",
      videoId: "",
      courseId: props.courseId
    };
  
    props.addReview(JSON.stringify(review));
  
    setValues(values => ({
      ...values,
      qna: ''
    }));

  }


  return (
    //to be visible for logged in student
    <form
      onSubmit={handleSubmit}
    >
        <Divider />
        <CardContent>
        <List>
            <ListItem>
            <ListItemAvatar>
                <Avatar
                className={classes.avatar}
                src={`https://samvisionapi.herokuapp.com/images/${currentuser.avatar}`}  
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                <React.Fragment>
                    <TextField
                    fullWidth
                    label="Comment..."
                    margin="dense"
                    name="qna"
                    onChange={handleChange}
                    value={values.qna}
                    onClick={() => {
                        setIsFormActionVisible(true);
                    }}
                    />
                </React.Fragment>
                }
            >
            </ListItemText>
            </ListItem>
            {
                isFormActionVisible && 
                <Grid
                container
                className={classes.commentBtn}
                justify="flex-end"
                >
                <Button 
                    size="small"
                    onClick={() => {
                        setIsFormActionVisible(false);
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="outlined"
                    size="small"
                    type="submit"
                >
                    Comment
                </Button>
                </Grid>
            }
                
        </List>
        </CardContent>
    </form>
  );
};

CommentForm.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  currentuser: state.currentUser.user,
  courseId: state.currentCourse.course.id
});

export default connect(mapStateToProps, { addReview })(CommentForm);
