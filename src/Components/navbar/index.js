import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Typography, Link } from "@material-ui/core";

class Navbar extends React.Component {
  // handleJobsClick = () => {
  //   this.props.history.push('/jobs/view');
  // };

  // handleUserClick = () => {
  //   this.props.history.push('/user');
  // };

  // handleCreateJobClick = () => {
  //   this.props.history.push('/');
  // };

  render() {
    return (
      <AppBar position="static">
        <div className="mr-auto row py-3">
          <Typography className="ml-5 mr-5">
            <Link
              onClick={() => window.location.replace("/jobs/view")}
              color="inherit"
              style={{ cursor: "pointer" }}
            >
              Jobs
            </Link>
          </Typography>
          <Typography className="ml-5 mr-5">
            <Link
              onClick={() => window.location.replace("/user")}
              color="inherit"
              style={{ cursor: "pointer" }}
            >
              User
            </Link>
          </Typography>
          <Typography className="ml-5 mr-5">
            <Link
              onClick={() => window.location.replace("/")}
              color="inherit"
              style={{ cursor: "pointer" }}
            >
              Create Job
            </Link>
          </Typography>
        </div>
      </AppBar>
    );
  }
}

export default Navbar;
