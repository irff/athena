import Accordion, { Item } from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Accordion />', () => {
  it('contains an <Accordion /> component', () => {
    const wrapper = mount(<Accordion />);
    expect(wrapper.find(Accordion).length).toBe(1);
  });

  it('contains its Accordion.Item children', () => {
    const wrapper = mount(
      <Accordion>
        <Accordion.Item />
      </Accordion>
    );
    expect(wrapper.find(Item).length).toBe(1);
  });

  it('renders title of its Items', () => {
    const wrapper = mount(
      <Accordion>
        <Accordion.Item title="Title" />
      </Accordion>
    );
    expect(wrapper.find(Item).first().text()).toInclude('Title');
  });

  it('has an initial state', () => {
    const wrapper = mount(<Accordion />);
    expect(wrapper.state()).toEqual({
      opened: [],
    });
  });

  it('renders content of opened Items given the initialState', () => {
    const wrapper = mount(
      <Accordion initialState={[0]}>
        <Accordion.Item>
          <p>Opened</p>
        </Accordion.Item>
        <Accordion.Item>
          <p>Closed</p>
        </Accordion.Item>
      </Accordion>
    );
    expect(wrapper.find('p').text()).toInclude('Opened');
    expect(wrapper.find('p').text()).toNotInclude('Closed');
  });

  it('opens the content of clicked item', () => {
    const wrapper = mount(
      <Accordion>
        <Accordion.Item>
          <p>Initially closed</p>
        </Accordion.Item>
      </Accordion>
    );
    expect(wrapper.find('p').length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toInclude('Initially closed');
  });
});
