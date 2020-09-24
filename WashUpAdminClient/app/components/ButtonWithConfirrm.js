import React, { Component } from 'react'

class ButtonWithConfirrm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowWarning: false
        }
        this.showWarning = this.showWarning.bind(this)
        this.ok = this.ok.bind(this)
        this.no = this.no.bind(this)
    }

    showWarning() {
        this.setState({ isShowWarning: true })
    }

    ok() {
        this.setState({ isShowWarning: false })
        this.props.ok && this.props.ok();
    }

    no() {
        this.setState({ isShowWarning: false })
        return false;

        // this.props.no && this.props.no()
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}  >
                <div style={{ display: 'inline-block' }} onClick={this.showWarning}>
                    {this.props.children}
                </div>
                {this.state.isShowWarning && <div>
                    <div className={`swal2-container fade" in`} style={{ overflowY: 'auto' }}>
                        <div className="swal2-modal show-swal2" style={{ display: 'block' }}>
                            <h2>Bạn có chắc?</h2>
                            <hr className="swal2-spacer" style={{ display: 'block' }} />
                            <button type="button" onClick={this.ok} className="swal2-confirm styled" style={{ backgroundColor: 'rgb(48, 133, 214)', borderLeftColor: 'rgb(48, 133, 214)', borderRightColor: 'rgb(48, 133, 214)' }}>Tôi chắc</button>
                            <button type="button" onClick={this.no} className="swal2-cancel styled" style={{ backgroundColor: 'rgb(170, 170, 170)' }}>Không !!!</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default ButtonWithConfirrm
