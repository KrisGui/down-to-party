import queryString from 'query-string'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllSkills} from '../../store/skill'
import {Form, Button, Card} from 'react-bootstrap'

export default function Filters({history, location}) {
  const dispatch = useDispatch()
  const skills = useSelector(state => state.skills)
  const [locationInput, setLocationInput] = useState('')
  const [skillIds, setSkillIds] = useState([])

  useEffect(() => {
    dispatch(fetchAllSkills())
  }, [])

  const handleLocationInput = e => {
    setLocationInput(e.target.value)
  }

  const handleSwitch = e => {
    const id = parseInt(e.target.id, 10)
    if (skillIds.includes(id)) {
      setSkillIds(skillIds.filter(skillId => skillId !== id))
    } else {
      setSkillIds([...skillIds, id])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const queryStringified = queryString.stringify(
      {
        location: locationInput,
        skill: skillIds
      },
      {skipEmptyString: true}
    )
    history.push(location.pathname + '?' + queryStringified)
  }

  const clearFilters = () => {
    setLocationInput('')
    setSkillIds([])
    history.push(location.pathname)
  }

  return (
    <Form>
      <Form.Group>
        <Button type="submit" onClick={e => handleSubmit(e)} variant="success">
          Set Filters
        </Button>
        <Button
          onClick={() => clearFilters()}
          className="float-right"
          variant="danger"
        >
          Clear Filters
        </Button>
      </Form.Group>
      <Form.Group controlId="locationInput">
        <Form.Label>Filter by Location:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Location"
          onChange={e => handleLocationInput(e)}
          value={locationInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Filter by Skill:</Form.Label>
        <Card>
          <Card.Body className="user-form p-0">
            {skills ? (
              skills.length ? (
                <>
                  <span
                    onClick={() => {
                      setSkillIds(
                        skills.reduce(
                          (skillIdArr, currSkill) => [
                            ...skillIdArr,
                            currSkill.id
                          ],
                          []
                        )
                      )
                    }}
                  >
                    all
                  </span>
                  {' / '}
                  <span onClick={() => setSkillIds([])}>none</span>
                  {skills.map(skill => (
                    <Card key={skill.id}>
                      <Card.Body>
                        {skill.title}
                        <Form.Switch
                          id={skill.id}
                          className="float-right"
                          checked={skillIds.includes(skill.id)}
                          onChange={e => handleSwitch(e)}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </>
              ) : (
                <p>No skills!</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </Card.Body>
        </Card>
      </Form.Group>
    </Form>
  )
}
