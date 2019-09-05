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
import { connect } from 'react-redux';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import { user } from '../../modules/user/selectors';
import { User } from '../../model/types/User';
import { StoreState } from '../../modules/types';
import { AUTHORITIES } from '../../model/constans/userAuthorities';

type Props = {
    user: User | null
};

type LinkData = {
    to: string,
    text: string,
    isHashLink?: boolean
};

const USER_LINKS: Array<LinkData> = [
    {to: ROUTE_PATHS.myDecks, text: 'My decks'},
    {to: '/#decks', text: 'All decks'},
    {to: ROUTE_PATHS.createDeck, text: 'Create new'}
];

const ADMIN_LINKS: Array<LinkData> = [
    {to: ROUTE_PATHS.userManagement, text: 'User management'}
];

const getLinks:(user: User | null) => Array<LinkData> = (user) => {
    if (user && user.authorities) {
        const isAdmin = user.authorities.some(authority => authority.authority === AUTHORITIES.ADMIN);
        if (isAdmin) {
            return USER_LINKS.concat(ADMIN_LINKS);
        }
        return USER_LINKS;
    }
    return [];
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

const Header: React.FC<Props> = ({user}) => {
    const [anchorForMenu, toggleMenu] = useState(null);
    const closeMenu = () => toggleMenu(null);
    const openMenu = (e: any) => toggleMenu(e.currentTarget);
    const links: Array<LinkData> = getLinks(user);

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

const mapStateToProps = (store: StoreState) => ({
    user: user(store)
});

export default connect(mapStateToProps)(Header);
