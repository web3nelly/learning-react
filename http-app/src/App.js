import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import http from './services/httpService';
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // States
    // pending > resolved(success)  OR rejected(failure)
    // const reasponse = await http.get(config.apiPostEndpoint);

    const { data: posts } = await http.get(config.apiPostEndpoint);

    this.setState({ posts });
  }

  handleAdd = async () => {
    const newPost = { title: 'a', body: 'a' };
    const { data: post } = await http.post(config.apiPostEndpoint, newPost);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  }

  handleUpdate = async post => {
    post.title = 'UPDATED';
    await http.put(config.apiPostEndpoint + '/' + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  }

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    // Error handling for specific error and reset state
    // Unexpected error handling  done in httpService.js (axios.interceptors.response)
    try {
      //await http.delete(config.apiPostEndpoint + '/' + post.id)
      await http.delete('ppppp' + config.apiPostEndpoint + '!BREAK!/' + post.id)
    }
    catch (ex) {
      // - Display a specific error message
      if (ex.response && ex.response.status === 404)
        toast.error('SIMULATED: Post not found, may have already been deleted.');

      // Roll back the posts (reset state)
      this.setState({ posts: originalPosts });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
