import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Checkout, total } from './Checkout'
import { useSelector, useDispatch } from 'react-redux';

const adapter = new Adapter()
enzyme.configure({adapter})

const dispatch = useDispatch();

describe('Total', () => {
    beforeEach(() => {

    })
    
    it('computes total of orderItems', () => {
      
    })
  })