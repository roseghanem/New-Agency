import React, {Fragment, Component, memo} from 'react'
import {connect} from 'react-redux'
import {
    FileText,
    MoreVertical,
    Send,
    Plus,
    Play,
    User,
    Trash,
    Link2,
    Facebook,
    Instagram,
    Twitter,
    Eye
} from 'react-feather'
import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge, FormGroup, Table
} from 'reactstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink} from "@fortawesome/free-solid-svg-icons"
import {Link, withRouter} from "react-router-dom"
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility} from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import {_getAllAdminsWithQ} from '@authModule'
//************************************//
import InfoModal from "./InfoModal"
import {_getAllLogTypesWithQ} from "../../redux/actions"
//************************************//
const tableColumns = (state, _openBasicInfoModal, hasAction) => [
    {
        name: 'ID',
        selector: 'id',
        sortable: false,
        minWidth: '225px',
        omit: true,
        filter: {
            enabled: false
        }
    },
    {
        name: 'User',
        selector: 'user_id',
        sortable: true,
        filter: {
            enabled: true,
            type: 'asyncSelect',
            loadOptions: _getAllAdminsWithQ
        },
        cell: (row, index, column, id) => {
            return `${row?.user?.name}`
        }
    },
    // {
    //     name: 'Module',
    //     selector: 'module',
    //     sortable: true,
    //     minWidth: '250px',
    //     filter: {
    //         enabled: true,
    //         type: 'select',
    //         options: [{label: 'Auth', value:'auth'}, {label: 'Scraping', value:'scraping'}]
    //     }
    // },
    {
        name: 'Action',
        selector: 'log_type_id',
        sortable: true,
        filter: {
            enabled: true,
            type: 'asyncSelect',
            loadOptions: _getAllLogTypesWithQ,
            // type: 'select',
            options: [
                {
                    label: 'Scraping Jobs',
                    options: [
                        {label: 'Create New Scraping Job', value:'Create New Scraping Job'},
                        {label: 'Scraping Email Initiated', value:'Scraping Email Initiated'},
                        {label: 'Moved to CRM', value:'Moved to CRM'},
                        {label: 'Export All Scraping Jobs List', value:'Export All Scraping Jobs List'},
                        {label: 'Export Scraping List', value:'Export Scraping List'},
                        {label: 'Edit Scraping Job', value:'Edit Scraping Job'},
                        {label: 'Delete Scraping Job', value:'Delete Scraping Job'},
                        {label: 'Edit Email for Artist (Scraping Job)', value:'Edit Email for Artist (Scraping Job)'}
                    ]
                },
                {
                    label: 'ARTIST CRM',
                    options: [
                        {label: 'Add Manual Artist', value:'Add Manual Artist'},
                        {label: 'Export All Artists CSV', value:'Export All Artists CSV'},
                        {label: 'Import Artist CSV', value:'Import Artist CSV'},
                        {label: 'Delete Artist from CRM', value:'Delete Artist from CRM'},
                        {label: 'Edit Artist CRM', value:'Edit Artist CRM'}
                    ]
                },
                {
                    label: 'Admin List',
                    options: [
                        {label: 'Add new Admin', value:'Add new Admin'},
                        {label: 'Edit Admin', value:'Edit Admin'},
                        {label: 'Delete Admin', value:'Delete Admin'},
                        {label: 'Login Admin', value:'Login Admin'},
                        {label: 'Logout Admin', value:'Logout Admin'}
                    ]
                },
                {
                    label: 'Roles & Permissions',
                    options: [{label: 'Add new Role', value:'Add new Role'}, {label: 'Edit Role', value:'Edit Role'}]
                }
            ]
        },
        cell: (row) => {
            return row.log_type?.name
        }
    },
    {
        name: 'at',
        selector: 'created_at',
        sortable: true,
        cell: (row, index, column, id) => {
            return `${new Date(row.created_at).toDateString()} - ${new Date(row.created_at).toLocaleTimeString()}`
        }
    },
    {
        name: 'Details',
        selector: 'from',
        sortable: true,
        // minWidth: '500px',
        cell: (row, index, column, id) => {
            if (row.to) {
                return <Eye  onClick={e => _openBasicInfoModal(row)} />
            }
            return null
        }
    }
]
const tableActions = ['SCRAPING_VIEW_ARTIST_PROFILE']

//************************************//
class UserList extends Component {
    static contextType = AbilityContext

    constructor(props) {
        super(props)
        this.state = {
            userId: props.userId,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}
        }
    }

    //************************************//
    _closeBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}})
    }
    //************************************//
    _openBasicInfoModal = (data) => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data}})
    }
    //************************************//
    render() {
        const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Audit Logs'} breadCrumbParent='' breadCrumbActive=''>
                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={`logs`}
                                   columns={tableColumns(this.state, this._openBasicInfoModal, hasAction)}
                                   hasIndexing={false} hasFilter={true}
                                   defaultCollapse={true}
                        />
                    </Col>
                </Row>
                {basicInfoModalShow && <InfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this._closeBasicInfoModal}/>}
            </Fragment>
        )
    }
}

//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading,
    userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`)
})
export default connect(mapStateToProps, null, null, {forwardRef: true})(withRouter(UserList))
