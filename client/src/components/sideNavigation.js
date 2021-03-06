import React from 'react';
// import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src="https://sbhack19-prod.s3.eu-central-1.amazonaws.com/public-resources/lobo.png"/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/app/main" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="folder" className="mr-3"/>
                        Your collection
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/app/upload" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="upload" className="mr-3"/>
                        Upload items
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;