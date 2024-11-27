import React, {Component} from "react"
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from 'reactstrap'

import {trans} from '@utils'
import {ButtonSpinner} from '@src/components'
import {_loginTwoFactor} from "../redux/actions"
import PinInput from "react-pin-input"
import {Center, NativeBaseProvider} from "native-base"

class TwoFactorModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: props.email,
      code: '',
      open: true
    }
  }

  _close = () => {
    this.setState({open: false}, this.props.onClose)
  }

  _onSubmit = () => {
    _loginTwoFactor(
      {email: this.state.email, code: this.state.code},
      (res) => {
        this.props.successCallback(res)
      },
      () => {
      }
    )
  }
  render () {
    return (
      <Modal isOpen={this.state.open} toggle={this._close} unmountOnClose={true} className='modal-dialog-centered'>
        <ModalHeader toggle={this._close}>Two Factor Authentication</ModalHeader>
        <ModalBody>
          <FormGroup>
            {/*<Label for='email'>Your verification code</Label>*/}
              <p className="text-center">
                  One time code send on your Email
              </p>
            <NativeBaseProvider>
              <Center>
                <PinInput
                    length={4}
                    initialValue=""
                    style={{width: 'max-content'}}
                    onChange={value => {
                        console.log(value)
                        this.setState({code: value})
                    }}
                    type="numeric"
                    inputMode="number"
                    inputStyle={{
                      borderWidth: '0.5px',
                      borderColor: '#6e6b7b',
                      borderStyle: 'solid',
                      borderRadius: 5
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
              </Center>
            </NativeBaseProvider>
            {/*<Input*/}
            {/*  type='text'*/}
            {/*  placeholder='6-digit code'*/}
            {/*  onChange={e => this.setState({code: e.target.value})}*/}
            {/*/>*/}
          </FormGroup>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple type='button'  color='primary' block disabled={(this.props.loading || this.state.code.length < 4)} onClick={this._onSubmit}>
            { this.props.loading ? <ButtonSpinner/> : null}
            <span>{trans('gen.actions.send')}</span>
          </Button.Ripple>

        </ModalFooter>
      </Modal>
    )
  }
}

//************************************//
const mapStateToProps = store => ({
  loading: store.app.loading
})

export default connect(mapStateToProps)(TwoFactorModal)

