import {getValue} from './selectors'
import { render, screen, fireEvent } from '@testing-library/react';
import reducer, { incremented } from "../reducer";

describe('selectors descripbe', () => {
    test('getValue', () => {
        expect(getValue({})).toBe(0)
    })
    test('get filled value', () => {
        expect(getValue({
            reducer : {
                value: 100
            }
        })).toBe(100)
    })
})

describe('reducers describe', () => {
    test('reducer test' , () => {
        expect(reducer({value : 150}, incremented())).toEqual({
            value: 151
        })
    })
})
//do somehintg with thunk
