import React from 'react';
import Item from '../Item/Item';

const List = React.memo(({list, onRemoveItem}) => {
    console.log("Inside List")
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
);

export default List;