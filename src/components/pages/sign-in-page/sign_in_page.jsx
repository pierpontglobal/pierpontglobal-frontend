import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import {
  BackgroundLeft,
  BackgroundRight,
  PageWrapper,
  ContentLeft,
  LogoWrapper,
  TitleWrapper,
  ContentRight,
  NavBar,
  NavbarBackIcon,
  NavbarButton,
  ContentRightTitle,
  FormWrapper,
  ActionLinks,
  ContentRightFooter,
  FormWrapperTitle,
  InputsWrapper,
  PasswordInput,
  UsernameInput,
  SubmitButton,
  SubmitArrow,
  PersonIcon,
  Input,
  LockIcon,
  CircularProgress,
  Circles,
  Obj,
} from './styles/sign_in_styles';
import { SignUpForm } from './sign-up-form';

class SignInPage extends React.Component {
  state = {
    username: '',
    password: '',
    isUsernameFocused: true,
    isPasswordFocused: false,
    loading: false,
    showSignUpForm: false,
    loginError: false
  }

  focusElement = (e) => {
    let usrFocus = false;
    let pasFocus = false;
    if (e.target.id === "username") {
      usrFocus = true;
      document.getElementById('username').focus();
      document.getElementById('password').blur();
    } else if (e.target.id === "password") {
      pasFocus = true;
      document.getElementById('password').focus();
      document.getElementById('username').blur();
    }
    this.setState({
      isUsernameFocused: usrFocus,
      isPasswordFocused: pasFocus,
    });
  }

  handleSubmit = () => {
    this.setState({
      loading: true,
    }, () => {
      const { cookies, history } = this.props;
      const { username, password } = this.state;
      const data = {
        username: username,
        password: password,
        grant_type: 'password',
      };
      axios.post(`${ApiServer}/oauth/token`, data).then(data => {
        cookies.set('token', data.data.access_token, { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) });
        axios.post(`${ApiServer}/api/v1/user/notifier`, {
          one_signal_uuid: cookies.get('one_signal_uuid'),
        });
        this.setState({
          loading: false,
          loginError: false,
        }, () => {
          this.props.history.push('/user');
        })
      }, err => {
        // Set invalid inputs states
        this.setState({
          loading: false,
          loginError: true,
        })
      });
    })
  }

  showSignUpForm = (value) => {
    this.setState({
      showSignUpForm: value,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { isUsernameFocused, isPasswordFocused, loading, showSignUpForm, loginError } = this.state;
    return(
      <PageWrapper>
        <BackgroundLeft>
          <ContentLeft>
            <div>
              <LogoWrapper>
                <img src="/logos/Logo 4a - White.png" alt="Pierpont Global, Inc" />
              </LogoWrapper>
              <TitleWrapper>
                <span>Pierpont Global, Inc</span>
              </TitleWrapper>
            </div>
          </ContentLeft>
          <Circles>
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
            <Obj />
          </Circles>
        </BackgroundLeft>
        <BackgroundRight>
          <ContentRight>
            <NavBar showSignUpForm={showSignUpForm}>
              {
                showSignUpForm ? <NavbarBackIcon onClick={() => this.showSignUpForm(false)} /> : <NavbarButton onClick={() => this.showSignUpForm(!showSignUpForm)}>Sign up</NavbarButton>
              }
            </NavBar>
            <ContentRightTitle>
              {
                !showSignUpForm ? <span>Hello!</span> : <span>Get access now!</span>
              }
            </ContentRightTitle>
            {
              (showSignUpForm) ? <SignUpForm /> : (
                <FormWrapper>
                  <FormWrapperTitle>
                    <h1>Login to your account</h1>
                    {
                      loginError ? (
                        <>
                          <br />
                          <span>Ups! Your username or password is wrong. Please, try again</span>
                          <br />
                        </>
                      ) : null
                    }
                  </FormWrapperTitle>
                  <InputsWrapper>
                    <Input>
                      <PersonIcon loginError={loginError} isFocused={isUsernameFocused} />
                      <UsernameInput loginError={loginError} id="username" isFocused={isUsernameFocused} placeholder="Your username" type="text" autoFocus onChange={this.handleChange} onFocus={this.focusElement} />
                    </Input>
                    <Input>
                      <LockIcon loginError={loginError} isFocused={isPasswordFocused} />
                      <PasswordInput loginError={loginError} id="password" isFocused={isPasswordFocused} placeholder="Your password" type="password" onChange={this.handleChange} onFocus={this.focusElement} />
                    </Input>
                    <SubmitButton onClick={this.handleSubmit}>
                      Login
                      {
                        loading ? <CircularProgress /> : <SubmitArrow />
                      }
                    </SubmitButton>
                  </InputsWrapper>
                </FormWrapper>
              )
            }
            <ActionLinks>

            </ActionLinks>
            <ContentRightFooter>
              <span>Copyright &copy; 2019 PierpontGlobal, Inc. All rights reserved.</span>
            </ContentRightFooter>
          </ContentRight>
        </BackgroundRight>
      </PageWrapper>
    );
  }
}

export default withRouter(SignInPage);