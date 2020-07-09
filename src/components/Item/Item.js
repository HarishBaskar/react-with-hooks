import React from 'react';
import { ReactComponent as Check } from '../../SVG/check.svg';
import style from './Item.module.css';

const Item = ({item, onRemoveItem}) => {
    return(
        <div className={style.item}>
          <span style={{width: '40%'}}>
              <a href={item.url}>{item.title}</a>
          </span>
          <span style={{width: '30%'}}>{item.author}</span>
          <br/>
          <span style={{width: '10%', textAlign: 'center'}}>{item.num_comments}</span>
          <br/>
          <span style={{width: '10%'}}>{item.points}</span>
          <br/>
          <span style={{width: '10%'}}>
              <button className={`${style.button} ${style.buttonsmall}`}
                  onClick={() => onRemoveItem(item)}>Dismiss
              &nbsp;
              <Check height="18px" width="18px" />
              </button>
          </span>
      </div>
    )
  }

export default Item;