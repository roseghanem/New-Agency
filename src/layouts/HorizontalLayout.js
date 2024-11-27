// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'
import CustomNavbar from "./horizontal/components/navbar"

const HorizontalLayout = props => <Layout navbar={<CustomNavbar />} {...props}>{props.children}</Layout>

export default HorizontalLayout
