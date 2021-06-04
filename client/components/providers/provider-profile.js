import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import {fetchProviderQuotes, updateQuoteStatus} from '../../store/quotes'
import {createProvider, fetchProvider} from '../../store/providers'
import moment from 'moment'
import Services from '../services/services'
import {Tabs, Tab} from 'react-bootstrap'

export default function ProviderProfile({user, isThisUser, history}) {
  const dispatch = useDispatch()
  const {services} = useSelector(state => state.providers)

  useEffect(
    () => {
      if (user.provider) {
        dispatch(fetchProvider(user.provider.id))
      }
    },
    [user.provider]
  )

  const handleCreateProvider = userId => {
    dispatch(createProvider(userId, history))
  }

  return (
    <Container>
      {user.provider ? (
        user.provider.isActive ? (
          <Services services={services} />
        ) : (
          <div>Inactive Provider</div>
        )
      ) : isThisUser ? (
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
      ) : (
        <div>Not a provider</div>
      )}
    </Container>
  )
  // let quotes
  // const dispatch = useDispatch()
  // if (isAuthenticatedProvider) {
  //   const {id: providerId} = useSelector(state => state.providers)
  //   quotes = useSelector(state => state.quotes)
  //   useEffect(() => {
  //     dispatch(fetchProviderQuotes(providerId))
  //   }, [])
  // }
  // return (
  //   <Container>
  //     <br />
  //     {isAuthenticatedProvider && <h2 className="text-center">Event Quotes</h2>}
  //     {isAuthenticatedProvider && quotes && quotes.length ? (
  //       quotes.map(quote => (
  //         <Card
  //           key={quote.id}
  //           className="center w-75"
  //           style={{marginBottom: 10}}
  //         >
  //           <Card.Header>
  //             {quote &&
  //               quote.listing &&
  //               quote.listing.event &&
  //               quote.listing.event.eventType.name}
  //             <span className="gray-small">
  //               {' '}
  //               {`for ${quote &&
  //                 quote.listing &&
  //                 quote.listing.event &&
  //                 quote.listing.event.Host.email}`}
  //             </span>
  //             <span className="float-right gray-small">
  //               status: {quote.status}
  //             </span>
  //           </Card.Header>
  //           <Card.Body>
  //             <Card.Title>
  //               {quote && quote.service && quote.service.type.title}
  //               <span className="gray-small">
  //                 {' '}
  //                 {moment(
  //                   quote && quote.listing && quote.listing.event.date
  //                 ).format('MMMM Do YYYY, h:mm a')}
  //               </span>
  //             </Card.Title>
  //             <div>
  //               Hourly Rate: ${quote && quote.service && quote.service.rate1}
  //             </div>
  //             <div>
  //               Rate Type: {quote && quote.service && quote.service.rate1Mode}
  //             </div>
  //             <Button
  //               className="float-right"
  //               onClick={() =>
  //                 dispatch(updateQuoteStatus(quote.id, 'accepted'))
  //               }
  //               variant="success"
  //             >
  //               Confirm
  //             </Button>
  //             <Button
  //               style={{marginRight: 5}}
  //               className="float-right"
  //               onClick={() =>
  //                 dispatch(updateQuoteStatus(quote.id, 'rejected'))
  //               }
  //               variant="danger"
  //             >
  //               Deny
  //             </Button>
  //           </Card.Body>
  //         </Card>
  //       ))
  //     ) : (
  //       <p className="text-center">
  //         {isAuthenticatedProvider && "You haven't received any quotes"}
  //       </p>
  //     )}
  //   </Container>
  // )
}
