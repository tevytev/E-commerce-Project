import './ResponsiveNav.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ResponsiveNav(props) {
    
    const {userData} = props;

    const [activeProductType, setActiveProductType] = useState('nav-men');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const mounted = useRef(false);

    useEffect(() => {

    }, []);

    const handleActiveProductTypeChange = (e) => {
        setActiveProductType(e.target.id);
    };

    const handleNavClick = (e) => {
        
        const nav = document.getElementById('responsive-nav-container');
        const navContent = document.getElementById('responsive-nav-wrapper');

        nav.style.display = 'flex';

        if (nav.style.display === 'flex') {

            setTimeout(() => {
                nav.classList.toggle('responsive-nav-container-active');
            }, 200);

            setTimeout(() => {
                navContent.classList.toggle('responsive-nav-wrapper-active');
            }, 500);
            
        }

    };

    const handleNavClose = (e) => {
        const nav = document.getElementById('responsive-nav-container');
        const navContent = document.getElementById('responsive-nav-wrapper');

        if(nav.classList.contains('responsive-nav-container-active')) {
            nav.classList.toggle('responsive-nav-container-active');
            navContent.classList.toggle('responsive-nav-wrapper-active');
            const navScrollArea = document.getElementById('responsive-nav-container');
            navScrollArea.scrollTo(0, 0);

            
            const collapsible1 = document.getElementsByClassName('responsive-nav-collapsible')[0];
            const content1 = collapsible1.nextElementSibling;
            const line1 = collapsible1.children[0].firstChild
            
            if (content1.style.maxHeight) {
                content1.style.maxHeight = null;
                line1.classList.toggle('line1-active');
            }

            const collapsible2 = document.getElementsByClassName('responsive-nav-collapsible')[1];
            const content2 = collapsible2.nextElementSibling;
            const line2 = collapsible2.children[0].firstChild
            if (content2.style.maxHeight) {
                content2.style.maxHeight = null;
                line2.classList.toggle('line1-active');
            } 

            const collapsible3 = document.getElementsByClassName('responsive-nav-collapsible')[2];
            const content3 = collapsible3.nextElementSibling;
            const line3 = collapsible3.children[0].firstChild
            if (content3.style.maxHeight) {
                content3.style.maxHeight = null;
                line3.classList.toggle('line1-active');
            }
        } else {
            return;
        }
        
        setTimeout(() => {
            nav.style.display = 'none';
        }, 400);

    }

    const handleSearchClick = (e) => {

        const searchBar = document.getElementById('small-search-bar');
        const searchArea = document.getElementById('small-search-entry-area');
        const topHeader = document.getElementById('secondary-root-header');
        const trendingContainer = document.getElementById('small-trending-search-container');
        
        topHeader.style.zIndex = 30;
        searchBar.style.display = 'flex';
        if (searchBar.style.display === 'flex') {

            setTimeout(() => {
                searchBar.classList.toggle('small-search-bar-active');
            }, 200);
        
            setTimeout(() => {
                searchArea.classList.toggle('small-search-entry-area-active');
                trendingContainer.classList.add('small-trending-search-container-active');
            }, 800);
        }
    };

    const handleCollapseClick = (e) => {
        const lastContent = document.getElementById('last-content');
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        const line1 = e.target.children[0].firstChild

        if (content.style.maxHeight){
            if (e.target.id === 'last-coll') {
                e.target.classList.add('last-coll');
                lastContent.classList.toggle('last-dropdwn');
            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = null;
        
        } else {
            if (e.target.id === 'last-coll') {
                e.target.classList.remove('last-coll');
                lastContent.classList.toggle('last-dropdwn');
            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    useEffect(() => {
        const nav = document.getElementById('responsive-nav-container');

        if (nav && windowWidth > 1024) {
            handleNavClose();
        } else {
            return;
        }

    }, [windowWidth])

    if (activeProductType === 'nav-men') {
        return (
            <>
            <div id='responsive-nav-container' style={{display: 'none'}} className='responsive-nav-container'>
                <div className='responsive-nav-header-container'>
                    <div className='responsive-nav-header-top-container'>{userData ? 'Hi, ' + userData.userName : <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> }<i onClick={handleNavClose} className="fa-solid fa-x"></i></div>
                    <div className='responsive-nav-header-top-container'>
                    {userData ? <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> : <></>}
                    </div>
                    <h3>SHOP</h3>
                    <div onClick={handleSearchClick} className='responsive-nav-searchbar-btn'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <p>Search for a Product</p>
                    </div>
                </div>
                <div id='responsive-nav-wrapper' className='responsive-nav-wrapper'>
                <div className='responsive-nav-body-container'>
                    <div className='responsive-nav-links-container'>
                        <button className='active-nav-link' onClick={handleActiveProductTypeChange} id={'nav-men'}><div id={'nav-men'}>MEN</div></button>
                        <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-women'}> <div id={'nav-women'}>WOMEN</div> </button>
                        <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-accessories'}><div id={'nav-accessories'}>ACCESSORIES</div></button>
                    </div>
                    <div className='responsive-nav-featured-container'>
                        <Link onClick={handleNavClose} to={'/men/products/filter/new'} id='responsive-nav-new-release-men' className='responsive-nav-featured-item'>
                            <div></div>
                            <p>NEW RELEASES</p>
                        </Link>
                        <Link onClick={handleNavClose} to={'/men/products/filter/sale'} id='responsive-nav-sale-men' className='responsive-nav-featured-item'>
                            <div></div>
                            <p>ON SALE THIS MONTH</p>
                        </Link>
                    </div>
                    <div className='responsive-nav-products-header-wrapper'>
                        <h3>MENS PRODUCTS</h3>
                    </div>
                    <section className="responsive-nav-dropdown-container">
                        <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">TRENDING
                            <div className="responsive-nav-plus-minus-container">
                                <span className="line1"></span>
                                <span className="line2"></span>
                            </div>
                        </button>
                        <div className="responsive-nav-content">
                            <div className='responsive-nav-inner-container'>
                                <ul>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/hoodies'}>Hoodies</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/shorts'}>Shorts</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/sweatpants'}>Sweatpants</Link></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="responsive-nav-dropdown-container">
                        <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">TOPS
                            <div className="responsive-nav-plus-minus-container">
                                <span className="line1"></span>
                                <span className="line2"></span>
                            </div>
                        </button>
                        <div className="responsive-nav-content">
                            <div className='responsive-nav-inner-container'>
                                <ul>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/t-shirts'}>T-shirts</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/longsleeves'}>Long Sleeves</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/hoodies'}>Hoodies</Link></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="responsive-nav-dropdown-container">
                        <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">BOTTOMS
                            <div className="responsive-nav-plus-minus-container">
                                <span className="line1"></span>
                                <span className="line2"></span>
                            </div>
                        </button>
                        <div className="responsive-nav-content">
                            <div className='responsive-nav-inner-container'>
                                <ul>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/shorts'}>Shorts</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/pants'}>Pants</Link></li>
                                    <li><Link onClick={handleNavClose} to={'/men/products/filter/sweatpants'}>Sweatpants</Link></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <footer className='responsive-nav-footer-container'>
                        <h4>MORE</h4>
                        <ul>
                            <li>Accessibility Statement</li>
                            <li>Help</li>
                            <li>Email Sign Up</li>
                            <li>Blog</li>
                        </ul>
                    </footer>
                </div>
                </div>
            </div>
            <button onClick={handleNavClick} className='responsive-nav-burger'>
                <i class="fa-solid fa-bars"></i>
            </button>
            </>
        )
    } else if (activeProductType === 'nav-women') {
        return (
            <>
            <div id='responsive-nav-container' style={{display: 'none'}} className='responsive-nav-container'>
                <div className='responsive-nav-header-container'>
                    <div className='responsive-nav-header-top-container'>{userData ? 'Hi, ' + userData.userName : <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> }<i onClick={handleNavClose} className="fa-solid fa-x"></i></div>
                    <div className='responsive-nav-header-top-container'>
                    {userData ? <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> : <></>}
                    </div>
                    <h3>SHOP</h3>
                    <div onClick={handleSearchClick} className='responsive-nav-searchbar-btn'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <p>Search for a Product</p>
                    </div>
                </div>
                <div id='responsive-nav-wrapper' className='responsive-nav-wrapper'>
                    <div className='responsive-nav-body-container'>
                        <div className='responsive-nav-links-container'>
                            <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-men'}><div id={'nav-men'}>MEN</div></button>
                            <button className='active-nav-link' onClick={handleActiveProductTypeChange} id={'nav-women'}> <div id={'nav-women'}>WOMEN</div> </button>
                            <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-accessories'}><div id={'nav-accessories'}>ACCESSORIES</div></button>
                        </div>
                        <div className='responsive-nav-featured-container'>
                            <Link onClick={handleNavClose} to={'/women/products/filter/new'} id='responsive-nav-new-release-women' className='responsive-nav-featured-item'>
                                <div></div>
                                <p>NEW RELEASES</p>
                            </Link>
                            <Link onClick={handleNavClose} to={'/women/products/filter/sale'} id='responsive-nav-sale-women' className='responsive-nav-featured-item'>
                                <div></div>
                                <p>ON SALE THIS MONTH</p>
                            </Link>
                        </div>
                        <div className='responsive-nav-products-header-wrapper'>
                            <h3>WOMENS PRODUCTS</h3>
                        </div>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">TRENDING
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/sportsbras'}>Sports Bras</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/leggings'}>Leggings</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/shorts'}>Shorts</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">TOPS
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/sportsbras'}>Sports Bras</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/t-shirts'}>T-shirts</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/longsleeves'}>Long Sleeves</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/hoodies'}>Hoodies</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">BOTTOMS
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/leggings'}>Leggings</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/shorts'}>Shorts</Link></li>
                                        <li><Link onClick={handleNavClose} to={'/women/products/filter/sweatpants'}>Sweatpants</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <footer className='responsive-nav-footer-container'>
                            <h4>MORE</h4>
                            <ul>
                                <li>Accessibility Statement</li>
                                <li>Help</li>
                                <li>Email Sign Up</li>
                                <li>Blog</li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </div>
            <button onClick={handleNavClick} className='responsive-nav-burger'>
                <i class="fa-solid fa-bars"></i>
            </button>
            </>
        )
    } else {
        return (
            <>
            <div id='responsive-nav-container' style={{display: 'none'}} className='responsive-nav-container'>
                <div className='responsive-nav-header-container'>
                    <div className='responsive-nav-header-top-container'>{userData ? 'Hi, ' + userData.userName : <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> }<i onClick={handleNavClose} className="fa-solid fa-x"></i></div>
                    <div className='responsive-nav-header-top-container'>
                    {userData ? <Link onClick={handleNavClose} to={'/wishlist'}><i className="fa-regular fa-heart mr-4"></i></Link> : <></>}
                    </div>
                    <h3>SHOP</h3>
                    <div onClick={handleSearchClick} className='responsive-nav-searchbar-btn'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <p>Search for a Product</p>
                    </div>
                </div>
                <div id='responsive-nav-wrapper' className='responsive-nav-wrapper'>
                    <div className='responsive-nav-body-container'>
                        <div className='responsive-nav-links-container'>
                            <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-men'}><div id={'nav-men'}>MEN</div></button>
                            <button className='inactive-nav-link' onClick={handleActiveProductTypeChange} id={'nav-women'}> <div id={'nav-women'}>WOMEN</div> </button>
                            <button className='active-nav-link' onClick={handleActiveProductTypeChange} id={'nav-accessories'}><div id={'nav-accessories'}>ACCESSORIES</div></button>
                        </div>
                        <div className='responsive-nav-featured-container'>
                            <Link onClick={handleNavClose} to={'/women/products/filter/new'} id='responsive-nav-app-accessory' className='responsive-nav-featured-item'>
                                <div></div>
                                <p>NEW RELEASES</p>
                            </Link>
                            <Link onClick={handleNavClose} to={'/women/products/filter/sale'} id='responsive-nav-blog-accessory' className='responsive-nav-featured-item'>
                                <div></div>
                                <p>OUR APP</p>
                            </Link>
                        </div>
                        <div className='responsive-nav-products-header-wrapper'>
                            <h3>ACCESSORIES</h3>
                        </div>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">EQUIPMENT
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        
                                        <li><Link onClick={handleNavClose}>All Equipment</Link></li>
                                        <li><Link onClick={handleNavClose}>Lifting Equipment</Link></li>
                                        <li><Link onClick={handleNavClose}>Bottles</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">UNDERWEAR
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        <li><Link onClick={handleNavClose}>All Underwear</Link></li>
                                        <li><Link onClick={handleNavClose}>Men's Underwear</Link></li>
                                        <li><Link onClick={handleNavClose}>Women's Underwear</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="responsive-nav-dropdown-container">
                            <button onClick={handleCollapseClick} class="responsive-nav-collapsible font-semibold">BAGS
                                <div className="responsive-nav-plus-minus-container">
                                    <span className="line1"></span>
                                    <span className="line2"></span>
                                </div>
                            </button>
                            <div className="responsive-nav-content">
                                <div className='responsive-nav-inner-container'>
                                    <ul>
                                        <li><Link onClick={handleNavClose}>All Bags</Link></li>
                                        <li><Link onClick={handleNavClose}>Backpacks</Link></li>
                                        <li><Link onClick={handleNavClose}>Duffle Bags</Link></li>
                                        <li><Link onClick={handleNavClose}>Tote Bags</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <footer className='responsive-nav-footer-container'>
                            <h4>MORE</h4>
                            <ul>
                                <li>Accessibility Statement</li>
                                <li>Help</li>
                                <li>Email Sign Up</li>
                                <li>Blog</li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </div>
            <button onClick={handleNavClick} className='responsive-nav-burger'>
                <i class="fa-solid fa-bars"></i>
            </button>
            </>
        )
    }
    
}