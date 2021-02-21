import Plaid from 'plaid';
import config from '../config';
import firebase from 'firebase/app';
import 'firebase/functions';

const { clientID, envstring } = config.plaid;
const secret = config.plaid.secret.sandbox;

let envs = {
  'sandbox': Plaid.environments.sandbox,
  'development': Plaid.environments.development,
  'production': Plaid.environments.production,
}

const server = firebase.functions;
server().useEmulator('localhost', 5001);
const linkToken = server().httpsCallable('plaid-createLinkToken');

export const bank = {
  async getLinkToken() {
    const response = await linkToken();
    if (response.status_code !== 200) throw Error('Request Error')
    return(response.link_token);
  },
};