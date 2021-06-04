import React, {useEffect} from 'react'
import {Button, Col, Container, Nav, Row, Tab} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUser} from '../../store/users'
import UserProfile from './user-profile'
import ProviderProfile from '../providers/provider-profile'
import {Link} from 'react-router-dom'

export default function User({history, match}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const otherUser = useSelector(state => state.users)

  const isThisUser = () => user.id === parseInt(match.params.userId, 10)

  useEffect(() => {
    if (!isThisUser()) {
      dispatch(fetchUser(match.params.userId))
    }
  }, [])

  return (
    <Container>
      <Tab.Container id="left-profile-tabs" defaultActiveKey="profile">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="provider">Provider</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <UserProfile user={isThisUser() ? user : otherUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="provider">
                <ProviderProfile
                  user={isThisUser() ? user : otherUser}
                  isThisUser={isThisUser()}
                  history={history}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        {isThisUser() ? (
          <Button
            as={Link}
            to={`/users/${user.id}/edit`}
            className="float-right"
          >
            Edit Profile
          </Button>
        ) : null}
      </Tab.Container>
    </Container>
  )
}
