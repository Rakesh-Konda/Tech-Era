import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseItemDetails extends Component {
  state = {List: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const each = data.course_details
    const upData = {
      id: each.id,
      name: each.name,
      ImageUrl: each.image_url,
      description: each.description,
    }

    console.log(upData)
    this.setState({List: upData})
  }

  getFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  get = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
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

  SuccessView = () => {
    const {List} = this.state
    return (
      <div className="divim">
        <img src={List.ImageUrl} alt={List.name} className="iii" />
        <div>
          <h1 className="k">{List.name}</h1>
          <p className="l">{List.description}</p>
        </div>
      </div>
    )
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

  render() {
    return (
      <div>
        <Header />
        {this.Finale()}
      </div>
    )
  }
}
export default CourseItemDetails
