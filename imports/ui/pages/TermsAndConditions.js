import React  from 'react'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import breaks        from 'remark-breaks'
import Modal         from '../components/Modal'
import T             from '../components/Translator'


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
    <T _translateProps={['title', 'children']}>
      <Modal title="Terms.title.legal" outRoute="/">
        <ReactMarkdown source={input} plugins={[breaks]} renderers={renderers} />
      </Modal>
    </T>
  )
}
