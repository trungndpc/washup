import React, { Component } from 'react'
import LoginModal from './LoginModal'
import BookingListModal from './BookingListModal'
import PhoneSearchModal from './PhoneSearchModal'


class BookingManagerModal extends Component {

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    render() {
        return (
           <div>
               {/* <BookingListModal /> */}
               <PhoneSearchModal />
                <div class="modal-backdrop fade in"></div>
           </div>
        )
    }
}

export default BookingManagerModal
