import React from 'react'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'
import TelegramShare              from '/imports/ui/components/TelegramShare'
import TableauConcours from '/imports/ui/components/TableauConcours'

export default () => {
  return (
    <div className="banner_ready" >
      <p>Un email de confirmation a été envoyé à cette adresse. Après confirmation, vous pourrez participer au concours.</p>
      <p>Partagez votre intérêt avec le lien ci-dessous ou sur les réseaux sociaux et gagnez des cadeaux !</p>
      <a href="#">link</a>
      <div className="social_shares">
        <FacebookShare />
        <TwitterShare />
        <TelegramShare />
      </div>
      <TableauConcours />
      <p>En savoir plus sur le <a href="#">programme de récompenses</a></p>
    </div>
  )
}
