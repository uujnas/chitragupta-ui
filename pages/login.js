import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  FormContainer,
  Input,
  Label,
  FormControl,
  Btn,
} from '../components/formComponents'
import { login, loadUser } from '../redux/actions/authActions'

function Login(props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const getRedirect = () =>
    router.query && router.query.returnUrl ? router.query.returnUrl : '/'

  const token_verified = () => {
    if (props.isAuthenticated) {
      props.loadUser()
      router.push(getRedirect())
    }
  }

  const handleScoreResponse = async (score) => {
    if (score > 0.7) {
      const user = {
        email,
        password,
      }
      props.login(user)
    } else {
      setError('Are you a robot?')
    }
  }

  useEffect(() => token_verified(), [props.isAuthenticated])

  useEffect(() => {
    const recaptcha_script = document.createElement('script')
    recaptcha_script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`
    recaptcha_script.id = 'recaptcha'
    document.head.append(recaptcha_script)

    // clean up
    return () => {
      recaptcha_script.remove()
    }
  }, [])

  // const handleSubmit = (e) => {
  //   const user = {
  //     email,
  //     password,
  //   }
  //   props.login(user)
  //   e.preventDefault()
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // TODO: move the captcha logic to utils or libs
    // the logic should be modular and needs implementation in other pages like password confirmations...
    // first we will check captcha score
    grecaptcha.ready(function async() {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, { action: 'submit' })
        .then(function (token) {
          console.log(token)
          // We must make request to backend from here
          // if we try to force our way google simply won't let us
          return axios.get(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/user_scores`,
            { params: { token: token } },
          )
        })
        .then((response) => {
          handleScoreResponse(response.data.score)
        })
        .catch((error) => {
          debugger
          setError(
            error.response.data.message ||
              error.response.data.error ||
              error.message,
          )
        })
    })
  }
  return (
    <section className="my-8 pt-14">
      <FormContainer>
        <div>
          {error.length >= 1 ? (
            <div className="text-red-500 text">{error}</div>
          ) : (
            ''
          )}
        </div>
        <FormControl>
          <Label>E-mail</Label>
          <Input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Btn type="button" onClick={handleSubmit} className="bg-blue-500">
              <span className="inline-block mr-2 uppercase">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Btn>
            <div>
              <a href="#" className="inline-block underline">
                Forgot Password
              </a>
            </div>
          </div>
        </FormControl>
      </FormContainer>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { login, loadUser })(Login)
