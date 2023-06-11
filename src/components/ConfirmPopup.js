import PopupWithForm from './PopupWithForm.js'

function ConfirmPopup(props) {
  const {isOpen, onClose, onSubmit, isDeletingCard} = props

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={isDeletingCard ? 'Загрузка...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
);
}

export default ConfirmPopup;