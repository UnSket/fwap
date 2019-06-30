import React, { useState } from 'react';
import styles from './Header.module.scss';
import logo from './logo_white.svg';
import { HashLink } from 'react-router-hash-link';
import { AppBar, IconButton, Toolbar, Button, SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Header: React.FC = () => {
    const [anchorForMenu, toggleMenu] = useState(null);
    const closeMenu = () => toggleMenu(null);
    const openMenu = (e: any) => toggleMenu(e.currentTarget);
    return (
        <>
            <AppBar position="static">
                <Toolbar className={styles.container}>
                    <div className={styles.leftPart}>
                        <Hidden smUp>
                        <div className={styles.toggleMenu}>
                            <IconButton onClick={openMenu}>
                                <MenuIcon className={styles.toggleMenu} />
                            </IconButton>
                        </div>
                        </Hidden>
                        <div className={styles.logo}>
                            <img src={logo}/>
                        </div>
                        <Hidden xsDown>
                        <div className={styles.linkWrapper}>
                            <HashLink smooth to='#content1' className={styles.link}> nav 1</HashLink>
                            <HashLink smooth to='#content2' className={styles.link}> nav 2</HashLink>
                        </div>
                        </Hidden>
                    </div>
                    <div className={styles.leftPart}>
                        <Button color="inherit">Login</Button>
                    </div>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorForMenu}
                        keepMounted
                        open={Boolean(anchorForMenu)}
                        onClose={closeMenu}
                        className={styles.dropDownMenu}>
                        <MenuItem onClick={closeMenu}>
                            <HashLink smooth to='#content1' className={styles.link}> nav 1</HashLink>
                        </MenuItem>
                        <MenuItem onClick={closeMenu}>
                            <HashLink smooth to='#content2' className={styles.link}> nav 2</HashLink>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>

    )
};

export default Header;
