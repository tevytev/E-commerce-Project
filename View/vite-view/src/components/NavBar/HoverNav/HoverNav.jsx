import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './HoverNav.css';


export default function HoverNav(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const { currentNavHover, setCurrentNavHover } = props;

    const [menHover, setMenHover] = useState(false);
    const [womenHover, setWomenHover] = useState(false);
    const [accessoryHover, setAccessoryHover] = useState(false);

    const handleNavigateToMen = (e) => {
        navigate('/men/products');
        console.log(e.target.value);
    }

    const animateIn = () => {
        const navContainer = document.getElementById('nav-hover-bottom-container');
        if (navContainer.classList.contains('animate-in')) {
            return;
        } else {
            navContainer.classList.toggle('animate-in');
        }
    };

    useEffect(() => {

        switch (currentNavHover) {
            case 'men':
                setMenHover(true);
                setWomenHover(false);
                setAccessoryHover(false);

                setTimeout(() => {
                    animateIn();
                }, 100);

                break;
            case 'women': 
                setWomenHover(true);
                setMenHover(false);
                setAccessoryHover(false);

                setTimeout(() => {
                    animateIn();
                }, 100);

                break;
            case 'accessories': 
                setAccessoryHover(true);
                setWomenHover(false);
                setMenHover(false);

                setTimeout(() => {
                    animateIn();
                }, 100);

                break;
            case '': 
                setAccessoryHover(false);
                setWomenHover(false);
                setMenHover(false);
                break;
        }

    }, [currentNavHover]);

    if (menHover) {
        return (
            <div onMouseLeave={() => {
                setMenHover(false);
                setCurrentNavHover('');
            }} className='hover-nav-container' >
                <div className='nav-hover-preserver'>
                    <Link onClick={() => {
                        setMenHover(false);
                    }} to={'/men/products'} id='men-nav-active-btn' className='men-nav-btn-preserve'>MEN</Link>
                    <div onMouseEnter={() => {
                        setMenHover(false);
                        setWomenHover(true);
                        setCurrentNavHover('women');
                    }} className='women-nav-btn-preserve'>WOMEN</div>
                    <div onMouseEnter={() => {
                        setMenHover(false);
                        setAccessoryHover(true);
                        setCurrentNavHover('accessory');
                    }} className='accessory-nav-btn-preserve'>ACCESSORIES</div>
                </div>
                <div id='nav-hover-bottom-container' className='nav-hover-bottom-container'>
                <div className='nav-hover-bottom-left-container'>
                        <header className='nav-hover-header-container'>
                            <h3>MENS PRODUCTS</h3>
                        </header>
                        <section className='nav-hover-options-container'>
                            <div className='nav-option-wrapper'>
                                <h4>TOPS</h4>
                                <ul>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/tops'}>
                                        All Tops
                                        </Link>
                                        </li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/t-shirts'}>T-shirts</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/longsleeves'}>Long Sleeves</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/hoodies'}>Hoodies</Link></li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>BOTTOMS</h4>
                                <ul>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/bottoms'}>
                                        All Bottoms
                                        </Link>
                                        </li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/shorts'}>Shorts</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/pants'}>Pants</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/sweatpants'}>Sweatpants</Link></li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>TRENDING</h4>
                                <ul>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/hoodies'}>Hoodies</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/shorts'}>Shorts</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/men/products/filter/sweatpants'}>Sweatpants</Link></li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className='nav-hover-bottom-right-container'>
                    <header className='nav-hover-header-container'>
                            <h3>FEATURED</h3>
                        </header>
                        <section className='nav-hover-featured-container'>
                            <Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/new'} id='men-new-releases' className='nav-featured-new-container'>
                                <div className='featured-overlay'></div>
                                <p>NEW RELEASES</p>
                            </Link>
                            <Link onClick={() => {
                                        setMenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/men/products/filter/sale'} id='men-sale-this-month' className='nav-featured-sale-container'>
                                <div className='featured-overlay'></div>
                                <p>ON SALE THIS MONTH</p>
                            </Link>
                        </section>
                    </div>
                </div>
                <div onMouseEnter={() => {
                    setMenHover(false);
                    setCurrentNavHover('');
                }} className='nav-hover-overlay'>

                </div>
            </div>
        )
    } 
    if (womenHover) {
        return (
            <div  onMouseLeave={() => {
                setWomenHover(false);
                setCurrentNavHover('');
            }} className='hover-nav-container' >
                <div className='nav-hover-preserver'>
                    <div onMouseEnter={() => {
                        setWomenHover(false);
                        setMenHover(true);
                        setCurrentNavHover('men');
                    }} className='men-nav-btn-preserve'>MEN</div>
                    <Link onClick={() => {
                        setWomenHover(false);
                    }} to={'/women/products'} id='women-nav-active-btn' className='women-nav-btn-preserve'>WOMEN</Link>
                    <div onMouseEnter={() => {
                        setWomenHover(false);
                        setAccessoryHover(true)
                        setCurrentNavHover('accessory');
                    }} className='accessory-nav-btn-preserve'>ACCESSORIES</div>
                </div>
                <div id='nav-hover-bottom-container' className='nav-hover-bottom-container'>
                    <div className='nav-hover-bottom-left-container'>
                        <header className='nav-hover-header-container'>
                            <h3>WOMENS PRODUCTS</h3>
                        </header>
                        <section className='nav-hover-options-container'>
                            <div className='nav-option-wrapper'>
                                <h4>TOPS</h4>
                                <ul>
                                    <li className='nav-option'>
                                    <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/tops'}>
                                        All Tops
                                    </Link>
                                    </li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/sportsbras'}>Sports Bras</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/t-shirts'}>T-shirts</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/longsleeves'}>Long Sleeves</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/hoodies'}>Hoodies</Link></li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>BOTTOMS</h4>
                                <ul>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/bottoms'}>
                                            All Bottoms
                                        </Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/leggings'}>Leggings</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/shorts'}>Shorts</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/sweatpants'}>Sweatpants</Link></li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>TRENDING</h4>
                                <ul>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/sportsbras'}>Sports Bras</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/leggings'}>Leggings</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} to={'/women/products/filter/shorts'}>Shorts</Link></li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className='nav-hover-bottom-right-container'>
                    <header className='nav-hover-header-container'>
                            <h3>FEATURED</h3>
                        </header>
                        <section className='nav-hover-featured-container'>
                            <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/women/products/filter/new'} id='women-new-releases' className='nav-featured-new-container'>
                                <div className='featured-overlay'></div>
                                <p>NEW RELEASES</p>
                            </Link>
                            <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                    }} to={'/women/products/filter/sale'} id='women-sale-this-month' className='nav-featured-sale-container'>
                                <div className='featured-overlay'></div>
                                <p>ON SALE THIS MONTH</p>
                            </Link>
                        </section>
                    </div>
                </div>
                <div onMouseEnter={() => {
                    setWomenHover(false);
                    setCurrentNavHover('');
                }} className='nav-hover-overlay'>
                    
                </div>
            </div>
        )
        
    } if (accessoryHover) {
        return (
            <div  onMouseLeave={() => {
                setAccessoryHover(false);
                setCurrentNavHover('');
            }} className='hover-nav-container' >
                <div className='nav-hover-preserver'>
                    <div onMouseEnter={() => {
                        setAccessoryHover(false);
                        setMenHover(true);
                        setCurrentNavHover('men');
                    }} className='men-nav-btn-preserve'>MEN</div>
                    <div onMouseEnter={() => {
                        setAccessoryHover(false);
                        setWomenHover(true);
                        setCurrentNavHover('women');
                    }} className='women-nav-btn-preserve'>WOMEN</div>
                    <Link onClick={() => {
                    }} id='accessory-nav-active-btn' className='accessory-nav-btn-preserve'>ACCESSORIES</Link>
                </div>
                <div id='nav-hover-bottom-container' className='nav-hover-bottom-container'>
                    <div className='nav-hover-bottom-left-container'>
                        <header className='nav-hover-header-container'>
                            <h3>ACCESSORIES</h3>
                        </header>
                        <section className='nav-hover-options-container'>
                            <div className='nav-option-wrapper'>
                                <h4>BAGS</h4>
                                <ul>
                                    <li className='nav-option'>All Bags</li>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Backpacks</Link>
                                    </li>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Duffle Bags</Link>
                                    </li>
                                    <li className='nav-option'>
                                        <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Tote Bags</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>UNDERWEAR</h4>
                                <ul>
                                    <li className='nav-option'>All Underwear</li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Men's Underwear</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }}>Women's Underwear</Link></li>
                                </ul>
                            </div>
                            <div className='nav-option-wrapper'>
                                <h4>EQUIPMENT</h4>
                                <ul>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >All Equipment</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Lifting Equipment</Link></li>
                                    <li className='nav-option'><Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                        }} >Bottles</Link></li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className='nav-hover-bottom-right-container'>
                    <header className='nav-hover-header-container'>
                            <h3>FEATURED</h3>
                        </header>
                        <section className='nav-hover-featured-container'>
                            <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                    }} id='accessory-training-app' className='nav-featured-new-container'>
                                <div className='featured-overlay'></div>
                                <p>TRAINING APP</p>
                            </Link>
                            <Link onClick={() => {
                                        setWomenHover(false);
                                        setCurrentNavHover('');
                                    }} id='accessory-training-blog' className='nav-featured-sale-container'>
                                <div className='featured-overlay'></div>
                                <p>TRAINING BLOG</p>
                            </Link>
                        </section>
                    </div>
                </div>
                <div onMouseEnter={() => {
                    setWomenHover(false);
                    setCurrentNavHover('');
                }} className='nav-hover-overlay'>
                    
                </div>
            </div>
        )
    }


    
}