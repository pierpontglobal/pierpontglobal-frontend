import React from 'react';
import Img from 'react-image';
import './custom.css';
import posed from 'react-pose';
import styled from 'styled-components';

const WButton = posed.div({
  clicked: {
    rotate: 180,
    opacity: 1,
  },
  normal: {
    rotate: 0,
    opacity: 1,
  },
});

const WList = posed.div({
  hidden: {
    opacity: 0,
    y: 100,
    transition: { duration: 400 },
  },
  visible: {
    opacity: 1,
    y: -70,
    transition: { duration: 400 },
  },
});

const WMessage = posed.div({
  clicked: {
    y: 80,
    opacity: 0,
  },
  normal: {
    y: 0,
    opacity: 1,
  },
});

const WElement = posed.div({
  exit: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: ({ i }) => ({ delay: i * 200 }),
  },
  props: { i: 0 },
});

const WMessageStyleWrapper = styled.div`
  position: 'absolute';
  right: '80px';
  bottom: '10px';
  padding: '7px';
  border-radius: '5px';
  background-color: '#ffffff';
  @media screen and (max-width: 480px) {
    visibility: hidden;
  }
`;


class WhatsApp extends React.Component {
  constructor() {
    super();

    this.state = {
      whatsappVisible: false,
    };
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1500,
          minWidth: '300px',
        }}
        className="outerWhatsApp"
      >
        <WList pose={this.state.whatsappVisible ? 'visible' : 'hidden'} style={{ borderRadius: '10px', display: this.state.whatsappVisible ? 'flex' : 'none' }} className="chat-box animated shadow" id="chat-box">
          <div className="card card-radius-all border-0">
            <div className="card-header card-radius" style={{ backgroundColor: '#2db742' }}>
              <div className="d-flex">
                <span><i className="fab fa-whatsapp " /></span>
                <div className="d-flex flex-column px-3">
                  <h5 className="header-heading ">Start a Conversation</h5>
                  <p className="header-description mb-0">
Hi! Click one of our members below to chat on
                    {' '}
                    <b>Whatsapp</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="card-body p-0 pb-2">
              <p className="description pl-3 pt-3 pb-0 mb-2">The team typically replies in a few minutes</p>
              <div className="list-unstyled">
                <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={1} key={1} href="#!" className="nav-link animated fadeInUp">
                  <div onClick={() => { window.location.href = 'https://wa.me/13056002113?text=Hello Juan, '; }} style={{ cursor: 'pointer' }} className="media px-3 py-2">
                    <div className="d-flex justify-content-end w-100 align-items-center">

                      <Img
                        style={{
                          width: '60px',
                        }}
                        alt="Administrator"
                        className="mr-3"
                        src={[
                          '/images/whatsapp/juan/juan.webp',
                          '/images/whatsapp/juan/juan.jp2',
                          '/images/whatsapp/juan/juan.jxr',
                          '/images/whatsapp/juan/juan.png',
                        ]}
                        loader={
                          <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                        }
                      />

                      <div className="media-body">
                        <p className="mb-1 name">Juan Villagrana</p>
                        <p style={{ color: 'darkgray' }} className="mb-1 profession">Customer Support</p>
                      </div>
                      <div>
                        <span><i className="fab fa-whatsapp gren" /></span>
                      </div>
                    </div>

                  </div>
                </WElement>
                <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={2} key={2} href="#!" className="nav-link animated fadeInUp">
                  <div onClick={() => { window.location.href = 'https://wa.me/18299570268?text=Hello Héctor, '; }} style={{ cursor: 'pointer' }} className="media px-3 py-2">
                    <div className="d-flex justify-content-end w-100 align-items-center">

                      <Img
                        style={{
                          width: '60px',
                        }}
                        alt="Administrator"
                        className="mr-3"
                        src={[
                          '/images/whatsapp/hector/hector.webp',
                          '/images/whatsapp/hector/hector.jp2',
                          '/images/whatsapp/hector/hector.jxr',
                          '/images/whatsapp/hector/hector.png',
                        ]}
                        loader={
                          <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                        }
                      />
                      <div className="media-body">
                        <p className="mb-1 name">Héctor Acosta</p>
                        <p style={{ color: 'darkgray' }} className="mb-1 profession">Technical Support</p>
                      </div>
                      <div>
                        <span><i className="fab fa-whatsapp gren" /></span>
                      </div>
                    </div>

                  </div>
                </WElement>
                <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={3} key={3} href="#!" className="nav-link animated fadeInUp">
                  <div onClick={() => { window.location.href = 'https://wa.me/19548063292?text=Hello Steve, '; }} style={{ borderLeftColor: 'darkgrey', cursor: 'pointer' }} className="media px-3 py-2">
                    <div className="d-flex justify-content-end w-100 align-items-center">
                      <Img
                        style={{
                          width: '60px',
                        }}
                        alt="Administrator"
                        className="mr-3"
                        src={[
                          '/images/whatsapp/steve/steve.webp',
                          '/images/whatsapp/steve/steve.jp2',
                          '/images/whatsapp/steve/steve.jxr',
                          '/images/whatsapp/steve/steve.png',
                        ]}
                        loader={
                          <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                        }
                      />
                      <div className="media-body">
                        <p className="mb-1 name">Steve Solomon</p>
                        <p style={{ color: 'darkgray' }} className="mb-1 profession">Sale Support</p>
                        <p style={{ color: 'orange' }} className="mb-1 profession">I will be back soon</p>
                      </div>
                      <div>
                        <span><i style={{ color: 'darkgray' }} className="fab fa-whatsapp gren" /></span>
                      </div>
                    </div>

                  </div>
                </WElement>
              </div>
            </div>
          </div>
        </WList>
        <WMessageStyleWrapper>
          <WMessage
            pose={this.state.whatsappVisible ? 'clicked' : 'normal'}
            className="shadow"
          >
            Need help?
            <span style={{ fontWeight: 'bold' }}> Chat with us!</span>
          </WMessage>
        </WMessageStyleWrapper>
        <WButton
          style={{
            zIndex: 200, position: 'absolute', right: 0, bottom: 0,
          }}
          onClick={() => { this.setState({ whatsappVisible: !this.state.whatsappVisible }); }}
          pose={this.state.whatsappVisible ? 'clicked' : 'normal'}
          id="chat-icon"
          className="icon d-flex justify-content-center align-items-center"
        >
          <span id="icon-html">
            {this.state.whatsappVisible ? <i className="fas fa-times" /> : <i className="fab fa-whatsapp" />}
          </span>
        </WButton>
      </div>
    );
  }
}

export default WhatsApp;
