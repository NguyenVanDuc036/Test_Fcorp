
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import Header from "./Header/Header";
import { Fragment } from 'react';

export const HomeTemplate = () => {
    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    )
}