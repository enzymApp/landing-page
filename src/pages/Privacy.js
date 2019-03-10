import React         from 'react'
import { injectIntl } from 'react-intl'
import ReactMarkdown from 'react-markdown'
import breaks        from 'remark-breaks'
import { compose, withProps } from 'recompose'
import Modal         from '../components/Modal'

const Privacy = ({ content, title }) => {
  return (
    <Modal title={title} outRoute="/">
      <ReactMarkdown source={content} plugins={[breaks]} />
    </Modal>
  )
}

export default compose(
  injectIntl,
  withProps(({ intl: { formatMessage: t } }) => ({
    title: t({ id: 'terms.title.privacy' }),
    content: t({ id: 'terms.privacy' }),
  }))
)(Privacy)
