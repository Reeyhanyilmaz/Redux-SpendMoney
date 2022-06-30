import { useSelector } from 'react-redux'

function User() {
    const selectedUser = useSelector((state) => state.products.selectedUser);

  return (
    <div className="header-div">
        <img
          src={selectedUser.src}
          className="header-img"
          alt={selectedUser.name}
        />
        Spend {selectedUser.name}' Money
      </div>
  )
}

export default User;