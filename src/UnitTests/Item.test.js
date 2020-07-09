import React from 'react';
import Item from '../components/Item/Item';
import renderer from 'react-test-renderer';

describe('Item', () => {
    const item = {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      };

    const handleRemoveItem = jest.fn();

    let component;

    beforeEach(() => {
        component = renderer.create(<Item item={item} onRemoveItem = {handleRemoveItem} />);
    })
    
    it('renders all properties', () => {
        expect(component.root.findByType('a').props.href).toEqual(
            'https://reactjs.org/'
        );

        expect(component.root.findAllByType('span')[1].children.includes('Jordan Walke')).toEqual(true);
    });

    it('calls onRemoveItem on button click', () => {
        component.root.findByType('button').props.onClick();

        expect(handleRemoveItem).toHaveBeenCalledTimes(1);
        expect(handleRemoveItem).toHaveBeenCalledWith(item);

        expect(component.root.findAllByType('span').length).toEqual(5);
    });

    test('renders snapshot', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
});