import React, { Component } from 'react'
import { Link } from "react-router-dom";


class AdsPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShow: true
        }
        this.onClose = this.onClose.bind(this);
        this.onClickInstallApp = this.onClickInstallApp.bind(this);
        this.getMobileOperatingSystem = this.getMobileOperatingSystem.bind(this);
    }

    shouldComponentUpdate(nextProp, nextState) {
        return nextState != this.state
    }

    onClose() {
        this.setState({
            isShow: false
        })
    }

    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "unknown";
    }


    onClickInstallApp() {
        let os = this.getMobileOperatingSystem();
        if (os == 'iOS') {
            window.location.href = 'https://apps.apple.com/vn/app/washup-r%E1%BB%ADa-xe-c%C3%B4ng-ngh%E1%BB%87/id1547909479';
        } else {
            window.location.href = 'https://play.google.com/store/apps/details?id=vn.washup.consumer';
        }
    }


    render() {
        return (
            <div style={{ paddingTop: 'calc((100vh - 500px ) / 2)', display: this.state.isShow ? 'block' : 'none'}} className="adpopup-container">
                <div>
                    <div className="content">
                        <button onClick={this.onClose} className="btn-close-ads">X</button>
                        <img className="bgss" src={require('../resources/images/popup/popupall.png')} />
                        <div className="btnads-container">
                            <button onClick={this.onClickInstallApp} className="btnads">TẢI APP NGAY</button>
                        </div>
                        <div className="btn-platform-container">
                            <div onClick={() => {window.location.href = 'https://play.google.com/store/apps/details?id=vn.washup.consumer'}} className="btn-platform-android">
                                <img src={require('../resources/images/popup/btnandroid.png')}/>
                            </div>
                            <div onClick={() => {window.location.href = 'https://apps.apple.com/vn/app/washup-r%E1%BB%ADa-xe-c%C3%B4ng-ngh%E1%BB%87/id1547909479'}} className="btn-platform-ios">
                                <img src={require('../resources/images/popup/btnios.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdsPopup
