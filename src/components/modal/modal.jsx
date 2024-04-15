import './modal.css';
import CloseBtn from 'src/assets/cross-close_ico.svg';

function Modal(props) {
    const { modalOpen, /*  modalContent, */ onClose } = props;

    if (modalOpen !== true) {
        return null;
    }
    return (
        <div className="modal_wrapper">
            <div className="modal">
                <p>Employee Created</p>
                <button className="modal_closeBtn" onClick={onClose}>
                    <img src={CloseBtn} alt="" />
                </button>
            </div>
        </div>
    );
}
export default Modal;
