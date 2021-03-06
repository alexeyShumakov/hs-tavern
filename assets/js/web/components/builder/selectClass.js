import React from 'react';
import { Link } from 'react-router-dom';

const arr = [
  'druid', 'hunter', 'mage',
  'paladin', 'priest', 'rogue',
  'shaman', 'warlock', 'warrior',
];
export default () => (
  <div>
    <h1 className="title">Choose your way</h1>
    <div className="columns is-multiline">
      {
        arr.map(className => (
          <div key={className} className="column is-4">
            <div className="card">
              <Link to={`/builder/${className}`}>
                <div className="card-image">
                  <figure className="image">
                    <img src={`/images/medium/class-${className}.jpg`} alt="" />
                  </figure>
                </div>
              </Link>
              <div className="card-content">
                <Link to={`/builder/${className}`}>{className.toUpperCase()}</Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);
