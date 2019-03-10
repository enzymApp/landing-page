import React         from 'react'
import {Modal,
        ModalHeader,
        ModalBody,
        ModalFooter} from 'reactstrap'
import {withRouter}  from 'react-router-dom'


const MyModal = ({children, history, title, outRoute}) => {
  const toggle = () => history.push(outRoute)
  return (
    <Modal isOpen={!!title} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter />
    </Modal>
  )
}

export default withRouter(MyModal)
