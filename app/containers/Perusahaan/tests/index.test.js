import { Perusahaan } from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Perusahaan />', () => {
  it('renders null component', () => {
    const wrapper = shallow(<Perusahaan />);
    expect(wrapper.html()).toNotExist();
  });
});
