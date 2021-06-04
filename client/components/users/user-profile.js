import React from 'react'
import {Card, Container} from 'react-bootstrap'
import ProfileCard from '../util/profile-card'

export default function UserProfile({user}) {
  return (
    <Container>
      <ProfileCard profile={user} photoSize={200}>
        <Card.Title>{user.email}</Card.Title>
        Location: {user.location ? user.location : 'Unspecified'}
      </ProfileCard>
    </Container>
  )
}
