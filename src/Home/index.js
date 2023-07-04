import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {List: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const upData = data.courses.map(each => ({
      id: each.id,
      name: each.name,
      logoUrl: each.logo_url,
    }))
    console.log(upData)
    this.setState({List: upData})
  }

  getFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  get = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.getSuccess(data)
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.getFailure()
    }
  }

  Retry = () => {
    this.get()
  }

  Loader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  FailureView = () => (
    <div className="fa">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>OOPS! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.Retry} className="rb">
        Retry
      </button>
    </div>
  )

  SuccessView = () => {
    const {List} = this.state
    return (
      <div>
        <h1 className="h11">Courses</h1>
        <ul className="ul">
          {List.map(each => (
            <Link to={`/courses/${each.id}`} className="lll" key={each.id}>
              <li key={each.id} className="li">
                <div className="div">
                  <img src={each.logoUrl} alt={each.name} className="im" />
                  <p className="p">{each.name}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  Finale = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.SuccessView()
      case apiStatusConstants.failure:
        return this.FailureView()
      case apiStatusConstants.loading:
        return this.Loader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.Finale()}
      </div>
    )
  }
}
export default Home
