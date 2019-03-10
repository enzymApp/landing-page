import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import ReactMapboxGl, { Marker, Cluster, ZoomControl } from 'react-mapbox-gl'

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
    if(nextProps.ready !== this.props.ready) return true
    if(nextProps.ready && nextProps.users.length !== this.props.users.length) return true
    if(JSON.stringify(nextState) !== JSON.stringify(this.state)) return true
    return false
  }
  render() {
    const { ready, users } = this.props
    console.log(ready, users.length)
    const { latitude, longitude, height, width, zoom } = this.state.viewport
    return (
      <div className="map-container">
        <Map
          style={MAP_STYLE_URL}
          containerStyle={{ height, width }}
          center={[longitude, latitude]}
          zoom={[zoom]}
          dragRotate={false}
        >
          <ZoomControl/>
          {ready && (
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {users.map(u => this.getLocation(u))
                .filter(l => !!l)
                .map((location) => (
                  <Marker
                    key={JSON.stringify(location)}
                    coordinates={location}
                  />
                ))
              }
            </Cluster>
          )}
        </Map>
      </div>
    )
  }
  clusterMarker = (coordinates, number) => {
    const size = 30 + Math.floor(Math.log10(number) * 20)
    const key = JSON.stringify(coordinates)
    return (
      <Marker
        coordinates={coordinates}
        style={{
          backgroundColor: '#E63B97',
          opacity: 1,
          display: 'table',
          height: size,
          width: size,
          borderRadius: '100%',
          border: '5px solid',
          borderColor: '#FFD900',
        }}
        key={key}
      >
        <div style={styles.playerCounter}>{number}</div>
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
  playerCounter: {
    fontSize: 18,
    color: 'white',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: 'Quicksand-Bold',
  },
}
