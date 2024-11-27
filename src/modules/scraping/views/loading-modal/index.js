import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm, useFieldArray} from 'react-hook-form'
import {useSelector} from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {Plus, Trash} from 'react-feather'
import {
    FormGroup,
    Label,
    Button,
    Form,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroupAddon, InputGroup, InputGroupText, Col, Row, Table
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'

import {_addScrapingJob, _checkArtistRepeat, _editScrapingJob, _resolveArtistConflict} from "../../redux/actions"

const LoadingModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
    const [open, setOpen] = useState(true)
    const [valErrors, setValErrors] = useState({})

    const _close = () => {
        setOpen(false)
        props.onClose()
    }

    return (
        <Modal
            isOpen={open}
            // toggle={_close}
            unmountOnClose={true}
            backdrop={true}
            contentClassName='p-0'
            className='modal-dialog-centered'
            size="md"
        >
                {/*<ModalHeader toggle={_close} className='mb-1'>*/}
                {/*</ModalHeader>*/}
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <img style={{width:'100%', height:'100%'}} src={require('../../assets/images/loading.gif').default} />
                    <p className={'text-center mb-0'}>Scraping Job is in progress.</p>
                    <p className={'text-center'}>Please do not close your browser!</p>
                </ModalBody>
                {/*<ModalFooter className='justify-content-center'></ModalFooter>*/}
        </Modal>
    )
}

export default LoadingModal

