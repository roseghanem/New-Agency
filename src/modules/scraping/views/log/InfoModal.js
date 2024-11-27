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


const InfoModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
    const row = props.data
    const [open, setOpen] = useState(true)

    const _close = () => {
        setOpen(false)
        props.onClose()
    }
    if (row?.to && JSON.parse(row?.to?.replaceAll('&quot;', '"')) && Object.keys(JSON.parse(row?.to?.replaceAll('&quot;', '"'))).length > 0) {
        const jsonFrom = row?.from ? JSON.parse(row?.from?.replaceAll('&quot;', '"')) : null
        const jsonTo = JSON.parse(row?.to?.replaceAll('&quot;', '"'))
        const keys = Object.keys(jsonTo)
        console.log(jsonFrom, jsonTo)
        return (
            <Modal
                isOpen={open}
                // toggle={_close}
                unmountOnClose={true}
                backdrop={true}
                contentClassName='p-0'
                className='mb-lg-0'
                size="lg"
            >
                <ModalHeader toggle={_close} className='mb-1'>
                    Log Info
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Key</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        </thead>
                        <tbody>
                        {keys.map((key, index) => {
                            if (_.isObject(_.get(jsonFrom, `${key}`, 'No Value')) || _.isObject(_.get(jsonTo, `${key}`, 'No Value'))) {
                                return null
                            } else {
                                return (
                                    <tr className={'text-nowrap'} key={index}>
                                        <td>{key} : </td> <td>{_.get(jsonFrom, `${key}`, 'No Value')}</td> <td>{_.get(jsonTo, `${key}`)}</td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        )
    } else {
        return null
    }
}

export default InfoModal

