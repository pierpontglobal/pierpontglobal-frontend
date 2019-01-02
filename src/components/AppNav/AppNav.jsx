import React from 'react';
import SearchInput from './SearchInput/SearchInput';
import Divider from './Divider/Divider';
import LinkBtn from './LinkBtn/LinkBtn';
import logo from './logo.png';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import ProfileBtn from './ProfileBtn/ProfileBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import ProfileDrawer from './ProfileDrawer/ProfileDrawer';

const style = {
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.09)',
    border: 'solid 0.5px rgba(0, 0, 0, 0.12)',
    position: 'fixed',
    top: 0,
    overflow: 'hidden',
    zIndex: 1000
}
export default class AppNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            profileOpen: false
        }
    }

    onTouchEnd = () => {
        this.setState({
          menuOpen: false,
          profileOpen: false
        });
    }

    openMenuSide = () => this.setState({
        menuOpen: true
    });

    openProfileSide = () => this.setState({
        profileOpen: true
    });

    gettingProfile() {
        return (
        <div style={{
            cursor: 'pointer',
            alignItems: 'center'
        }} onClick={() => {this.props.openModal()}} className="mr-lg-5 ml-lg-4 mr-3 ml-2 d-none d-md-flex align-self-center">
            <i className="far fa-user mr-2 pr-1" />
            Sign In
        </div>)
    }

    render() {
        return (
            <div 
                className="d-flex flex-row py-2 justify-content-md-center px-3 px-md-2 w-100"
                style={style}
            >
                <div 
                    className="d-flex flex-fill justify-content-md-center"
                    style={{maxWidth: '1366px'}}
                >
                    <MenuDrawer 
                        open={this.state.menuOpen}
                        onMaskClick={this.onTouchEnd} 
                    />
                    <ProfileDrawer
                        open={this.state.profileOpen}
                        onMaskClick={this.onTouchEnd} 
                    />
                    <BurgerBtn onClick={this.openMenuSide} />
                    <img
                        style={{
                            height: '40px'
                        }}
                        className="ml-auto mr-auto img-fluid logo" 
                        src={logo} 
                        alt="PierpontGlobal" 
                    />
                    <ProfileBtn onClick={this.openProfileSide} />
                    <LinkBtn href='/' className="mr-lg-4 mr-3 d-none d-md-flex align-self-center">Home</LinkBtn>
                    <LinkBtn href='/marketplace' className="mr-lg-4 ml-lg-3 mr-3 d-none d-md-flex align-self-center">MarketPlace</LinkBtn>
                    <LinkBtn className="mr-lg-4 ml-lg-3 mr-3 d-none d-md-flex align-self-center">Contact&nbsp;Us</LinkBtn>

                    <Divider className="ml-lg-3 mr-lg-3 d-none d-md-flex align-self-center" />
                    
                    { this.gettingProfile() }

                    <SearchInput className="d-none d-md-flex mr-auto align-self-center"></SearchInput>

                </div>
            </div>
        );
    }
}