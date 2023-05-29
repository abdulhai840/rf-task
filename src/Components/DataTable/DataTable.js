import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  makeStyles,
} from "@material-ui/core";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import jobSlice from "../../redux/Slice/JobSlice";
import { connect } from "react-redux";
import NotificationBox from "../NotificationBox/NotificationBox";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      filter: "",
      isAddDialogOpen: false,
      newJobTitle: "",
      editingJobId: null,
      editingJobTitle: "",
      usersData: [],
      anchorEl: null,
    };
    this.classes = makeStyles((theme) => ({
      typography: {
        padding: theme.spacing(2),
      },
    }));
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleAdd = () => {
    this.setState({ isAddDialogOpen: true });
  };

  handleAddDialogClose = () => {
    this.setState({ isAddDialogOpen: false, newJobTitle: "" });
  };

  handleAddJob = () => {
    const { jobs, newJobTitle } = this.state;
    const newJob = {
      id: jobs.length + 1,
      title: newJobTitle,
    };
    this.setState({ jobs: [...jobs, newJob] });
    this.handleAddDialogClose();
  };

  handleEdit = (id, title) => {
    this.setState({ editingJobId: id, editingJobTitle: title });
  };

  handleEditDialogClose = () => {
    this.setState({ editingJobId: null, editingJobTitle: "" });
  };

  handleUpdateJob = () => {
    const { jobs, editingJobId, editingJobTitle } = this.state;
    const updatedJobs = jobs.map((job) =>
      job.id === editingJobId ? { ...job, title: editingJobTitle } : job
    );
    this.setState({ jobs: updatedJobs });
    this.handleEditDialogClose();
  };

  handleDelete = (id) => {
    const { jobs } = this.state;
    const updatedJobs = jobs.filter((job) => job.id !== id);
    this.setState({ jobs: updatedJobs });
  };

  render() {
    const {
      jobs,
      filter,
      isAddDialogOpen,
      newJobTitle,
      editingJobId,
      editingJobTitle,
    } = this.state;

    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(filter.toLowerCase())
    );
    const jobsLength = this?.props?.jobs?.length;
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : null;

    return (
      <>
        <div style={{ width: "90%", margin: "auto" }}>
          <div style={{ margin: "1rem 0rem", float: "right" }}>
            {console.log("jobvs", this?.props?.jobs?.length)}
            <Badge
              color="primary"
              badgeContent={jobsLength}
              aria-describedby={id}
              onClick={this.handleClick}
            >
              <BellIcon width={25} />
            </Badge>
            {open && (
              <NotificationBox
                open={open}
                id={id}
                handleClose={this.handleClose}
                anchorEl={this.state.anchorEl}
                jobsList={this.props.jobs}
              />
            )}
          </div>
          <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
            <TextField
              label="Search Job"
              variant="outlined"
              value={filter}
              onChange={this.handleFilterChange}
              style={{ margin: "1rem" }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell style={{ display: "flex" }}>
                      <p
                        className="cursor"
                        style={{ marginRight: "1rem" }}
                        onClick={() => this.handleEdit(job.id, job.title)}
                      >
                        Edit
                      </p>
                      <p
                        className="cursor"
                        onClick={() => this.handleDelete(job.id)}
                      >
                        Delete
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAdd}
              style={{ margin: "1rem" }}
            >
              Add Job
            </Button>
          </TableContainer>

          <Dialog open={isAddDialogOpen} onClose={this.handleAddDialogClose}>
            <DialogTitle>Add Job</DialogTitle>
            <DialogContent>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                value={newJobTitle}
                onChange={(e) => this.setState({ newJobTitle: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAddDialogClose}>Cancel</Button>
              <Button
                onClick={() => {
                  this.handleAddJob();
                }}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={editingJobId !== null}
            onClose={this.handleEditDialogClose}
          >
            <DialogTitle>Edit Job</DialogTitle>
            <DialogContent>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                value={editingJobTitle}
                onChange={(e) =>
                  this.setState({ editingJobTitle: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleEditDialogClose}>Cancel</Button>
              <Button onClick={this.handleUpdateJob} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const mapDispatchToProps = (dispatch) => ({
  addJob: (job) => dispatch(jobSlice.actions.addJob(job)),
  // removeJob: (id) => dispatch(jobsSlice.actions.removeJob(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
