import React, { createRef } from 'react';
import { Loader, Check, X } from 'react-feather';
import classNames from 'classnames';
import './IconInput.css';

class IconInput extends React.Component {
  state = {
    value: '',
    active: false,
    success: false,
    error: false
  };

  inputRef = createRef();

  componentWillReceiveProps(nextProps) {
    const finishedLoading = this.props.loading && !nextProps.loading;
    if (finishedLoading && nextProps.error) {
      this.setState({ success: false, error: true });
    }
    if (finishedLoading && !nextProps.error && nextProps.success) {
      this.setState({ active: false, error: false, success: true, value: '' });
      setTimeout(() => {
        this.setState({ success: false });
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.state.active) {
      this.inputRef.current.focus();
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value, error: false });
  };

  handleSubmit = e => {
    if (this.props.loading) return;
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  setActive = () => {
    this.setState({ active: true });
  };

  setInactive = () => {
    if (this.state.value || this.state.loading || this.state.success) return;
    this.setState({ active: false, error: false });
  };

  render() {
    const { active, value, success, error } = this.state;
    const { loading } = this.props;
    const disabled = loading || success;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classNames('IconInput', {
          active,
          stateful: loading || success
        })}
      >
        <button
          tabIndex={active ? -1 : 0}
          type="button"
          onFocus={this.setActive}
          onClick={this.setActive}
          disabled={disabled}
        >
          {!error && this.props.children}
        </button>
        <div className="IconInput-status">
          {!loading && error && <X color="#f00" />}
          {!loading && success && <Check color="#69F0AE" />}
          {loading && <Loader className="Spinner" />}
        </div>
        <div className="IconInput-input">
          <input
            tabIndex={active ? 0 : -1}
            ref={this.inputRef}
            onBlur={this.setInactive}
            onChange={this.handleChange}
            value={value}
            placeholder={this.props.placeholder}
            autoCorrect="off"
            disabled={disabled}
          />
        </div>
      </form>
    );
  }
}

export default IconInput;
