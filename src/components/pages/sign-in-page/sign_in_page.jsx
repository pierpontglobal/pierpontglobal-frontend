import React from 'react';
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
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 3000);
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
    const { isUsernameFocused, isPasswordFocused, loading, showSignUpForm } = this.state;
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
                    <span>Login to your account</span>
                  </FormWrapperTitle>
                  <InputsWrapper>
                    <Input>
                      <PersonIcon isFocused={isUsernameFocused} />
                      <UsernameInput id="username" isFocused={isUsernameFocused} placeholder="Your username" type="text" autoFocus onChange={this.handleChange} onFocus={this.focusElement} />
                    </Input>
                    <Input>
                      <LockIcon isFocused={isPasswordFocused} />
                      <PasswordInput id="password" isFocused={isPasswordFocused} placeholder="Your password" type="password" onChange={this.handleChange} onFocus={this.focusElement} />
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

export default SignInPage;