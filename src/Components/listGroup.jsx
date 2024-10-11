import React from 'react'
import "../Styles/listGroup.css"

const ListGroup = (props) => {
    const {items, selectedItem, onItemSelect} = props;
    console.log(props);
    return (
        <React.Fragment>
            <ul className="list-group">
                {items.map( item => 
                    <li key={item._id}
                        onClick={() => onItemSelect(item)}
                        className= {selectedItem && item.name === selectedItem.name ? "list-group-item list-group-item-active":"list-group-item"}>
                        {item.name}
                    </li>
                )}
            </ul>
        </React.Fragment>
    );
}

export default ListGroup;
