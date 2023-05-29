import React, { Component } from "react";
import Popover from "@material-ui/core/Popover";
import { Typography } from "@material-ui/core";
import {ReactComponent as Icon} from '../../assets/bell.svg';

class NotificationBox extends Component {

  render() {
    const open = this.props.open;

    return (
      <div style={{ maxHeight: "15rem", overflow: "auto" }}>
        <Popover
          id={this.props.id}
          open={open}
          anchorEl={this.props.anchorEl}
          onClose={this.props.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div style={{ width: "15rem" }}>
            {this?.props?.jobsList?.map((item, index) => {
              return (
                <div key={index} style={{padding:"1rem"}}>
                  <Typography variant="h6">Title</Typography>
                  <div style={{ display: "flex", alignItems:"center" }}>
                    <Icon width={20} style={{marginRight:"0.5rem"}} />
                    {item?.title} </div>
                    <hr style={{margin:0}} />
                </div>
              );
            })}
          </div>
        </Popover>
      </div>
    );
  }
}

export default NotificationBox;
