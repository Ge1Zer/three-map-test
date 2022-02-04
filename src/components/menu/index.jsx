import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'


const Menu = () =>{


  return(
      <ul className={'menu__container'}>
        <li><NavLink to={'/mapbox'}>mapbox</NavLink></li>
        <li><NavLink to={'/leaflet'}>leaflet</NavLink></li>
        <li><NavLink to={'/openlayers'}>openlayers</NavLink></li>
      </ul>
  )
}

export default Menu;