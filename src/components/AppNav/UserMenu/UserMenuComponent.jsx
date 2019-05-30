import React from 'react';
import styled from 'styled-components';
import AccountIconMui from '@material-ui/icons/AccountCircle';
import HelpIconMui from '@material-ui/icons/Help';
import ExitIconMui from '@material-ui/icons/ExitToApp';
import CollectionsIconMui from '@material-ui/icons/CollectionsBookmark';
import LanguageIconMui from '@material-ui/icons/Language';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowDown';
import { withRouter } from 'react-router-dom';
import { AppNavHeight } from '../../../constants/ApplicationSettings';
import ApplicationRoutes from '../../../constants/Routes';

const OutsideClickHandler = styled.div`
  width: 100vw;
  height: ${`calc(100vh - ${AppNavHeight}px)`};
  position: fixed;
  z-index: 900;
  background-color: rgb(0, 0, 0, 0.2);
  top: ${`${AppNavHeight}px`};
  left: 0;
`;

const UserMenu = styled.div`
  position: absolute;
  top: ${`${AppNavHeight + 2}px`};
  right: 8px;
  height: 400px;
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 2px rgb(0, 0, 0, 0.1);
  z-index: 1000;
`;

const UserMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 1fr;
  grid-template-columns: auto;
`;

const UserMenuHeader = styled.div`
  width: 100%;
  height: 100%;
`;

const UserMenuBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const UserMenuFooter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const UserMenuLink = styled.div`
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const MenuIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Submenu = styled.div`
  width: 100%;
  height: auto;
`;

const SubmenuLink = styled.div`
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  grid-template-rows: auto;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const UserMenuLinkWithSubmenuWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const UserMenuLinkWithSubmenu = styled.div`
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: auto;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ShowSubmenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  transform: ${props => props.show ? 'rotate(-180deg)' : 'none'};
`;

const ArrowIconSubmenu = styled(ArrowIconMui)`
  color: #383838;
  font-size: 1.08rem;
`;

const AccountIcon = styled(AccountIconMui)`
  color: #383838;
`;

const HelpIcon = styled(HelpIconMui)`
  color: #383838;
`;

const ExitIcon = styled.div`
  & > i { 
    color: #383838;
    font-size: 1.0rem;
  }
  transform: rotate(-180deg);
`;

const CollectionIcon = styled(CollectionsIconMui)`
  color: #383838;
`;

const LanguageIcon = styled(LanguageIconMui)`
  color: #383838;
`;

class UserMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLanguagesSubmenu: false,
    }
  }

  toggleLanguagesSubmenu = () => {
    this.setState((prevState) => ({
      showLanguagesSubmenu: !prevState.showLanguagesSubmenu,
    }));
  }

  render() {
    const { handleToggle, handleSignOut, goToAction, handleOpenSavedCars } = this.props;
    const { showLanguagesSubmenu } = this.state;

    return (
      <>
        <OutsideClickHandler onClick={handleToggle} />
        <UserMenu>
          <UserMenuWrapper>
            <UserMenuBody>
              <UserMenuLink onClick={() => goToAction(ApplicationRoutes.profilePage.default)}>
                <MenuIconWrapper>
                  <AccountIcon />
                </MenuIconWrapper>
                <MenuTextWrapper>
                  <span>
                    My profile
                  </span>
                </MenuTextWrapper>
              </UserMenuLink>
              <UserMenuLink onClick={handleOpenSavedCars}>
                <MenuIconWrapper>
                  <CollectionIcon />
                </MenuIconWrapper>
                <MenuTextWrapper>
                  <span>
                    My saved cars
                  </span>
                </MenuTextWrapper>
              </UserMenuLink>
              <UserMenuLinkWithSubmenuWrapper>
                <UserMenuLinkWithSubmenu onClick={this.toggleLanguagesSubmenu}>
                  <MenuIconWrapper>
                    <LanguageIcon />
                  </MenuIconWrapper>
                  <MenuTextWrapper>
                    <span>
                      Language
                    </span>
                  </MenuTextWrapper>
                  <ShowSubmenuWrapper show={showLanguagesSubmenu}>
                    <ArrowIconSubmenu />
                  </ShowSubmenuWrapper>
                </UserMenuLinkWithSubmenu>
                {
                  !showLanguagesSubmenu ? null : (
                    <Submenu show={showLanguagesSubmenu}>
                      <SubmenuLink>
                        <div></div>
                        <MenuIconWrapper>
                          ES
                        </MenuIconWrapper>
                        <MenuTextWrapper>
                          <span>
                            Spanish
                          </span>
                        </MenuTextWrapper>
                      </SubmenuLink>
                      <SubmenuLink>
                        <div></div>
                        <MenuIconWrapper>
                          EN
                        </MenuIconWrapper>
                        <MenuTextWrapper>
                          <span>
                            English
                          </span>
                        </MenuTextWrapper>
                      </SubmenuLink>
                    </Submenu>
                  )
                }
              </UserMenuLinkWithSubmenuWrapper>
              <UserMenuLink onClick={() => goToAction(ApplicationRoutes.supportPage)}>
                <MenuIconWrapper>
                  <HelpIcon />
                </MenuIconWrapper>
                <MenuTextWrapper>
                  <span>
                    Help & support
                  </span>
                </MenuTextWrapper>
              </UserMenuLink>
            </UserMenuBody>
            <UserMenuFooter>
              <UserMenuLink onClick={handleSignOut}>
                <MenuIconWrapper>
                  <ExitIcon>
                    <i className="fas fa-sign-out-alt"></i>
                  </ExitIcon>
                </MenuIconWrapper>
                <MenuTextWrapper>
                  <span>
                    Sign out
                  </span>
                </MenuTextWrapper>
              </UserMenuLink>
            </UserMenuFooter>
          </UserMenuWrapper>
        </UserMenu>
      </>
    );
  }
}

export default withRouter(UserMenuComponent);