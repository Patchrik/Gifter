import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState('');
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    fetch('/api/Post')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    // If the search term is blank just use post
    if (searchPost === '') {
      setFilteredPost(posts);
    } else {
      // If the search post is ANYTHING other than empty run this
      const filteredPostArray = posts.filter((post) =>
        post.title.toLowerCase().includes(searchPost)
      );
      setFilteredPost(filteredPostArray);
    }
  }, [searchPost]);

  const handleSearchChange = (event) => {
    setSearchPost(event.target.value);
    console.log(searchPost);
  };

  return (
    <div className="container">
      <div className="container">
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="postSearch"
              id="postSearchId"
              value={searchPost}
              placeholder="Search Post"
              onChange={handleSearchChange}
            />
          </FormGroup>
        </Form>
      </div>
      <div className="row justify-content-center">
        <div className="cards-column">
          {filteredPost.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
