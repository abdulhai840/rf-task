import React, { Component } from "react";
import "./user.css";
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userName: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.saveUser();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  saveUser = () => {
    const { name, userName } = this.state;
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        username: userName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    const { name, userName } = this.state;

    return (
      <div className="d-flex justify-content-center mt-5 ">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="col-md-9 mx-auto p-2 my-2"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="col-md-9 mx-auto p-2 my-2"
            name="userName"
            placeholder="User Name"
            value={userName}
            onChange={this.handleChange}
          />
          <br/>
          <button type="submit" className="button">
            save
          </button>
        </form>
      </div>
    );
  }
}

export default User;
