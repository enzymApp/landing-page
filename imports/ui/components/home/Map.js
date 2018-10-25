import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import ReactMapboxGl, { Marker, Cluster } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: Meteor.settings.public.mapboxAccessToken
})

const MAP_STYLE_URL = 'mapbox://styles/slaivyn/cjnj4oluv1w3t2skzv5ox2bpo'

class MapView extends React.Component {
  state = {
    viewport: {
      width:     '100%',
      height:    '100%',
      latitude:  44.725,
      longitude: 2.373,
      zoom:      3.8
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.ready !== this.props.ready || nextProps.users.length !== this.props.users.length)
      return true
    if(JSON.stringify(nextState) !== JSON.stringify(this.state)) return true
    return false
  }
  render() {
    const { users } = this.props
    console.log(users)
    const { latitude, longitude, height, width, zoom } = this.state.viewport
    return (
      <div className="map-container">
        <Map
          style={MAP_STYLE_URL}
          containerStyle={{ height, width }}
          center={[longitude, latitude]}
          zoom={[zoom]}
        >
          {ready && (
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {users.map(u => this.getLocation(u))
                .filter(l => !!l)
                .map((location, idx) => (
                  <Marker
                    key={idx}
                    coordinates={location}
                  >
                  </Marker>
              ))}
            </Cluster>
          )}
        </Map>
      </div>
    )
  }
  clusterMarker = (coordinates, number) => {
    const size = 40 + Math.floor(Math.log10(number)) * 8
    styles.playerCount.height = styles.playerCount.width = size
    const key = JSON.stringify(coordinates)
    return (
      <Marker coordinates={coordinates} style={styles.playerCount} key={key}>
        <div style={styles.playerCountText}>{number}</div>
      </Marker>
    )
  }
  getLocation = (user) => {
    if(user.location) return user.location.coordinates
    if(user.profile && user.profile.geoloc) return user.profile.geoloc.split(',').reverse()
  }
}
export default withTracker(() => {
  const handler = Meteor.subscribe('users.locations')
  return {
    ready: handler.ready(),
    users: Meteor.users.find().fetch()
  }
})(MapView)

const styles = {
  playerCount: {
    backgroundColor: '#E63B97',
    opacity: 1,
    display: 'table',
    height: 20,
    width: 20,
    borderRadius: '50%',
    border: '5px solid',
    borderColor: '#FFD900',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  playerCountText: {
    fontSize: 18,
    color: 'white',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: 'Quicksand-Bold',
  },
}
