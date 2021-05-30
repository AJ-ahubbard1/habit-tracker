/*example of CSS in JS 
  const headerStyle = {
  color: 'red',
  backgroundColor: 'black'
}
<h1 style = {headerStyle}>
 */
import Button from './Button'



const Header = ({ title, showAddForm, showAdd}) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      {showAdd ?
        (<Button color='red' text='Cancel' onClick={showAddForm}/>)
        :(<Button color='green' text='Add' onClick={showAddForm}/>)
      }
    </header>
  )
}

Header.defaultProps = {
  title: 
    'Habit Tracker',
}

export default Header
