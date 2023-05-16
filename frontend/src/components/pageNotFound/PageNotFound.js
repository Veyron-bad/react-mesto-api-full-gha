import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';
import Bye from '../../images/pagenotfound.jpg';

function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span>Страница не найдена
      </h3>
      <img className="not-found__image" src={Bye} alt=""/>
      <Link className="button button_type_to-main" to="/">Вернуться назад</Link>
    </div>
  )
}

export default PageNotFound;