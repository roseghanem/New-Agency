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

import {
    _addScrapingJob,
    _checkArtistRepeat,
    _editScrapingJob,
    _logMoveToCrmAction,
    _resolveArtistConflict
} from "../../redux/actions"
import LoadingModal from "../loading-modal"

const BasicInfoModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
    const selectedItems = props.data
    const [open, setOpen] = useState(true)
    const [valErrors, setValErrors] = useState({})
    const [movingStarted, setMovingStarted] = useState(false)
    const [notMoved, setNotMoved] = useState(0)
    const [finishMoving, setFinishMoving] = useState(false)
    const [currentMovingItem, setCurrentMovingItem] = useState({})
    const [conflictedArtist, setConflictedArtist] = useState({})

    const _close = () => {
        setOpen(false)
        props.onClose()
    }

    const startMoving = () => {
        _logMoveToCrmAction(selectedItems.selectedRows[0].scraping_job_id)
        setMovingStarted(true)
        setCurrentMovingItem(selectedItems.selectedRows[0])
    }

    const setNextItem = () => {
        const currentIndex = _.indexOf(selectedItems.selectedRows, currentMovingItem)
        if (_.get(selectedItems.selectedRows, `${currentIndex + 1}`)) {
            setConflictedArtist({})
            setCurrentMovingItem(selectedItems.selectedRows[currentIndex + 1])
        } else {
            setFinishMoving(true)
        }
    }

    useEffect(() => {
        if (!_.isEmpty(currentMovingItem)) {
            if (currentMovingItem.email) {
                _checkArtistRepeat(
                    currentMovingItem.id,
                    (data) => {
                        if (data.check_duplicate) {
                            setConflictedArtist(data.artist)
                        } else {
                            setNextItem()
                        }
                    }
                )
            } else {
                setNextItem()
            }
        }
    }, [currentMovingItem])


    const onSubmit = (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        if (data === 0) {
            setNotMoved(prev => prev + 1)
        }
        setValErrors({})
        _resolveArtistConflict(
            currentMovingItem.id,
            data,
            () => {

            },
            () => {
                setNextItem()
            }
        )
    }
// console.log(movingStarted, finishMoving)
    return (
        <>
        <Modal
            isOpen={open}
            // toggle={_close}
            unmountOnClose={true}
            backdrop={true}
            contentClassName='p-0'
            className='mb-lg-0'
            size="lg"
        >
            <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={_close} className='mb-1'>
                    Move To CRM
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <h4>Number of selected {selectedItems.selectedCount}</h4>
                    {!_.isEmpty(conflictedArtist) && <Table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Old</th>
                            <th>New</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{conflictedArtist.artist_fullname}</td>
                            <td>{currentMovingItem.artist_fullname}</td>
                        </tr>
                        <tr>
                            <td>Number of followers</td>
                            <td>{conflictedArtist.artist_number_of_followers}</td>
                            <td>{currentMovingItem.artist_number_of_followers}</td>
                        </tr>
                        <tr>
                            <td>Monthly listeners</td>
                            <td>{conflictedArtist.artist_monthly_listeners}</td>
                            <td>{currentMovingItem.artist_monthly_listeners}</td>
                        </tr>
                        </tbody>
                    </Table>}
                    <div className={'mt-1'}>
                        <span>Number of migrated {finishMoving ? _.size(_.filter(selectedItems.selectedRows, x => x.email)) - notMoved : 0} / {_.size(_.filter(selectedItems.selectedRows, x => x.email))} (This number belongs to the selected artists having email)</span>
                    </div>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    {!finishMoving ? <>
                        {!movingStarted ? <>
                            <Button.Ripple type='button' className='flex-grow-1' color='primary' onClick={startMoving}>
                                {loading ? <ButtonSpinner/> : null}
                                <span>Run Migration</span>
                            </Button.Ripple>
                        </> : <>
                            <Button.Ripple type='button' className='flex-grow-1' color='primary' disabled={loading || _.isEmpty(conflictedArtist)} onClick={() => onSubmit(1)}>
                                {loading ? <ButtonSpinner/> : null}
                                <span>Skip</span>
                            </Button.Ripple>
                            <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading || _.isEmpty(conflictedArtist)} onClick={() => onSubmit(0)}>
                                {loading ? <ButtonSpinner/> : null}
                                <span>Update</span>
                            </Button.Ripple>
                        </>}
                    </> : <>
                        <Button.Ripple type='button' className='flex-grow-1' color='secondary' onClick={_close}>
                            {loading ? <ButtonSpinner/> : null}
                            <span>Close</span>
                        </Button.Ripple>
                    </>}
                </ModalFooter>
            </Form>
        </Modal>
    </>
    )
}

export default BasicInfoModal

