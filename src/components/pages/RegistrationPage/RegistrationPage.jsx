import React from "react";
import MainForm from "./Form/MainForm";
import "./styles.css";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import { ApiServer } from "../../../Defaults";
const qs = require("query-string");

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "loading" };
  }

  async verifyEmail() {
    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    console.log(this.params);
    await Axios.post(
      `${ApiServer}/api/v1/user/verify?token=${this.params["token"]}`
    ).then(response => {
      this.setState({ status: `${response.data.verified}` }, () => {
        setTimeout(() => {
          window.close();
        }, 5000);
      });
    });
  }

  componentDidMount() {
    this.verifyEmail();
  }

  render() {
    return <div>{this.state.status}</div>;
  }
}

export default RegistrationPage;
