import React from "react";
import { Link } from "gatsby";

const NavigationBar=({title})=>{
    return(
        <div>
            <nav className="navbar">
                <ul> 
                    <li>
                        <h1><Link to="/">{title}</Link></h1>
                    </li>
                    <li>
                        <Link to="/infra">Infrastructure</Link>
                    </li>
                    <li>
                        <Link to="/other">other</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
    
};
export default NavigationBar;