import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {submitConfigure} from '../../actions/configure';
import {Button} from 'reactstrap';
import {ComponentWithError} from '../components/ComponentWithError';

class ConfigureMetadataComponent extends Component {
  static propTypes = {
    defaultMetadataName: PropTypes.string,
    defaultMetadataUrl: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    nameGroupClass: PropTypes.string,
    redirect: PropTypes.string,
    submitConfigure: PropTypes.func.isRequired,
    urlGroupClass: PropTypes.string,
  };

  state = {
    metadataUrl: '',
    profileName: '',
  };

  componentDidMount() {
    this.setState({
      metadataUrl: this.props.defaultMetadataUrl,
      profileName: this.props.defaultMetadataName,
    });
  }

  componentDidUpdate() {
    if (this.props.redirect) {
      document.location.replace(this.props.redirect);
    }
  }

  handleInputChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {metadataUrl, profileName} = this.state;
    const payload = {
      metadataUrl,
      profileName,
    };

    this.props.submitConfigure(payload);
  };

  handleKeyDown = (event) => event.keyCode === 13 && this.handleSubmit(event);

  render() {
    return (
      <fieldset>
        <legend>Configure</legend>
        {this.props.errorMessage}
        <div className={this.props.urlGroupClass}>
          <label htmlFor="metadataUrl">SAML Metadata URL</label>
          <input
            className="form-control"
            id="metadataUrl"
            name="metadataUrl"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            pattern="https://.+"
            required
            type="url"
            value={this.state.metadataUrl}
          />
        </div>
        <div className={this.props.nameGroupClass}>
          <label htmlFor="profileName">Account Alias</label>
          <input
            className="form-control"
            id="profileName"
            name="profileName"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            pattern=".+"
            type="string"
            value={this.state.profileName}
          />
        </div>
        <Button
          color="primary"
          onClick={this.handleSubmit}
          outline
        >
          Done
        </Button>
      </fieldset>
    );
  }
}

const mapStateToProps = ({configure}, ownProps) => ({
  ...configure.submitFailure,
  ...configure.submitSuccess,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  submitConfigure: bindActionCreators(submitConfigure, dispatch),
});

export const ConfigureMetadata = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentWithError(ConfigureMetadataComponent));
