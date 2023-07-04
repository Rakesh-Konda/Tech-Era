import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import CourseItemDetails from './CourseItemDetails'
import NotFound from './NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
