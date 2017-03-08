import { Perusahaan } from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Perusahaan />', () => {
  it('renders null component if no children passed', () => {
    const wrapper = shallow(<Perusahaan />);
    expect(wrapper.html()).toNotExist();
  });

  it('renders children if passed', () => {
    const wrapper = shallow(
      <Perusahaan>
        <div />
      </Perusahaan>
    );

    const expected = shallow(
      <div>
        <div />
      </div>
    );

    expect(wrapper.html()).toEqual(expected.html());
  });
});
