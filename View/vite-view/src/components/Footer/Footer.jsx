import './Footer.css';
import Visa from '../../assets/logos/visa-icon.png';
import MasterCard from '../../assets/logos/mastercard-icon.png';
import Paypal from '../../assets/logos/paypal-icon.png';
import ApplePay from '../../assets/logos/apple-pay.png';
import Klarna from '../../assets/logos/klarna/Klarna.png';
import AmericanExpress from '../../assets/logos/american-express.png';
import AfterPay from '../../assets/logos/afterpay/afterpay.jpeg';
import facebookIcon from '../../assets/logos/facebook.png';
import pinterestIcon from '../../assets/logos/pinterest.png';
import youtubeIcon from '../../assets/logos/youtube.png';
import instagramIcon from '../../assets/logos/instagram.png';
import twitterIcon from '../../assets/logos/twitter.png';
import tiktokIcon from '../../assets/logos/tik-tok.png';
import blogImg from '../../assets/iStock-blog.jpg';
import trainingAppImg from '../../assets/hero4.jpg';
import emailImg from '../../assets/email.jpg';

export default function Footer() {

    const handleCollapseClick = (e) => {
        const lastContent = document.getElementById('last-content');
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        const line1 = e.target.children[0].firstChild

        if (content.style.maxHeight){
            if (e.target.id === 'last-coll') {
                e.target.classList.add('last-coll');

            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = null;
        
        } else {
            if (e.target.id === 'last-coll') {
                e.target.classList.remove('last-coll');

            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    return (
        <>
        <footer className="root-footer">
            <section className='footer-top-section'>

                <div className='footer-links-left-container'>
                    <div className='footer-help-links-container'>
                        <h4 className='mb-4 font-semibold'>HELP</h4>
                        <ul>
                            <li>FAQ</li>
                            <li>Delivery Information</li>
                            <li>Returns Policy</li>
                            <li>Make a Return</li>
                            <li>Orders</li>
                        </ul>
                    </div>
                    <div className='footer-help-links-container'>
                        <h4 className='mb-4 font-semibold'>PAGES</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Student Discount</li>
                            <li>Veteran Discount</li>
                            <li>Factory List</li>
                            <li>Sustainability</li>
                        </ul>
                    </div>
                </div>
                <section className="footer-dropdown-container">
                    <button onClick={handleCollapseClick} class="footer-collapsible font-semibold">HELP
                        <div className="footer-plus-minus-container">
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </button>
                    <div className="footer-content">
                        <div className='footer-inner-container'>
                            <div className='footer-help-links-container'>
                                <ul>
                                    <li>FAQ</li>
                                    <li>Delivery Information</li>
                                    <li>Returns Policy</li>
                                    <li>Make a Return</li>
                                    <li>Orders</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </section>
                <section className="footer-dropdown-container mb-4">
                    <button onClick={handleCollapseClick} class="footer-collapsible font-semibold">PAGES
                        <div className="footer-plus-minus-container">
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </button>
                    <div className="footer-content">
                        <div className='footer-inner-container'>
                            <div className='footer-help-links-container'>
                                <ul>
                                    <li>About Us</li>
                                    <li>Careers</li>
                                    <li>Student Discount</li>
                                    <li>Veteran Discount</li>
                                    <li>Factory List</li>
                                    <li>Sustainability</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <h4 className="mb-4 font-semibold mobile-more-header">MORE ABOUT US</h4>
                <div className='footer-links-right-container'>
                    <h4 className='mb-4 font-semibold desktop-more-header'>MORE ABOUT US</h4>
                    <div className='links-right-wrapper'>
                        <div className='right-link-container1'><img src={blogImg} alt="" /><div className='right-link-label'>BLOG</div></div>
                        <div className='right-link-container2'><img src={trainingAppImg} alt="" /><div className='right-link-label'>TRAINING APP</div></div>
                        <div className='right-link-container3'><img src={emailImg} alt="" /><div className='right-link-label'>EMAIL SIGN UP</div></div>
                    </div>
                </div>
            </section>
            <section className='footer-desktop-middle-section'>
                <div className='footer-desktop-middle-left-section'>
                    <ul>
                        <li>Terms & Conditions</li>
                        <li>Terms of Use</li>
                        <li>Privacy Notice</li>
                        <li>Cookie Policy</li>
                    </ul>
                </div>
                <div className='footer-desktop-middle-right-section'>
                    <div className='footer-payment-container'>
                        <img src={Visa} alt="" />
                        <img src={MasterCard} alt="" />
                        <img className='drop-shadow' src={Paypal} alt="" />
                        <img src={Klarna} alt="" />
                        <img src={AfterPay} alt="" />
                    </div>
                    <div className='footer-socials-container'>
                        <img src={facebookIcon} alt="" />
                        <img src={pinterestIcon} alt="" />
                        <img src={youtubeIcon} alt="" />
                        <img src={instagramIcon} alt="" />
                        <img src={twitterIcon} alt="" />
                        <img src={tiktokIcon} alt="" />
                    </div>
                </div>
            </section>
            <section className='footer-mobile-middle-section'>
                <div className='footer-socials-container'>
                    <img src={facebookIcon} alt="" />
                    <img src={pinterestIcon} alt="" />
                    <img src={youtubeIcon} alt="" />
                    <img src={instagramIcon} alt="" />
                    <img src={twitterIcon} alt="" />
                    <img src={tiktokIcon} alt="" />
                </div>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Terms of Use</li>
                    <li>Privacy Notice</li>
                    <li>Cookie Policy</li>
                </ul>
                <div className='footer-payment-container'>
                    <img src={Visa} alt="" />
                    <img src={MasterCard} alt="" />
                    <img className='drop-shadow' src={Paypal} alt="" />
                    <img src={Klarna} alt="" />
                    <img src={AfterPay} alt="" />
                </div>
            </section>
            <section className='footer-middle-section'>
                <div className='footer-payment-container'>
                    <img src={Visa} alt="" />
                    <img src={MasterCard} alt="" />
                    <img className='drop-shadow' src={Paypal} alt="" />
                    <img src={Klarna} alt="" />
                    <img src={AfterPay} alt="" />
                </div>
                <div className='footer-socials-container'>
                    <img src={facebookIcon} alt="" />
                    <img src={pinterestIcon} alt="" />
                    <img src={youtubeIcon} alt="" />
                    <img src={instagramIcon} alt="" />
                    <img src={twitterIcon} alt="" />
                    <img src={tiktokIcon} alt="" />
                </div>
            </section>
            <section className='footer-bottom-section'>
            <div className='footer-bottom-left-container'>
                <p className='font-light'>© 2024 | Designed By Tevin Cheatham | All Rights Reserved. | Fitness is Fashionable</p>
            </div>
            <div className='footer-bottom-right-container'>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Terms of Use</li>
                    <li>Privacy Notice</li>
                    <li>Cookie Policy</li>
                </ul>
            </div>
            </section>
        </footer>
        </>
    )
}