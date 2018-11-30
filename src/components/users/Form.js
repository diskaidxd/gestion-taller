import React, { Component } from 'react';
import Alert from '../../Alert';
import $ from 'jquery';
import 'bootstrap';

class UserForm extends Component {

  state = {
    name: '',
    email: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      const { name, email } = nextProps.user;
      this.setState({ name, email });
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      $(`#${this.props.modalId}`).modal('show');
    } else {
      $(`#${this.props.modalId}`).modal('hide');
    }
  }

  handleSubmit = (e) => {
    const { name, email } = this.state;
    e.preventDefault();
    this.props.handleSubmit({ name, email });
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { close, modalId, title, alert } = this.props;
    const { name, email } = this.state;
    return (
      <div className="modal fade in" id={modalId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="cerrar" onClick={close}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Alert alert={alert} />
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Name"
                      onChange={this.handleOnChange}
                      className="form-control" />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleOnChange}
                      className="form-control" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={close}>Cerrar</button>
                <input
                  type="submit"
                  name="Save changes"
                  placeholder="New user"
                  className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
