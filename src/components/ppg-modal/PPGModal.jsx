import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    minHeight: '180px',
    minWidth: '220px'
  }
});

function PPGModal(props) {
  const { setOpen, classes, width, height } = props;

  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={setOpen}
        onClose={props.handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            margin: 'auto',
            width: width,
            height: height,
            overflowY: 'scroll'
          }}
          className={classes.paper}
        >
          <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
            <IconButton onClick={props.handleClose}>
              <Close />
            </IconButton>
          </div>
          {props.children}
        </div>
      </Modal>
    </>
  );
}

export default withStyles(styles)(PPGModal);
