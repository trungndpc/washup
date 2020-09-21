import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import PriceUtils from '../../../utils/PriceUtils'


class UpdateStatusModal extends React.Component {
    constructor(props) {
        super(props)
        this.ok = this.ok.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
    }

    ok() {
        let value = this.noteRef.value;
        this.props.ok && this.props.ok(value);
    }

    cancel() {
        this.props.cancel && this.props.cancel();
    }

    render() {
        return (
            <div>
                <div className="modal" id="myModalthree" role="dialog" style={{ display: 'block', paddingRight: '17px' }}>
                    <div className="modal-dialog modal-large">
                        <div className="modal-content" style={{padding: '20px 20px'}}>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-element-list mg-t-30">
                                        <div className="basic-tb-hd">
                                            <h2>Ghi chú</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                    <div className="nk-int-st">
                                                        <textarea ref={e => this.noteRef = e} className="form-control" rows={2} placeholder="Let us type some lorem ipsum...." defaultValue={""} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.ok} type="button" className="btn btn-default waves-effect" data-dismiss="modal">Đồng ý</button>
                                <button onClick={this.cancel} type="button" className="btn btn-default waves-effect" data-dismiss="modal">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade in"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateStatusModal)
