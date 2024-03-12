import './Account.css';
import AppCard from '../../components/AppCard/AppCard';
import BlogCard from '../../components/BlogCard/BlogCard';

export default function Account(props) {

    const { user } = props; 

    const userData = JSON.parse(user);
    
    return (
        <>
        <section className="acct-section-container">
            <div className='acct-heading-container'>
                <h1 className=''>YOUR ACCOUNT</h1>
            </div>
            <div className='acct-section-wrapper'>
                <section className='info-section-container'>
                    <div className='acct-info-profile-container'>
                        <div className='acct-avatar-container'>
                            <div className='acct-avatar font-semibold'>
                            {userData.userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className='acct-profile-text-container'>
                            <p className='acct-username'>{userData.userName}</p>
                            <p className='acct-email'>{userData.email}</p>
                            <a className='acct-logout' href="">Logout</a>
                        </div>
                    </div>
                    <div className='address-book-container'>
                        <h3 className='font-semibold mb-2'>ADDRESS BOOK</h3>
                            <p>View address book(0)</p>
                    </div>
                    <div className='acct-return-container'>
                        <h3 className='font-semibold mb-2'>RETRUNS</h3>
                        <button className='font-semibold'>RETURN AN ITEM</button>
                    </div>
                    <h2 className='apps-blogs-header'>OUR APPS AND BLOGS</h2>
                    <AppCard />
                    <BlogCard />
                    

                </section>
                <section className='order-section-container'>
                    <div className='order-header-container'>
                        <h3>YOUR ORDERS</h3>
                    </div>
                    <div className='order-feed-container'>

                    </div>
                </section>
            </div>
        </section>
        </>
    )
}