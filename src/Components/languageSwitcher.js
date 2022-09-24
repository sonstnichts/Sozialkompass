import React from "react"
import { Link } from "gatsby"
import gerFlag from ".Components/flags/de.svg"
import ukrFlag from ".Components/flags/ua.svg"

const LanguageSelector = ({ location }) => {
  let pageName = location.pathname

  if (pageName.includes("/el")) {
    pageName = pageName.split("/")[2]
  }

  let gerPagePath = `/el/${pageName}`

  return (
    <div>
      <Link to={pageName}>
        <img src={ukrFlag} alt="Ukrainisch" />
      </Link>
      <Link to={gerPagePath}>
        <img src={gerFlag} alt="Deutsch" />
      </Link>
    </div>
  )
}

export default LanguageSelector