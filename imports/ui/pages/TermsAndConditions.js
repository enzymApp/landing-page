import React  from 'react'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import breaks        from 'remark-breaks'
import HomeContainer from './HomeContainer'
import Modal         from '../components/Modal'


const renderers = {
  link: ({href, children}) => {
    if(!href) return children
    if(href[0] === '/') return <Link to={href}>{children}</Link>
    return <a href={href}>{children}</a>
  }
}

export default () => {
  const input = i18n.__('Terms.legal')
  return (
    <Modal title="Mentions légales" outRoute="/">
      <ReactMarkdown source={input} plugins={[breaks]} renderers={renderers} />
    </Modal>
  )
}
