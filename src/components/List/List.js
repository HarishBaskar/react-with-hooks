import React from 'react';

const List = (props) => {
    const list = props.list.map((item,index)=>{
        return(
          <div key={item.objectID}>
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
          </div>
        )
      })

    return(
        <div>
            {list}
        </div>
    )
}

export default List;