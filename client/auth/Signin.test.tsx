import React from 'react'
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Signin from './Signin'

Enzyme.configure({ adapter: new Adapter() });

const TEST_INPUT_DATA = {
    EMAIL: 'test@mail.ru',
    PASSWORD: 'test123',
}

describe('<Signin /> test', () => {
    const Component = shallow(<Signin />)

    it('should be mount snap', () => {
        expect(Component.html()).toMatchSnapshot()
    })

    it('input form data', () => {
        const Inputs = Component.find('TextField')
        Inputs.at(0).simulate('change', { target: { value: TEST_INPUT_DATA.EMAIL } })
        Inputs.at(1).simulate('change', { target: { value: TEST_INPUT_DATA.PASSWORD } })
        expect(Inputs.at(0).props().onChange).toBeCalledTimes(1)
    })
})