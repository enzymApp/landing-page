import React      from 'react'
import DistributedTokens         from '../components/blockchain/DistributedTokens'
import GamingRow                 from '../components/home/GamingRow'
import GiftsBlock                from '../components/home/GiftsBlock'
import JoinUsBanner              from '../components/home/JoinUsBanner'
import MeetingRow                from '../components/home/MeetingRow'
import TableStats                from '../components/home/TableStats'
import TeamBlock                 from '../components/home/TeamBlock'
import TwoTabsBlock              from '../components/home/TwoTabsBlock'
import Video                     from '../components/home/Video'
import ReferrerLinksContainer    from '../components/ReferrerLinksContainer'
import ReferrerListContainer     from '../components/ReferrerListContainer'
import SubscriptionFormContainer from '../components/SubscriptionFormContainer'
import SocialLink                from '../components/SocialLink'
import SocialShares              from '../components/SocialShares'
import T                         from '../components/Translator'
import Footer                    from '../layouts/Footer'
import Header                    from '../layouts/Header'
import Main                      from '../layouts/Main'


export default function Home({emailLoginAttempt, user, children, referrer}) {
  return (
    <div>
      <Header />
      <Main isUserPage={isReferrer(user, referrer)}>
        {!hasAccount(user, referrer) &&
          <SubscriptionFormContainer {...{emailLoginAttempt}} />
        }
        <div className="banner_ready">
          {isReferrer(user, referrer) &&
            <ReferrerLinksContainer user={user} referrer={referrer} />
          }
          {hasAccount(user, referrer) && (
            <DistributedTokens
              ethAddress={referrer.ethAccount}
              zyms={referrer.zyms}
            />
          )}
          {hasAccount(user, referrer) &&
            <SocialShares referrer={referrer} />
          }
          {hasAccount(user, referrer) && (
            <div>
              <ReferrerListContainer referrer={referrer} />
              <span className="know_more_gifts">
                <T>
                  Referrer.giftsLink.before
                  <a role="button" tabIndex="0" onClick={scrollToGifts}><T>Referrer.giftsLink.text</T></a>
                  Referrer.giftsLink.after
                </T>
              </span>
            </div>
          )}
        </div>
      </Main>
      <Video />
      <GamingRow />
      <MeetingRow />
      <JoinUsBanner scroll text="Home.buttons.joinUs" />
      <TwoTabsBlock />
      <GiftsBlock />
      <TableStats />
      <TeamBlock />
      <JoinUsBanner openChat text="Home.buttons.contribute" />
      <Footer />
      <div className="social_links" align="right">
        <SocialLink name="facebook" />
        <SocialLink name="twitter" />
        <SocialLink name="telegram" />
      </div>
    </div>
  )
}

function hasAccount(user, referrer) {
  return !!user && !!referrer
}

function isReferrer(user, referrer) {
  return user && referrer && referrer.userId === user._id
}

function scrollToGifts() {
  document.getElementsByClassName('recompenses')[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
}
