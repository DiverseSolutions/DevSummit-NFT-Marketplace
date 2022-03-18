import checkMetamask from './utils/checkMetamask.js'
import connectAccounts from './utils/connectAccounts.js'

import getSelectedAccount from './utils/getSelectedAccount.js'
import checkSelectedAccount from './utils/checkSelectedAccount.js'

const metamask = {
  utils: {
    checkMetamask : checkMetamask,
    connectAccounts : connectAccounts,

    getSelectedAccount : getSelectedAccount,
    checkSelectedAccount , checkSelectedAccount,
  }
}

export default metamask;
