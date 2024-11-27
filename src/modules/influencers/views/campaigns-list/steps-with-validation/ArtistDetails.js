import React, { Fragment } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils'
import {
  Label,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container
} from 'reactstrap'

import '@styles/react/libs/react-select/_react-select.scss'
import _ from "lodash"
import AsyncSelect from "react-select/async"
import {_getAllArtistsWithQ, _getAllLanguagesWithQ} from "../../../redux/actions"

const ArtistDetails = ({ stepper, type, formState }) => {
  const { register, errors, handleSubmit, trigger, control } = useForm()
  const  {formData, setFormData} = formState

  const onSubmit = (data) => {
    trigger()
    if (_.isEmpty(errors)) {
      setFormData(prevState => ({
        ...prevState,
        ...data,
        user_id: data.user_id.value
      }))
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Artist Info</h5>
        <small>Enter Your Artist Info.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className='form-label' for={`user_id`}>
                  Artist
                </Label>
                <Controller
                    as={AsyncSelect}
                    control={control}
                    name={'user_id'}
                    isClearable={false}
                    isMulti={false}
                    classNamePrefix='select'
                    defaultOptions
                    cacheOptions
                    loadOptions={_getAllArtistsWithQ}
                    className={classnames('react-select', { 'is-invalid': errors['user_id']})}
                    defaultValue={formData.user_id}
                    rules={{
                      required: true
                    }}
                />
              </FormGroup>
            </Col>
          </Row>
        </Container>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default ArtistDetails
