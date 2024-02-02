import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Buttton from './Button'

const Header = ({ title, onAddButton, showAddButton }) => {
  // const onClick = ()=>{
   //    console.log("click");
  // }

  const location = useLocation()

  return (
    <header className='header'>
      <h1>Task Tracker</h1>
      {/* <h1 style={headingStyle}>{title}</h1> */}
      {location.pathname === '/' && <Buttton 
        color={showAddButton ? 'red' : 'green'} 
        text={showAddButton ? 'Close' : 'Add'} 
        onClick={onAddButton} 
      />}
    </header>
  )
}

Header.defaultProps = {
   title: 'Task Tracker',
}

Header.propTypes = {
   title: PropTypes.string.isRequired,
}

// // CSS in JS
// const headingStyle = {
//    color: "blue", 
//    backgroundColor: 'black',
// }

export default Header
