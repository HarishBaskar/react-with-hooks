import React from 'react';
import Item from '../Item/Item';
import { SORTS } from '../../Constants/Constants';
import { ReactComponent as UpArrow } from '../../SVG/UpArrow.svg';
import { ReactComponent as DownArrow } from '../../SVG/DownArrow.svg';
import style from './List.module.css';

const List = React.memo(({list, onRemoveItem}) => {

    const [sort, setSort] = React.useState('NONE');

    const [sortOrder, setSortOrder] = React.useState(true);

    const handleSort = sortKey => {
        setSort(sortKey);
        if(sortOrder)
        {
            setSortOrder(false);
        }
        else
        {
            setSortOrder(true);
        }
    }

    const sortFunction = SORTS[sort];
    const sortedList = sortFunction(list, sortOrder);

    console.log("Inside List")
    const newlist = sortedList.map((item,index) => 
        <Item key={item.objectID} 
              onRemoveItem = {onRemoveItem}
              item={item}/>);

        return(
            <div>
                <div style={{ display: 'flex', textAlign: 'left' }}>
                    <span style={{ width: '40%' }}>
                        <button className={`${style.button} ${style.buttonsmall}`} onClick={() => handleSort('TITLE')}>
                            Title
                            &nbsp;
                            {sortOrder ? (<DownArrow height="18px" width="18px" />) : (<UpArrow height="18px" width="18px" />)}
                        </button>
                    </span>
                    <span style={{ width: '30%' }}>
                        <button className={`${style.button} ${style.buttonsmall}`} onClick={() => handleSort('AUTHOR')}>
                            Author
                            &nbsp;
                            {sortOrder ? (<DownArrow height="18px" width="18px" />) : (<UpArrow height="18px" width="18px" />)}
                        </button>
                    </span>
                    <span style={{ width: '10%' }}>
                        <button className={`${style.button} ${style.buttonsmall}`} onClick={() => handleSort('COMMENT')}>
                            Comments
                            &nbsp;
                            {sortOrder ? (<DownArrow height="18px" width="18px" />) : (<UpArrow height="18px" width="18px" />)}
                        </button>
                    </span>
                    <span style={{ width: '10%' }}>
                        <button className={`${style.button} ${style.buttonsmall}`} onClick={() => handleSort('POINT')}>
                            Points
                            &nbsp;
                            {sortOrder ? (<DownArrow height="18px" width="18px" />) : (<UpArrow height="18px" width="18px" />)}
                        </button>
                    </span>
                    <span style={{ width: '10%' }}>Actions</span>
                </div>
                {newlist}
            </div>
        )
    }
);

export default List;