import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="menu-wrapper">
            <ul className="menu">
                <li className="list">
                    <Link to="/">Home</Link>
                </li>
                <li className="list">
                    <Link to="/test">Test</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;