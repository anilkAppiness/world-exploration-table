import React from 'react'
import { CountryTable } from './CountryTable'

describe('<CountryTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CountryTable />)
  })
})