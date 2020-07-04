import React from 'react';

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
      <div>
        <span>Title: {item.title}</span>
        <br/>
        <span><a href={item.url}>{item.title}</a></span>
        <br/>
        <span>Author: {item.author}</span>
        <br/>
        <span>Comments: {item.num_comments}</span>
        <br/>
        <span>Points: {item.points}</span>
        <br/>
        <button onClick={() => onRemoveItem(item)}>Delete item</button>
    </div>
  )
}

export default List;