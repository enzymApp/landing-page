import React         from 'react'
import {Link}        from 'react-router-dom'
import { injectIntl } from 'react-intl'
import ReactMarkdown from 'react-markdown'
import breaks        from 'remark-breaks'
import { compose, withProps } from 'recompose'
import Modal         from '../components/Modal'


const renderers = {
  link: ({href, children}) => {
    if(!href) return children
    if(href[0] === '/') return <Link to={href}>{children}</Link>
    return <a href={href}>{children}</a>
  }
}

const TermsAndConditions = ({ title, content}) => {
  return (
    <Modal title={title} outRoute="/">
      <ReactMarkdown source={content} plugins={[breaks]} renderers={renderers} />
    </Modal>
  )
}

export default compose(
  injectIntl,
  withProps(({ intl: { formatMessage: t } }) => ({
    title: t({ id: 'terms.title.legal' }),
    content: t({ id: 'terms.legal' }),
  }))
)(TermsAndConditions)
