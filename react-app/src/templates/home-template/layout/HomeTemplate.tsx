
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import Header from "./Header/Header";
import { Fragment } from 'react';


export const HomeTempalte = (props: any) => {

    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    )
}