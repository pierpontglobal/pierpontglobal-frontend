import React from 'react';
import styled from 'styled-components';
import { Input, TextField } from '@material-ui/core';
import SignInModal from '../../support/SignInModal/SignInModal';

/* const getParams = function (url) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  const query = parser.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

const params = getParams(window.location.href);

$.ajax({
  url: '/oauth/application',
  type: 'GET',
  dataType: 'text',
  data: {
    pk: params.app_pk,
  },
  success(data) {
    $('#app_name').html(data);
  },
  error(data) {
    console.log(data);
  },
});

function send_credentials(ev) {
  ev.preventDefault();
  if (params.app_pk !== undefined) {
    $.ajax({
      url: '/oauth/login',
      type: 'POST',
      dataType: 'json',
      data: {
        pk: params.app_pk,
        username: $('#username').val(),
        password: $('#password').val(),
      },
      success(data) {
        console.log(data);
        window.location.href = `${data.callback}?token=${data.token}`;
      },
      error(data) {
        console.log(data);
      },
    });
  } else {
    alert('App not registered!');
  }
} */

const AllScreen = styled.div`
  position: fixed;
  z-index: 10000;
  height: 100%;
  width: 100%;
  background: linear-gradient(#3a7abf, #3B444B);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const SignInWrapper = styled.div`
  max-width: 340px;
  min-width: 290px;
  width: 100%;
  height: 340px;
  background: white;
  border-radius: 10px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
  padding: 10px;
`;

function OauthPage() {
  return (
    <AllScreen>
      <SignInWrapper>
        <h4 style={{ textAlign: 'center' }}>PierpontGlobal Login</h4>
        <TextField
          label="Username"
          autoComplete="username"
          type="text"
          name="username"
          style={{
            width: '100%',
            maxWidth: '300px',
            marginBottom: '10px',
          }}
        />


        <TextField
          label="Password"
          autoComplete="password"
          type="password"
          name="Password"
          style={{
            width: '100%',
            maxWidth: '300px',
            marginBottom: '10px',
          }}
        />
      </SignInWrapper>
    </AllScreen>
  );
}

export default OauthPage;
