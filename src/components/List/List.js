import React from 'react';
import style from './List.module.css';
import { ReactComponent as Check } from '../../SVG/check.svg';

const List = ({list, onRemoveItem}) => {
    const newlist = list.map((item,index) => 
        <Item key={item.objectID} 
              onRemoveItem = {onRemoveItem}
              item={item}/>);

    return(
        <div>
            {newlist}
        </div>
    )
}

const Item = ({item, onRemoveItem}) => {
  return(
      <div className={style.item}>
        <span style={{width: '40%'}}>
            <a href={item.url}>{item.title}</a>
        </span>
        <span style={{width: '30%'}}>Author: {item.author}</span>
        <br/>
        <span style={{width: '10%'}}>Comments: {item.num_comments}</span>
        <br/>
        <span style={{width: '10%'}}>Points: {item.points}</span>
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

export default List;