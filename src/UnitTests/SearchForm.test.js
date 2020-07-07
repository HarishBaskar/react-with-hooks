import React from 'react';
import renderer from 'react-test-renderer';
import SearchForm from '../components/SearchForm/SearchForm';
import Search from '../components/Search/Search';

describe('SearchForm', () => {
    const searchFormProps = {
      search: 'React',
      onSearch: jest.fn(),
      id: "search",
      isFocused: false,
      onFormSubmit: jest.fn(),
    };
  
    let component;
  
    beforeEach(() => {
      component = renderer.create(<SearchForm {...searchFormProps} />);
    });
  
    it('renders the input field with its value', () => {
      const value = component.root.findByType(Search).props.search;
      expect(value).toEqual('React');
    });

    it("submits the form", () => {
        const pseudoEvent = {};
        component.root.findByType('form').props.onSubmit(pseudoEvent);
        expect(searchFormProps.onFormSubmit).toHaveBeenCalledTimes(1);
        expect(searchFormProps.onFormSubmit).toHaveBeenCalledWith(pseudoEvent);
    });

    it("disables the button and prevent submit", () => {

        component.update(
            <SearchForm {...searchFormProps} search="" />
          );

        expect(component.root.findByType('button').props.disabled).toBeTruthy();
    })

  });