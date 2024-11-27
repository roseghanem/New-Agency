import React, {useEffect, useRef, useState} from 'react'
import {ButtonGroup, Button, Media} from 'reactstrap'
import {Plus, UploadCloud} from "react-feather"
import {useSelector} from "react-redux"

import UploadFile from "@src/components/inputs/UploadFile"
import {ButtonSpinner} from '@src/components'
import {_url, trans, _successSwal} from '@utils'

const UploadExcelFile = ({rules, uploadSuccess}) => {
	const loading = useSelector(state => state.app.loading)
	const [tempFile, setTempFile] = useState(null)
	const inputRef = useRef()
	//************************************//
	const _onUploadSuccess = (v) => {
		// API.post(`user/import/${electionId}/sync`)
		uploadSuccess()
		_successSwal()
	}
	//************************************//
	const _resetTempLogo =  () => {}
	//************************************//
	return (
<>

	<Button color='success' disabled={loading} onClick={ () => { inputRef.current.handleClick() }}>
		{ loading ? <ButtonSpinner/> : null}
		<UploadCloud size={14} />
		<span className='ml-25'>Import</span>
	</Button>
	<UploadFile rules={rules} ref={inputRef} onChoose={setTempFile} onReset={_resetTempLogo} onUploadSuccess={_onUploadSuccess} url={`artist/import/store`}/>
</>


	)
}

UploadExcelFile.propTypes = {

}

export default UploadExcelFile
