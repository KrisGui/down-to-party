import React, {useEffect} from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProviders} from '../../store/providers'
import Filters from '../util/filters'
import Profile from '../util/profile'

export default function Providers({history, location}) {
  const dispatch = useDispatch()
  const providers = useSelector(state => state.providers)

  useEffect(
    () => {
      dispatch(fetchProviders(location.search))
    },
    [location.search]
  )

  return (
    <Container>
      <Row>
        <Col md={8}>
          {providers ? (
            providers.length ? (
              providers.map(({id, profile}) => (
                <Profile key={id} profile={profile} photoSize={75}>
                  <Card.Title>
                    <Link to={`/providers/${id}`}>
                      {profile.firstName + ' ' + profile.lastName}
                    </Link>
                  </Card.Title>
                  Location:{' '}
                  {profile.location ? profile.location : 'Unspecified'}
                </Profile>
              ))
            ) : (
              <p>There are no providers</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </Col>
        <Col>
          <Filters history={history} location={location} />
        </Col>
      </Row>
    </Container>
  )
}
