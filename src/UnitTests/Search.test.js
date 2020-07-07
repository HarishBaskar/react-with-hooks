import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../components/Search/Search';
import Item from '../components/Item/Item';

describe('Search', () => {

    const searchProps = {
        search: 'React',
        onSearch: jest.fn(),
        id: "search",
        isFocused: true,
        onFormSubmit: jest.fn(),
    };

    let component;

    component = renderer.create(<Search {...searchProps}/>)

    it("Changes the input field", () => {
        const pseudoEvent = { target: 'Redux' };

        component.root.findByType('input').props.onChange(pseudoEvent);

        expect(searchProps.onSearch).toHaveBeenCalledTimes(1);
        expect(searchProps.onSearch).toHaveBeenCalledWith(pseudoEvent);
    });
});