import React, { Component } from 'react'
import { Link } from "react-router-dom";


class InstallApp extends Component {

    constructor(props) {
        super(props)
        this.onClickInstallApp = this.onClickInstallApp.bind(this);
        this.getMobileOperatingSystem = this.getMobileOperatingSystem.bind(this);
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
            <div id="site-product">
                <div className="container"><div className="row">
                    <div className="col-md-7">
                        <h3 style={{ color: '#1b3868', fontSize: '58px' }}>Rửa xe công nghệ</h3>
                        <div style={{ width: '25%', height: '2px', backgroundColor: '#fff' }}></div>
                        <h4 style={{ color: '#fff', fontSize: '29px', textTransform: 'uppercase' }}>Mang công nghệ đến tận nhà</h4>
                        <p style={{ color: '#fff' }}>
                            Không còn phải vất vả chạy ra tiệm và chờ đợi như trước. Giờ đây bạn chỉ cần đặt lịch qua app hoặc web, xe sạch để Wash-Up lo.
                        </p>
                        <p style={{ color: '#fff' }}>
                            Một chuẩn mực mới về việc “Rửa sạch” một chiếc xe: <span style={{color: '#1b3868', fontWeight: '600'}}>“Sạch phục hồi - Không tẩy rửa”</span>. Tại Wash-Up, chúng tôi sử dụng công nghệ hơi nước nóng 40 độ C kết hợp với <span style={{color: '#1b3868', fontSize: '25px', fontWeight: 'bold'}}>6</span> loại dung dịch phục hồi và làm sạch chuyên dùng cho xe mang đến sự khác biệt rõ rệt cho xe sau khi rửa.
                        </p>
                        <p style={{ color: '#fff' }}>
                            Cảm ơn bạn vì đã chọn lối sống xanh: Bằng lợi thế công nghệ hơi nước nóng chỉ tốn 03 lít nước/xe máy và 05 lít nước/ô tô tiết kiệm lượng nước gấp 30 lần so với rửa xe truyền thống. Với chúng tôi, thách thức rửa sạch xe là chuyện nhỏ, bảo vệ môi trường mới là chuyện lớn!
                        </p>
                        <div className="install-container">
                            <button onClick={this.onClickInstallApp} className="btn-install-app">TẢI ÁP NGAY
                            <img src={require('../resources/images/mt.png')}></img>
                            </button>
                        </div>
                    </div>
                    <div style={{ paddingTop: '20px' }} className="col-md-5">
                        <img style={{ height: '420px', width: 'auto' }} src={require('../resources/images/icon-washup.png')} />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default InstallApp
