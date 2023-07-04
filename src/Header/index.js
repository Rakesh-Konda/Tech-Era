import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <Link to="/" className="lll">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </nav>
      </div>
    )
  }
}
export default Header
