import React, {useEffect} from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchListings} from '../../store/listings'
import Filters from '../util/filters'

export default function Listings({history, location}) {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)

  useEffect(
    () => {
      dispatch(fetchListings(location.search))
    },
    [location.search]
  )

  return (
    <Container>
      <Row>
        <Col md={8}>
          {listings ? (
            listings.length ? (
              listings.map(({id, positionsAvailable, role, event}) => (
                <Card
                  key={id}
                  className="listings center w-90 p-3"
                  style={{marginBottom: 10}}
                >
                  <Card.Header>
                    <span>
                      <Link to={`/listings/${id}`}>{role.title}</Link>
                    </span>
                    <span className="float-right">
                      {positionsAvailable} position(s) available!
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <div>Location: {event.location}</div>
                    <div>Date: {event.date}</div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>There are no listings</p>
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
