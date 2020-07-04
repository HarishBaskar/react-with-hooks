import React, {Component} from 'react';

//creating simple component for table header
//we are using JS arrow functions

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>

    );
}

//this is also a simple component

const TableBody = props => {
    //start of const rows
    const rows = props.characterData.map((row,index) => {

        return(
            <tr key = {index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
				<td><button onClick={()=>props.removeData(index)}>Delete</button></td>
            </tr>
        );
        
    });//end of rows

    return <tbody>{rows}</tbody>;
}


class Table extends Component
{
    render()
    {
        //this is a ES 6 feature. Here a variable is created
        //which contains this.props.characterData
        const {characterData} = this.props;
		const {removeData} = this.props;

        return(
            <table>
                <TableHeader/>
                <TableBody characterData = {characterData} removeData = {removeData}/>
            </table>
        );
    }
}

export default Table;