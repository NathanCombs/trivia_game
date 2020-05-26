import React from 'react';
import { PageContainer } from '../page-container';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe ("PageContainer", () => {

  it('renders body', () => {
    const wrapper = shallow(<PageContainer body={() => {return(<p>Stub Content</p>)}}/>);
    expect(wrapper.find('p').text()).toContain('Stub Content')
  });

  it('renders header', () => {
    const wrapper = shallow(<PageContainer header='Stub Header' body={() => {return(<p>Stub Content</p>)}}/>);
    expect(wrapper.find('h1').text()).toContain('Stub Header')
  });

  it('renders primary button', () => {
    const wrapper = shallow(
      <PageContainer
        header='Stub Header'
        body={() => {return(<p>Stub Content</p>)}}
        primaryButton={{label: 'Stub Label', action: () => {}}}
      />
    );
    expect(wrapper.find('.buttonContainer').text()).toContain('Stub Label');
  });

  it('renders secondary button', () => {
    const wrapper = shallow(
      <PageContainer
        header='Stub Header'
        body={() => {return(<p>Stub Content</p>)}}
        secondaryButton={{label: 'Stub Label', action: () => {}}}
      />
    );
    expect(wrapper.find('.buttonContainer').text()).toContain('Stub Label');
  });

});
