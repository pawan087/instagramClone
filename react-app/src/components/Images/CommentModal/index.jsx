import { createPortal } from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1000
}

export default function CommentModal({ open, onClose, children }) {
    if (!open) return null

    return createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={onClose} />
            <div className='modalContainer' style={MODAL_STYLES}>
                {children}
                <button onClick={onClose}>Cancel</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}
