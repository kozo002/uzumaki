import * as React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

type Props = {
  user: UserT,
}

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`

export default function Header (props: Props) {
  const [isDropdownOpened, setDropdownOpened] = React.useState(false)
  const title = useSelector<AppStateT, string>((state: AppStateT) => state.title.headerTitle)

  function handleDropdownButtonClick (e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDropdownOpened(!isDropdownOpened)
  }

  function handleDropdownMenuClick (e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleCoverClick (e: React.MouseEvent) {
    setDropdownOpened(false)
  }

  return (
    <div className="navbar navbar-light bg-light">
      <div>
        <Link to="/" className="navbar-brand">🌀Uzumaki</Link>
        {title}
      </div>

      <nav>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              onClick={handleDropdownButtonClick}
            >
              {props.user.name}
            </a>
            <div
              className={classnames(
                'dropdown-menu',
                'dropdown-menu-right',
                { show: isDropdownOpened }
              )}
              style={{ position: 'absolute' }}
              onClick={handleDropdownMenuClick}
            >
              <Link to="/logout" className="dropdown-item">
                <i className="material-icons">power_settings_new</i>
                &nbsp;
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      {isDropdownOpened && <Cover onClick={handleCoverClick} />}
    </div>
  )
}