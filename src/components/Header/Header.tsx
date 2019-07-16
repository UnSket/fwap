import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import logo from './logo_white.svg';
import { HashLink } from 'react-router-hash-link';
import { AppBar, IconButton, Toolbar, Button, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { OpenModalContext } from '../App/App';
import { currentLocation } from '../../modules/router/selectors';
import { connect } from 'react-redux';
import { Store } from '../../model/types/Store';
import { Location } from 'history';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

type Props = {
    currentLocation: Location<any>
};

type LinkData = {
    to: string,
    text: string,
    isHashLink?: boolean
};

const LANDING_LINKS: Array<LinkData> = [
    {to: '/#about', text: 'About', isHashLink: true},
    {to: '/#decks', text: 'Decks', isHashLink: true},
    {to: '/#buy', text: 'Buy', isHashLink: true}
];

const USER_LINKS: Array<LinkData> = [
    {to: ROUTE_PATHS.myDecks, text: 'My decks'},
    {to: '/#decks', text: 'All decks'},
    {to: ROUTE_PATHS.createDeck, text: 'Create new'}
];

const getLinks:(location: string) => Array<LinkData> = (location) => {
    if (location === ROUTE_PATHS.landing) {
        return LANDING_LINKS;
    } else {
        return USER_LINKS;
    }
};

const CustomLink: React.FC<{link: LinkData}> = ({link}) => {
    if (link.isHashLink) {
        return <HashLink smooth to={link.to} className={styles.link}>{link.text}</HashLink>;
    } else {
        return (
          <NavLink activeClassName={styles.active} to={link.to} className={styles.link}>
            {link.text}
          </NavLink>
        )
    }
};

const Header: React.FC<Props> = ({currentLocation}) => {
    const [anchorForMenu, toggleMenu] = useState(null);
    const closeMenu = () => toggleMenu(null);
    const openMenu = (e: any) => toggleMenu(e.currentTarget);
    const links: Array<LinkData> = getLinks(currentLocation.pathname);

    const openModal = useContext(OpenModalContext);
    return (
        <>
            <AppBar position="static" color={'default'}>
                <Toolbar className={styles.header}>
                    <Container className={styles.container}>
                    <div className={styles.leftPart}>
                        <Hidden smUp>
                        <div className={styles.toggleMenu}>
                            <IconButton onClick={openMenu}>
                              <MenuIcon className={styles.toggleMenu} />
                            </IconButton>
                        </div>
                        </Hidden>
                        <div className={styles.logo}>
                            <Link to='/' >
                                <img src={logo} alt='logo'/>
                            </Link>
                        </div>
                        <Hidden xsDown>
                        <div className={styles.linkWrapper}>
                            {links.map((data, index) => <CustomLink link={data} key={index} />)}
                        </div>
                        </Hidden>
                    </div>
                    <div className={styles.rightPart}>
                        <Button color="inherit" onClick={openModal}>Sign in</Button>
                    </div>
                    </Container>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorForMenu}
                        keepMounted
                        open={Boolean(anchorForMenu)}
                        onClose={closeMenu}
                        className={styles.dropDownMenu}>
                        {links.map((data, index) =>
                          <MenuItem  key={index} onClick={closeMenu}>
                            <CustomLink link={data} />
                          </MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </>

    )
};

const mapStateToProps = (store: Store) => ({
    currentLocation: currentLocation(store)
});

export default connect(mapStateToProps)(Header);
