import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToBalance, subtractToBalance } from '../../actions'
import { Transaction } from './Transaction'

const mapDispatchToProps = (dispatch) => {
    return {
        addToBalance: amount => dispatch(addToBalance(amount)),
        subtractToBalance: amount => dispatch(subtractToBalance(amount))
    }
}

export const TransactionContainer = connect(null, mapDispatchToProps)(Transaction)


TransactionContainer.propTypes = {
    addToBalance: PropTypes.any,
    subtractToBalance: PropTypes.any
}