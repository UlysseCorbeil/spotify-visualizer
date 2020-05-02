import axios from 'axios';
import Helpers from '../util/Helpers';

// expires after 1h cuz I believe everything I see on the internet
const TOKEN_EXPIRATION_TIME = 3600 * 1000;

class AccessToken {

    // Setters

    static setTokenTimestamp () {
        window.localStorage.setItem('spotify_token_timestamp', Date.now());
    } 

    static setLocalAccessToken (token) {
        this.setTokenTimestamp();
        window.localStorage.setItem('spotify_access_token', token);
    };

    static setLocalRefreshToken (token) {
        window.localStorage.setItem('spotify_refresh_token', token)
    }

    // Getters 

    static getLocalAccessToken () {
        window.localStorage.getItem('spotify_access_token');
    }

    static getLocalRefreshToken () {
        window.localStorage.getItem('spotify_refresh_token');
    }

    static getTokenTimestamp () {
        window.localStorage.getItem('spotify_token_timestamp');
    }

    static async refreshAccessToken () {
        try {

            const { data } = await axios.get('refresh_token?refresh_token=' + this.getLocalRefreshToken());
            const { access_token } = data;
            this.setLocalAccessToken(access_token);
            window.location.reload();

            return;

        } catch (err) {
            console.log(err);
        }
    }

    static getAccessToken () {
        const { err, access_token, refresh_token } = Helpers.getHashFromUrl();

        if (err) {
            console.error(err);
            this.refreshAccessToken();
        }

        if (Date.now() - this.getTokenTimestamp() > TOKEN_EXPIRATION_TIME) {
            console.warn('Access token has expired, refreshing...');
            this.refreshAccessToken();
        }

        const localAccessToken = this.getLocalAccessToken();
        const localRefreshToken = this.getLocalRefreshToken();

        if (!localRefreshToken || localRefreshToken === 'undefined') {
            this.setLocalRefreshToken(refresh_token);
        }

        if (!localAccessToken || localAccessToken === 'undefined') {
            this.setLocalAccessToken(access_token);
            return access_token;
        }

        return localAccessToken;
    }

    static logout () {
        window.localStorage.removeItem('spotify_token_timestamp');
        window.localStorage.removeItem('spotify_access_token');
        window.localStorage.removeItem('spotify_refresh_token');
        window.location.reload();
    }

}

module.exports = AccessToken;