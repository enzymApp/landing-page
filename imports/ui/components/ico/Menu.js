import React    from 'react'
import {Meteor} from 'meteor/meteor'
import i18n     from 'meteor/universe:i18n'

export default ({link, name}) => (
  <div>
    <a href="/ico#about-ico" class="hide-link">About Enzym</a>
    <div class="whitepaper inb hide-link">
      <div class="outline">
        <b className="name">Whitepaper</b>
        <div class="sub-lang">
          <a href="">FR</a><br/>
          <a href="">EN</a><br/>
          <a href="">CH</a><br/>
          <a href="">RUS</a><br/>
          <a href="">AR</a><br/>
        </div>
      </div>
    </div>
    <a href="/ico#team-ico" class="hide-link">Team</a>
  </div>
)
