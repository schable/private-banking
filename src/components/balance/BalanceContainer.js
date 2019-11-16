import { connect } from 'react-redux'
import { Balance } from './Balance'

const mapStateToProps = state => state

export const BalanceContainer = connect(mapStateToProps)(Balance)