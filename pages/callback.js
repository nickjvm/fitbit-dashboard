import { Component } from 'react'
import Router from 'next/router'
import qs from 'query-string'

import request from '../utils/api/request'
export default class Callback extends Component {
  async componentDidMount () {
    const params = qs.parse(window.location.search)
    const authorizaton = await request('/authorize', {
      params,
      requireAuth: false,
    })

    global.window.localStorage.setItem('access_token', authorizaton.access_token)
    Router.push('/')
  }

  render () {
    return null
  }
}
