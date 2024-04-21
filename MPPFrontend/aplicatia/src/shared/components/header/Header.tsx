import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>NBA</div>

                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            List Players
                        </Link>
                    </div>

                    <div>
                        <Link to='/addUser' className='link'>
                            Add 🏀 Player
                        </Link>
                    </div>

                    <div>
                        <Link to='/chart' className='link'>
                            Chart
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export { Header };
