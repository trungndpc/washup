import React, { Component } from 'react'

class ButtonWithNoteModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
        this.show = this.show.bind(this)
        this.ok = this.ok.bind(this)
        this.no = this.no.bind(this)
    }

    show() {
        this.setState({ isShow: true })
    }

    ok() {
        let note = this.noteRef.value;
        this.setState({ isShow: false })
        this.props.ok && this.props.ok(note);
    }

    no() {
        this.setState({ isShow: false })
        return false;
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}  >
                <div style={{ display: 'inline-block' }} onClick={this.show}>
                    {this.props.children}
                </div>
                {this.state.isShow && <div>
                    <div className="modal" id="myModalthree" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-large">
                            <div className="modal-content" style={{ padding: '20px 20px' }}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="form-element-list">
                                            <div className="basic-tb-hd">
                                                <h2>{this.props.title}</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <div className="nk-int-st">
                                                            <textarea ref={e => this.noteRef = e} className="form-control" rows={2} placeholder={this.props.placeholder} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.ok} type="button" className="btn btn-default waves-effect" data-dismiss="modal">Đồng ý</button>
                                    <button onClick={this.no} type="button" className="btn btn-default waves-effect" data-dismiss="modal">Hủy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade in"></div>
                </div>
                }
            </div>
        )
    }
}

export default ButtonWithNoteModal
