import './Footer.css';

export function Footer() {
    return (
        <div className='footer' data-testid='footer-test-id'>
            <div className='inner-text' data-testid='footer-inner'>
                <div id='footer-text'>Enjoy the app</div>
            </div>
        </div>
    );
}
