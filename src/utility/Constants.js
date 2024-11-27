//************************************//
export const statusesColors = {
    "Not Registered": {id: 1, color: 'danger'},
    Pending: {id: 1, color: "warning", step: 1},
    'Pending for Approval': {id: 2, color: 'warning', step: 1},
    Approved: {id: 3, color: 'success', step: 2},
    Invited: {id: 4, color: 'danger'},
    Declined: {id: 4, color: 'danger', step: 2},
    Deleted: {id: 5, color: 'danger'},
    'Pending for Publishing': {id: 6, color: 'warning', step: 2},
    Published: {id: 7, color: 'success', step: 4},
    'Pending For Approval': {id: 2, color: 'warning', step: 1}
}

export const curatorVsCampaignStatusesColors = {
    "Pending for Approval": {id: 1, color: 'warning'},
    "Waiting for Playlist submission": {id: 2, color: 'warning'},
    "Verifying submission": {id: 3, color: 'warning'},
    "On Going": {id: 4, color: 'warning'},
    Auditing: {id: 5, color: 'warning'},
    Completed: {id: 6, color: 'success'},
    Declined: {id: 7, color: 'danger'},
    "Failed to Submit Playlist": {id: 8, color: 'danger'}
}
