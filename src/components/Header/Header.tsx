import React from 'react';
import styles from './Header.module.scss';
import logo from './logo_white.svg';
import { HashLink } from 'react-router-hash-link';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import { user } from '../../modules/user/selectors';
import { signOutRequest } from '../../modules/user/actions';
import { AUTHORITIES, User } from '../../model/types/User';
import { StoreState } from '../../modules/types';

interface Props extends RouteComponentProps {
    user: User | null,
    signOutRequest: () => void
};

type LinkData = {
    to: string,
    text: string,
    isHashLink?: boolean
};

const USER_LINKS: Array<LinkData> = [
    {to: ROUTE_PATHS.myDecks, text: 'My decks'},
    {to: ROUTE_PATHS.allDecks, text: 'All decks'},
    {to: ROUTE_PATHS.createDeck, text: 'Create new'}
];

const ADMIN_LINKS: Array<LinkData> = [
    {to: ROUTE_PATHS.userManagement, text: 'User management'}
];

const getLinks:(user: User | null) => Array<LinkData> = (user) => {
    if (user && user.authority) {
        const isAdmin = user.authority === AUTHORITIES.ADMIN;
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

const Header: React.FC<Props> = ({user, signOutRequest, history}) => {
    const links: Array<LinkData> = getLinks(user);

    const signOut = () => {
        signOutRequest();
        history.push(ROUTE_PATHS.login);
    };

    return (
        <>
            <AppBar position="static" color={'default'}>
                <Toolbar className={styles.header}>
                    <Container className={styles.container}>
                    <div className={styles.leftPart}>
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
                        <Button color="inherit" onClick={signOut}>Sign out</Button>
                    </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </>

    )
};

const mapStateToProps = (store: StoreState) => ({
    user: user(store)
});
const mapDispatchToProps = {
    signOutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
