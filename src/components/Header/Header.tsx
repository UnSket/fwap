import React, { useState } from 'react';
import styles from './Header.module.scss';
import logo from './logo_white.svg';
import { HashLink } from 'react-router-hash-link';
import { AppBar, IconButton, Toolbar, Button, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import LoginDialog from '../LoginDialog/LoginDialog';



const Header: React.FC = () => {
    const [anchorForMenu, toggleMenu] = useState(null);
    const closeMenu = () => toggleMenu(null);
    const openMenu = (e: any) => toggleMenu(e.currentTarget);
    const [isLoginOpen, toggleLogin] = useState(false);
    const closeLogin = () => toggleLogin(false);
    const openLogin = () => toggleLogin(true);
    return (
        <>
            <LoginDialog isOpen={isLoginOpen} close={closeLogin}/>
            <AppBar position="static">
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
                            <HashLink smooth to='/#about' className={styles.link}> About</HashLink>
                            <HashLink smooth to='/#decks' className={styles.link}> Decks</HashLink>
                            <HashLink smooth to='/#buy' className={styles.link}> Make own</HashLink>
                        </div>
                        </Hidden>
                    </div>
                    <div className={styles.rightPart}>
                        <Button color="inherit" onClick={openLogin}>Sign in</Button>
                    </div>
                    </Container>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorForMenu}
                        keepMounted
                        open={Boolean(anchorForMenu)}
                        onClose={closeMenu}
                        className={styles.dropDownMenu}>
                        <MenuItem onClick={closeMenu}>
                            <HashLink smooth to='/#about' className={styles.link}> About</HashLink>
                        </MenuItem>
                        <MenuItem onClick={closeMenu}>
                            <HashLink smooth to='/#decks' className={styles.link}> Decks</HashLink>
                        </MenuItem>
                        <MenuItem onClick={closeMenu}>
                            <HashLink smooth to='/#buy' className={styles.link}> Make own</HashLink>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>

    )
};

export default Header;
