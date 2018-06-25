import i18n          from 'meteor/universe:i18n'
import React         from 'react'
import ReactMarkdown from 'react-markdown'
import breaks        from 'remark-breaks'
import HomeContainer from './HomeContainer'
import Modal         from '../components/Modal'
import T             from '../components/Translator'

export default () => {
  const input = i18n.__('Terms', 'privacy')
  return (
    <T _translateProps={['title', 'children']}>
      <Modal title="Terms.title.privacy" outRoute="/">
        <ReactMarkdown source={input} plugins={[breaks]}>
        </ReactMarkdown>
      </Modal>
    </T>
  )
}
