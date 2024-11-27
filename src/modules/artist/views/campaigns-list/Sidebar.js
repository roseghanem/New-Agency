// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'
import React, {Fragment, useEffect, useState} from 'react'
// ** Third Party Components
import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'
import { Card, CardBody, Row, Col, CustomInput, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import {_getAllGenresWithQ, _getAllGenresWithQForFilter, _getAllTiersWithQForFilter} from "../../redux/actions"

const Sidebar = props => {
    // ** Props
    const { sidebarOpen, refreshCampaigns  } = props
    const {selectedTier, setSelectedTier, selectedStatus, setSelectedStatus, selectedGenres, setSelectedGenres, selectedReleased, setSelectedReleased} = props.states
    const [allGenre, setallGenre] = useState([])
    useEffect(() => {
        _getAllGenresWithQForFilter('', (data) => {
            setallGenre(data)
        })
    }, [])
    return (
        <div className='sidebar-detached sidebar-left'>
            <div className='sidebar'>
                <div
                    className={classnames('sidebar-shop', {
                        show: sidebarOpen
                    })}
                >
                    <Card>
                        <CardBody>
                            <div className='multi-range-price'>
                                <h6 className='filter-title mt-0'>Filter by genre</h6>
                                <ul className='list-unstyled brand-list'>
                                    {allGenre.map(brand => {
                                        return (
                                            <li key={brand.name}>
                                                <CustomInput
                                                    type='checkbox'
                                                    id={`genre_${brand.id}`}
                                                    label={brand.name}
                                                    checked={selectedGenres.indexOf(brand.id) > -1}
                                                    onChange={e => setSelectedGenres(prev => {
                                                        let ids = [...prev]
                                                        if (e.target.checked) {
                                                            ids = [
                                                                ...ids,
                                                                brand.id
                                                            ]
                                                        } else {
                                                            ids = _.filter(ids, x => x !== brand.id)
                                                        }
                                                        // refreshCampaigns({tier_id: selectedTier, genres: ids, status: selectedStatus })
                                                        refreshCampaigns({genres: ids, status: selectedStatus, released: selectedReleased  })
                                                        return ids
                                                    })}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='multi-range-price'>
                                <h6 className='filter-title mt-0'>Filter by status</h6>
                                <ul className='list-unstyled brand-list'>
                                            <li key='All'>
                                                <CustomInput
                                                    type='radio'
                                                    id='ALL'
                                                    label='All' defaultChecked
                                                    name='status'
                                                    value={'all'}
                                                    onChange={e => {
                                                        setSelectedStatus('all')
                                                        // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'all' })
                                                        refreshCampaigns({genres: selectedGenres, status: 'all', released: selectedReleased })
                                                    }}

                                                />
                                            </li>
                                    <li key='Not Applied'>
                                        <CustomInput
                                            type='radio'
                                            id='NotApplied'
                                            label='Not Applied'
                                            name='status'
                                            value={'notapplied'}
                                            onChange={e => {
                                                setSelectedStatus('notapplied')
                                                // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'notapplied' })
                                                refreshCampaigns({ genres: selectedGenres, status: 'notapplied', released: selectedReleased })
                                            }}
                                        />
                                    </li>
                                    <li key='Applied'>
                                        <CustomInput
                                            type='radio'
                                            id='Applied'
                                            label='Applied'
                                            name='status'
                                            value={'applied'}
                                            onChange={e => {
                                                setSelectedStatus('applied')
                                                // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'applied' })
                                                refreshCampaigns({genres: selectedGenres, status: 'applied', released: selectedReleased })
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className='multi-range-price'>
                                <h6 className='filter-title mt-0'>Filter by Released</h6>
                                <ul className='list-unstyled brand-list'>
                                    <li key='All'>
                                        <CustomInput
                                            type='radio'
                                            id='ALLReleased'
                                            label='All' defaultChecked
                                            name='released'
                                            value={'all'}
                                            onChange={e => {
                                                setSelectedReleased('all')
                                                // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'all' })
                                                refreshCampaigns({genres: selectedGenres, status: selectedStatus, released: 'all'  })
                                            }}

                                        />
                                    </li>
                                    <li key='Not Released'>
                                        <CustomInput
                                            type='radio'
                                            id='NotReleased'
                                            label='Not Released'
                                            name='released'
                                            value={'notreleased'}
                                            onChange={e => {
                                                setSelectedReleased('notreleased')
                                                // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'notapplied' })
                                                refreshCampaigns({ genres: selectedGenres, status: selectedStatus, released:'notreleased' })
                                            }}
                                        />
                                    </li>
                                    <li key='Released'>
                                        <CustomInput
                                            type='radio'
                                            id='Released'
                                            label='Released'
                                            name='released'
                                            value={'released'}
                                            onChange={e => {
                                                setSelectedReleased('released')
                                                // refreshCampaigns({tier_id: selectedTier, genres: selectedGenres, status: 'applied' })
                                                refreshCampaigns({genres: selectedGenres, status: selectedStatus, released: 'released' })
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
