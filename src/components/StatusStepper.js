import React from "react"
import "react-step-progress-bar/styles.css"
import {ProgressBar, Step} from "react-step-progress-bar"
import {CheckCircle} from "react-feather"
import {faCheck, faLink} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

const StatusStepper = props => {
  const {
    steps = [
      {
        label: "Pending",
        name: "Pending"
      },
      {
        label: "Approved",
        name: "Approved"
      },
      {
        label: "Pending For Publishing",
        name: "Pending For For Publishing"
      },
      {
        label: "Published",
        name: "Published"
      }
    ], currentStep = 1
  } = props

  return (
    <div className={'px-3'} style={{paddingBottom: 50}}>
      <ProgressBar
        percent={(100 / (_.size(steps) - 1)) * (currentStep - 1)}
        filledBackground="linear-gradient(to right, #4db193, #4db193)"
      >
        {
          _.map(steps, (x, index) => {
            return (
              <Step transition="scale">
                {
                  ({accomplished}) => (
                    <div className={'d-flex justify-content-center align-items-center position-relative'}
                         style={{filter: `grayscale(${accomplished ? 0 : 30}%)`, flexDirection: 'column'}}>
                      {
                        accomplished ? (
                          <div className={'d-flex justify-content-center align-items-center'}
                               style={{backgroundColor: '#4db193', width: 50, height: 50, borderRadius: 25}}>
                            <FontAwesomeIcon icon={faCheck} color={'#fff'} size={'lg'}/>
                          </div>
                        ) : (
                          <div style={{backgroundColor: '#006dbd', width: 50, height: 50, borderRadius: 25}}
                               className={'d-flex justify-content-center align-items-center'}>
                            <span style={{color: 'white'}}>{index + 1}</span>
                          </div>
                        )
                      }
                      <div className={'d-flex position-absolute justify-content-center align-items-center'} style={{bottom: x.subtitle ? -30 : -20, whiteSpace: 'nowrap', flexDirection: 'column'}}>
                        <span>
                          {x.label}
                        </span>
                        {
                          x.subtitle && (
                            <span className={'text-muted'} style={{fontSize:11, marginTop:1}}>
                              {x.subtitle}
                            </span>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </Step>
            )
          })
        }
      </ProgressBar>
    </div>
  )
}

StatusStepper.propTypes = {
  currentStep: PropTypes.number,
  steps: PropTypes.array
}

export default StatusStepper
