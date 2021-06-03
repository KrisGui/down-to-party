import React from 'react'
import {Card, Image, Media} from 'react-bootstrap'

export default function Profile({
  profile: {id, firstName, lastName, photoURL},
  photoSize,
  children
}) {
  return (
    <Card
      key={`profile-${id}`}
      className="profile center w-90 p-3"
      style={{marginBottom: 10}}
    >
      <Media style={{marginBottom: 10}}>
        <Image
          width={photoSize}
          height={photoSize}
          style={{marginRight: 30}}
          className="align-self-center"
          src={
            photoURL
              ? photoURL
              : `https://robohash.org/set_set5/bgset_bg1/${firstName}${lastName}.png`
          }
          alt={`${firstName}${lastName}`}
          roundedCircle
        />
        <Media.Body>{children}</Media.Body>
      </Media>
    </Card>
  )
}
