import React, {useState} from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Media,
  Nav,
  Row,
  Tab
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProvider} from '../../store/providers'
import {updateUser} from '../../store/user'

export default function UserForm({history}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [inputs, setInputs] = useState({
    photoURL: '',
    location: ''
  })

  const handleInput = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (inputs.photoURL === '') inputs.photoURL = user.photoURL
    if (inputs.location === '') inputs.location = user.location

    dispatch(updateUser({...inputs}, user.id))

    history.push(`/users/${user.id}/profile`)
  }

  const handleCreateProvider = userId => {
    dispatch(createProvider(userId, history))
  }

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
                <Card className="user-profile p-3">
                  <Media style={{marginBottom: 10}}>
                    <Image
                      width={200}
                      height={200}
                      style={{marginRight: 10}}
                      className="align-self-center"
                      src={
                        user.photoURL
                          ? user.photoURL
                          : `https://robohash.org/set_set5/bgset_bg1/${
                              user.email
                            }.png`
                      }
                      alt={user.email}
                      roundedCircle
                    />
                    <Media.Body>
                      <Form>
                        <Form.Group controlId="photoURL">
                          <Form.Label>URL to your profile picture:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="https://www.example.com/your-photo"
                            onChange={e => handleInput(e)}
                            value={inputs.photoURL}
                          />
                        </Form.Group>
                        <Form.Group controlId="location">
                          <Form.Label>Location:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={
                              user.location
                                ? user.location
                                : 'A galaxy far far away...'
                            }
                            onChange={e => handleInput(e)}
                            value={inputs.location}
                          />
                        </Form.Group>
                      </Form>
                    </Media.Body>
                  </Media>
                  <div>
                    <Button
                      onClick={e => handleSubmit(e)}
                      className="float-right"
                      variant="success"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="provider">
                <Card className="user-profile p-3">
                  {user && user.provider && user.provider.id ? (
                    <>
                      <div>Your Provider account is active!</div>
                      <br />
                      <Button as={Link} to={`/providers/${user.provider.id}`}>
                        Public Provider Page
                      </Button>
                    </>
                  ) : (
                    <>
                      <p>Become a service provider!</p>
                      <Button
                        onClick={() => handleCreateProvider(user.id)}
                        className="float-right"
                        variant="success"
                      >
                        Create a Provider Account!
                      </Button>
                    </>
                  )}
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}
