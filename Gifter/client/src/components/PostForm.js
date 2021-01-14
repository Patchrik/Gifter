import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PostForm = () => {
  const [users, setUsers] = useState([]);

  const [postTitle, setPostTitle] = useState('Post Title');

  const [postImageUrl, setPostImageUrl] = useState('Post ImageUrl');

  const [postCaption, setPostCaption] = useState('Post Caption');

  const [postUser, setPostUser] = useState();

  useEffect(() => {
    fetch('/api/UserProfile')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    render();
    console.log('sup sluts from the users useEffect');
  }, [users]);

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
    console.log(postTitle);
  };
  const handleImageURLChange = (event) => {
    setPostImageUrl(event.target.value);
    console.log(postImageUrl);
  };
  const handleCaptionChange = (event) => {
    setPostCaption(event.target.value);
    console.log(postCaption);
  };

  const handleUserChange = (event) => {
    setPostUser(event.target.value);
    console.log(`postUser Value ${postUser}`);
  };
  /**
   *
   * @param {{id: Number, name: string}[]} usersArray
   */
  const printUserOptions = (usersArray) => {
    const usersHTML = usersArray.map((userObj) => {
      return (
        <option key={userObj.id} value={userObj.id}>
          {userObj.name}
        </option>
      );
    });
    return usersHTML;
  };

  const getTime = () => {
    let currentDate = new Date();
    return currentDate.toJSON();
  };

  const constructNewPostObj = () => {
    let newPost = {
      Title: postTitle,
      ImageUrl: postImageUrl,
      Caption: postCaption,
      DateCreated: getTime(),
      UserProfileId: postUser,
    };
    addPost(newPost);
  };

  const addPost = (postObj) => {
    fetch('https://localhost:5001/api/Post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj),
      // Probably don't need the getTags call on the end of this.
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    constructNewPostObj();
  };

  const render = () => {
    return (
      <Form>
        <FormGroup>
          <Label for="title"></Label>
          <Input
            type="text"
            name="title"
            id="titleField"
            value={postTitle}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="imageUrl"></Label>
          <Input
            type="text"
            name="imageUrl"
            id="imageUrlField"
            value={postImageUrl}
            onChange={handleImageURLChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="caption"></Label>
          <Input
            type="text"
            name="caption"
            id="captionField"
            value={postCaption}
            onChange={handleCaptionChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input
            type="select"
            name="user"
            id="userSelect"
            onChange={handleUserChange}
            placeholder="Select A User"
          >
            <option value="">Select A User</option>
            {printUserOptions(users)}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    );
  };
  return render();
};
export default PostForm;
