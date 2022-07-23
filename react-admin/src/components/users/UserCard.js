const UserCard = ({ user }) => {
    return (
        <div className="user-card" id={user.id}>

            <img src={user.picture_base64?
                'data:image/jpeg;base64,'+user.picture_base64:
                require('../../assets/default_picture.jpg')
            }
            className='user-card-picture'
            />
            <span className='user-card-name'>{user.name}</span>
        </div>
    );
}
 
export default UserCard;