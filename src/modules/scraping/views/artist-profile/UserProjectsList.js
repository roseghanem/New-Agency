// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Custom Components

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UserProjectsList = ({user}) => {
  return (
      <div className='react-dataTable user-view-account-projects'>
          {user.artist_url && <iframe style={{borderRadius: 12}}
                  src={`https://open.spotify.com/embed/artist/${user.artist_url.split('/')[user.artist_url.split('/').length - 1]}?utm_source=generator`} width="100%"
                  height="380" frameBorder="0" allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>}
      </div>
  )
}

export default UserProjectsList
