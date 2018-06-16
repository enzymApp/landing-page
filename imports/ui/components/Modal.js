import React         from 'react'
import {Button,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter} from 'reactstrap'
import {withRouter}  from 'react-router-dom'


const MyModal = ({children, history, title, outRoute}) => {
  const toggle = () => history.push(outRoute)
  return (
    <Modal isOpen={!!title} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal>
  )
}

export default withRouter(MyModal)
