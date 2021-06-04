import React from 'react'
import {Container, Card} from 'react-bootstrap'

export default function Services({services}) {
  return (
    <Container>
      <Card>
        <Card.Body className="user-profile p-0">
          {services ? (
            services.length ? (
              services.map(service => (
                <Card key={service.id}>
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>{service.type.title}</div>
                    <div>
                      ${service.rate1} / {service.rate1Mode}
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No services</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}
