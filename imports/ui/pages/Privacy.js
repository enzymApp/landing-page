import React from 'react'
import HomeContainer from './HomeContainer'
import Modal         from '../components/Modal'

export default () => (
  <div>
    <HomeContainer />
    <Modal title="test2" outRoute="/">
      <div>bla</div>
    </Modal>
  </div>
)
