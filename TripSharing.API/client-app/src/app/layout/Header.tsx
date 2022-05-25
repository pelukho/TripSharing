import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return(
        <header className="theme-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="logo">
                            <Link to={'/'} >
                                <img src="/assets/images/logo.png"  alt={''} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}