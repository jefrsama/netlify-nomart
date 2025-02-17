    import React, { useEffect, useState } from 'react';

    interface ModalProps {
        isOpen: boolean;
        onClose: () => void;
        children: React.ReactNode;
    }

    const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
        const [isVisible, setIsVisible] = useState(isOpen);

        useEffect(() => {
            if (isOpen) {
                setTimeout(() => setIsVisible(true), 300);
            } else {
                setTimeout(() => setIsVisible(false), 300);
            }
        }, [isOpen]);

        if (!isVisible) return null;

        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    transition: 'background-color 0.5s ease',
                }}
                onClick={onClose}
            >
                <div className="modal-opened"
                    style={{
                        backgroundColor: 'white',
                        padding: '30px 20px',
                        borderRadius: '16px 16px 0 0',
                        width: '100%',
                        boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.3)',
                        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease',
                        height: 'auto',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '20px',
                            color: '#333',
                            cursor: 'pointer',
                        }}
                    >
                        <img src="/x.svg" alt=""/>
                    </button>
                    {children}
                </div>
            </div>
        );
    };

    export default Modal;
